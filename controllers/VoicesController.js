var BlackListFilter = require(__dirname + '/BlackListFilter');
var EntitiesPresenter = require(path.join(process.cwd(), '/presenters/EntitiesPresenter.js'));

var VoicesController = Class('VoicesController').includes(BlackListFilter)({
  prototype : {
    getActiveVoice : function(req, res, next) {
      Voice.findBySlug(req.params['voice_slug'], function(err, voice) {
        if (err) { return next(err); }

        res.locals.voice = new Voice(voice);
        req.activeVoice = new Voice(voice);

        res.locals.postsCount = {
          approved : {},
          unapproved : {}
        };

        var dates = { firstPostDate : null, lastPostDate : null };

        async.series([function(done) {
          db.raw("SELECT COUNT (*), \
            to_char(\"Posts\".published_at, 'MM') AS MONTH, \
            to_char(\"Posts\".published_at, 'YYYY') AS YEAR \
            FROM \"Posts\" \
            WHERE \"Posts\".voice_id = ? \
            AND \"Posts\".approved = true \
            GROUP BY MONTH, YEAR \
            ORDER BY YEAR DESC, MONTH DESC", [voice.id])
          .exec(function(err, postsCount) {
            if (err) { return done(err); }

            var counts = {};

            postsCount.rows.forEach(function(post) {
              if (!counts[post.year]) {
                counts[post.year] = {};
              }

              counts[post.year][post.month] = post.count;
            });

            res.locals.postsCount.approved = counts;
            done();
          });
        }, function(done) {
          db.raw("SELECT COUNT (*), \
            to_char(\"Posts\".published_at, 'MM') AS MONTH, \
            to_char(\"Posts\".published_at, 'YYYY') AS YEAR \
            FROM \"Posts\" \
            WHERE \"Posts\".voice_id = ? \
            AND \"Posts\".approved = false \
            GROUP BY MONTH, YEAR \
            ORDER BY YEAR DESC, MONTH DESC", [voice.id])
          .exec(function(err, postsCount) {
            if (err) { return done(err); }

            var counts = {};

            postsCount.rows.forEach(function(post) {
              if (!counts[post.year]) {
                counts[post.year] = {};
              }

              counts[post.year][post.month] = post.count;
            });

            res.locals.postsCount.unapproved = counts;
            done();
          });
        }, function(done) {
          db('Posts').where({
            'voice_id' : voice.id,
            approved : true
          }).orderBy('published_at', 'ASC').limit(1)
          .exec(function(err, firstPost) {
            if (err) {
              return done(err);
            }

            if (firstPost.length !== 0) {
              dates.firstPostDate = firstPost[0]['published_at'];
            }

            db('Posts').where({
              'voice_id' : voice.id, approved: true
            }).orderBy('published_at', 'DESC').limit(1)
            .exec(function(err, lastPost) {
              if (err) {
                return done(err);
              }

              if (lastPost.length !== 0) {
                dates.lastPostDate = lastPost[0]['published_at'];
              }

              res.locals.voice.firstPostDate = dates.firstPostDate;
              res.locals.voice.lastPostDate = dates.lastPostDate;

              Entity.findById(voice.ownerId, function(err, owner) {
                if (err) { return done(err); }

                res.locals.owner = new Entity(owner[0]);

                done();
              });
            });
          });
        }, function(done) {
          // Followers
          VoiceFollower.find({ 'voice_id' : voice.id }, function(err, voiceFollowers) {
            var followerIds = voiceFollowers.map(function(item) {
              return item.entityId;
            });

            Entity.whereIn('id', followerIds, function(err, result) {
              if (err) {
                return done(err);
              }
              EntitiesPresenter.build(result, req.currentPerson, function(err, followers) {
                if (err) {
                  return done(err);
                }

                res.locals.voice.followers = followers;

                done();
              });
            });
          });
        }], next);
      });
    },

    index : function index(req, res, next) {
      var query = {
        ownerId: req.body.ownerId,
        topics: req.body.topics,
        createdBefore: req.body.createdBefore,
        createdAfter: req.body.createdAfter
      };

      Voice.filterBy(query, function(err, result) {
        if (err) { return next(err); }

        res.format({
          html : function() {
            res.locals.voices = result;
            res.render('voices/index.html');
          },
          json : function() {
            res.json(result);
          }
        });
      });
    },

    show : function show(req, res, next) {
      ACL.isAllowed('show', 'voices', req.role, {
        currentPerson : req.currentPerson,
        voice : res.locals.voice,
        profileName : req.params.profileName
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (response.isAllowed) {
          res.locals.allowPosting = response.allowPosting;
          res.locals.allowPostEditing = response.allowPostEditing;

          res.format({
            html : function() {
              VoicesPresenter.build([res.locals.voice], req.currentPerson, function(err, result) {
                if (err) {
                  return next(err);
                }

                res.locals.voice = result[0];

                res.render('voices/show.html', {
                  pageName : 'page-inner page-voice'
                });
              });
            }
          });
        }
      });
    },

    new : function(req, res) {
      res.render('voices/new.html', { errors: null });
    },

    create : function create(req, res, next) {
      var voice = new Voice({
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        type: req.body.type,
        ownerId: hashids.decode(req.currentPerson.id)[0],
        twitterSearch: req.body.twitterSearch,
        rssUrl: req.body.rssUrl,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      });

      voice.save(function(err) {
        if (err) {
          return next(err);
        }
        voice.addSlug(function(err) {
          res.redirect(req.currentPerson.profileName + '/' + voice.getSlug());
        });
      });
    },

    edit : function edit(req, res) {
      res.render('voices/edit.html', { errors: null });
    },

    update : function update(req, res, next) {
      var voice = req.activeVoice;
      voice.setProperties({
        title: req.body.title || voice.title,
        status: req.body.status || voice.status,
        description: req.body.description || voice.description,
        type: req.body.type || voice.type,
        ownerId: req.body.ownerId || voice.ownerId,
        twitterSearch: req.body.twitterSearch || voice.twitterSearch,
        rssUrl: req.body.rssUrl || voice.rssUrl,
        latitude: req.body.latitude || voice.latitude,
        longitude: req.body.longitude || voice.longitude
      });

      voice.save(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/voice/' + voice.id);
      });
    },

    requestToContribute : function requestToContribute(req, res, next) {
        ACL.isAllowed('requestToContribute', 'voices', req.role, {
          currentPerson : req.currentPerson,
          profileName : req.params.profileName,
          voiceSlug : req.params.voiceSlug
        }, function(err, response) {
          if (err) {
            return next(err);
          }

          if (!response.isAllowed) {
            return next( new ForbiddenError() );
          }

          var thread;

          async.series([function(done) {
            MessageThread.findOrCreate({
              senderPerson : response.senderPerson,
              senderEntity : response.senderEntity,
              receiverEntity : response.receiverEntity
            }, function(err, result) {
              if (err) {
                return done(err);
              }

              thread = result;

              done();
            });
          }, function(done) {
            thread.createMessage({
              type : 'request_voice',
              senderPersonId : response.senderPerson.id,
              senderEntityId : response.senderEntity.id,
              receiverEntityId : response.receiverEntity.id,
              voiceId : response.voice.id,
              message : req.body.message
            }, function(err, result) {
              if (err) {
                return done(err);
              }

              done();
            });
          }], function(err) {
            if (err) {
              return next(err);
            }

            ThreadsPresenter.build(req, [thread], function(err, result) {
              if (err) {
                return next(err);
              }

              res.json(result[0]);
            });
          });
        });
    },

    destroy : function destroy(req, res, next) {
      var voice = req.activeVoice;
      voice.deleted = true;
      voice.save(function(err) {
        if (err) { return next(err); }
        res.redirect('/voices');
      });
    },

    follow : function follow(req, res, next) {
      var follower = req.currentPerson;
      follower.id = hashids.decode(follower.id)[0];

      // we don't want to allow the user to follow if he is anonymous
      if (follower.isAnonymous) {
        return next(new ForbiddenError('Anonymous users can\'t follow'));
      }

      // check if user is already following, if yes unfollow
      VoiceFollower.find({
        entity_id: follower.id,
        voice_id: req.activeVoice.id
      }, function (err, result) {
        if (err) { return next(err); }

        if (result.length > 0) { // we're following this voice
          // so unfollow
          follower.unfollowVoice(req.activeVoice, function (err) {
            if (err) { return next(err); }

            res.format({
              html: function () {
                res.redirect('/' + req.params.profileName + '/' + req.params.voice_slug)
              },
              json: function () {
                res.json({ status: 'unfollowed' });
              }
            })
          });
        } else {
          // follow
          follower.followVoice(req.activeVoice, function(err) {
            if (err) { return next(err); }

            res.format({
              html: function () {
                res.redirect('/' + req.params.profileName + '/' + req.params.voice_slug)
              },
              json: function () {
                res.json({ status: 'followed' });
              }
            })
          });
        }
      });
    }
  }
});

module.exports = new VoicesController();
