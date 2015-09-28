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

        async.series([
          function(done) {
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
          },
          function(done) {
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
          },
          function(done) {
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
          }, function(done) {
            Slug.find(['voice_id = ? ORDER BY created_at DESC LIMIT 1', [req.activeVoice.id]], function(err, result) {
              if (err) {
                return done(err);
              }

              if (result.length === 0) {
                return done(new NotFoundError('Slug not found'));
              }

              req.voiceSlug = result[0];

              done();
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
        profileName : req.params.profileName || 'anonymous'
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
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

    create: function (req, res, next) {
      ACL.isAllowed('create', 'voices', req.role, {
        currentPerson : req.currentPerson,
        ownerId : req.params.ownerId
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        var voice = new Voice({
          title: req.body.title,
          status: req.body.status,
          description: req.body.description,
          type: req.body.type,
          ownerId: hashids.decode(req.body.ownerId)[0],
          twitterSearch: req.body.twitterSearch,
          rssUrl: req.body.rssUrl,
          locationName : req.body.locationName,
          latitude: req.body.latitude,
          longitude: req.body.longitude
        });

        async.series([function(done) {
          // anonymous

          if (req.currentPerson.isAnonymous) {
            voice.ownerId = hashids.decode(req.currentPerson.id)[0]
            return done();
          }

          if (req.body.anonymously !== 'true') {
            return done();
          }


          Entity.find({
            id : hashids.decode(req.currentPerson.id)[0]
          }, function(err, result) {
            if (err) {
              return dond(err);
            }

            var person = new Entity(result[0]);

            person.getAnonymousEntity(function(err, result) {
              if (err) {
                return done(err);
              }

              voice.ownerId = result.id;

              done();
            });
          });


        }, function(done) {
          voice.save(done);
        }, function(done) {
          voice.addSlug(req.body.slug, function(err) {
            if (err) {
              return done(err);
            }

            done();
          });
        }, function(done) {
          if (!req.files.image || req.files.images === 'undefined') {
            return done();
          }

          voice.uploadImage('image', req.files.image.path, done);
        }, function(done) {
          voice.save(done);
        }, function(done) {
          req.body.topics = req.body.topics.split(',');

          async.each(req.body.topics, function(topic, nextTopic) {
            var voiceTopic = new VoiceTopic({
              voiceId : voice.id,
              topicId : hashids.decode(topic)[0]
            });

            voiceTopic.save(nextTopic);
          }, done);

        }], function(err) {
          if (err) {
            logger.error(err);

            return voice.destroy(function() {
              Slug.find({ 'voice_id' : voice.id }, function(error, result) {
                var slug = new Slug(result[0]);
                slug.destroy(function() {
                  return next(err);
                });
              });
            });
          }

          VoicesPresenter.build([voice], req.currentPerson, function(err, voices) {
            if (err) {
              return next(err);
            }

            FeedInjector().inject(voice.ownerId, 'who voiceIsPublished', voice, function (err) {
              if (err) { return next(err); }

              res.json(voices[0]);
            });
          });
        });
      });
    },

    edit : function edit(req, res, next) {
      ACL.isAllowed('edit', 'voices', req.role, {
        currentPerson : req.currentPerson,
        voice : req.activeVoice
      }, function(err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'));
        }

        return res.render('voices/edit.html', { errors: null });
      });
    },

    update : function update(req, res, next) {
      ACL.isAllowed('update', 'voices', req.role, {
        currentPerson : req.currentPerson,
        voice : req.activeVoice
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        var voice = req.activeVoice,
          oldTitle = voice.title,
          oldDescription = voice.description,
          oldStatus = voice.status;

        voice.setProperties({
          title: req.body.title || voice.title,
          status: req.body.status || voice.status,
          description: req.body.description || voice.description,
          type: req.body.type || voice.type,
          ownerId: hashids.decode(req.body.ownerId)[0] || voice.ownerId,
          twitterSearch: req.body.twitterSearch || voice.twitterSearch,
          rssUrl: req.body.rssUrl || voice.rssUrl,
          locationName: req.body.locationName || voice.locationName,
          latitude: req.body.latitude || voice.latitude,
          longitude: req.body.longitude || voice.longitude
        });

        async.series([function(done) {
          if (!req.files.image) {
            return done();
          }

          voice.uploadImage('image', req.files.image.path, done);
        }, function(done) {
          if (req.body.slug === req.voiceSlug.url) {
            return done();
          }

          voice.addSlug(req.body.slug, done);
        }, function(done) {
          voice.save(function(err, result) {
            if (err) {
              return done(err)
            }

            done();
          });
        }, function(done) {
          req.body.topics = req.body.topics.split(',');

          db('VoiceTopic').where({
            'voice_id' : voice.id
          }).del().exec(function(err, result) {
            if (err) {
              return done(err);
            }

            async.each(req.body.topics, function(topic, nextTopic) {
              var voiceTopic = new VoiceTopic({
                voiceId : voice.id,
                topicId : hashids.decode(topic)[0]
              });

              voiceTopic.save(nextTopic);
            }, done);
          });
        }, function(done) {
          if (req.body.title !== oldTitle) {
            FeedInjector().inject(voice.ownerId, 'item voiceNewTitle', voice, done);
          } else {
            return done();
          }
        }, function(done) {
          if (req.body.description !== oldDescription) {
            FeedInjector().inject(voice.ownerId, 'item voiceNewDescription', voice, done);
          } else {
            return done();
          }
        }, function (done) {
          if (req.body.status !== oldStatus && req.body.status === Voice.STATUS_PUBLISHED) {
            FeedInjector().inject(voice.ownerId, 'who voiceIsPublished', voice, done);
          } else {
            return done();
          }
        }, function (done) {
          if (req.body.status !== oldStatus && req.body.status === Voice.STATUS_ARCHIVED) {
            FeedInjector().inject(voice.ownerId, 'both entityArchivesVoice', voice, done);
          } else {
            return done();
          }
        }], function(err) {
          if (err) {
            return next(err);
          }

          VoicesPresenter.build([voice], req.currentPerson, function (err, presentedVoice) {
            if (err) { return next(err); }

            req.flash('success', 'Voice has been updated.');
            res.json(presentedVoice[0]);
          });
        });
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

        req.flash('success', 'Voice has been deleted.');
        res.redirect('/voices');
      });
    },

    follow : function follow(req, res, next) {
      ACL.isAllowed('followAs', 'entities', req.role, {
        currentPersonId: req.currentPerson.id,
        followerId: req.body.followerId
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError('not owner of provided entity'));
        }

        Entity.findById(hashids.decode(req.body.followerId)[0], function (err, followers) {
          if (err) { return next(err); }

          var follower = new Entity(followers[0]);

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
              // unfollow
              follower.unfollowVoice(req.activeVoice, function (err) {
                if (err) { return next(err); }

                res.format({
                  html: function () {
                    req.flash('success', 'Voice has been unfollowed.');
                    res.redirect('/' + req.params.profileName + '/' + req.params.voice_slug)
                  },
                  json: function () {
                    res.json({ status: 'unfollowed' });
                  }
                })
              });
            } else {
              // follow
              follower.followVoice(req.activeVoice, function (err, voiceFollowerRecordId) {
                if (err) { return next(err); }

                VoiceFollower.findById(voiceFollowerRecordId[0], function (err, voiceFollower) {
                  if (err) { return next(err); }

                  FeedInjector().inject(follower.id, 'who entityFollowsVoice', voiceFollower[0], function (err) {
                    if (err) { return next(err); }

                    res.format({
                      html: function () {
                        req.flash('success', 'Voice has been followed.');
                        res.redirect('/' + req.params.profileName + '/' + req.params.voice_slug)
                      },
                      json: function () {
                        res.json({ status: 'followed' });
                      }
                    });
                  });
                });
              });
            }
          });
        });
      });
    },

    isVoiceSlugAvailable : function isVoiceSlugAvailable(req, res, next) {
      ACL.isAllowed('isVoiceSlugAvailable', 'voices', req.role, {
        currentPerson : req.currentPerson,
        voice : req.activeVoice
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        var value = req.body.value.toLowerCase().trim();

        if (value.search(' ') !== -1) {
          return res.json({ 'status' : 'taken' });
        }

        Slug.find(['url = ? AND voice_id != ?', [value, req.activeVoice.id]], function(err, result) {
          if (err) {
            return next(err);
          }

          if (result.length === 0) {
            return res.json({ 'status' : 'available' });
          } else {
            return res.json({ 'status' : 'taken' });
          }
        });

      });
    },

    inviteToContribute: function (req, res, next) {
      /*
       * req.body = {
       *   personId: hashids.encode,
       *   message: String,
       * }
       */

      ACL.isAllowed('inviteToContribute', 'voices', req.role, {
        currentPerson: req.currentPerson,
        voiceId: req.activeVoice.id
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'));
        }

        VoiceCollaborator.find({
          voice_id: req.activeVoice.id,
          collaborator_id: hashids.decode(req.body.personId)[0]
        }, function (err, result) {
          if (err) { return next(err); }

          if (result.length > 0) {
            return res.json({ status: 'already collaborator' });
          }

          var thread,
            invited,
            invitationRequest;

          async.series([
            // get entity of invited
            function (next) {
              Entity.findById(hashids.decode(req.body.personId)[0], function (err, result) {
                if (err) { return next(err); }

                invited = result[0];

                return next();
              })
            },

            // get a thread
            function (next) {
              MessageThread.findOrCreate({
                senderPerson: response.currentPerson,
                senderEntity: response.currentPerson,
                receiverEntity: invited
              }, function (err, result) {
                if (err) { return next(err); }

                thread = result;

                return next();
              });
            },

            // make or find invitation request
            function (next) {
              invitationRequest = new InvitationRequest({
                invitator_entity_id: response.currentPerson.id,
                invited_entity_id: hashids.decode(req.body.personId)[0]
              });

              invitationRequest.save(next);
            },

            // make invitation message
            function (next) {
              thread.createMessage({
                type: 'invitation_voice',
                senderPersonId: response.currentPerson.id,
                voiceId: response.voice.id,
                invitationRequestId: invitationRequest.id,
                message: req.body.message
              }, function (err, result) {
                if (err) { return next(err); }

                next();
              });
            },
          ], function (err) { // async.series
            if (err) { return next(err); }

            res.json({ status: 'invited' });
          });
        });
      });
    },

    removeContributor: function (req, res, next) {
      /*
       * req.body = {
       *   personId: hashids.encode
       * }
       */

      ACL.isAllowed('removeContributor', 'voices', req.role, {
        currentPerson: req.currentPerson,
        voiceId: req.activeVoice.id
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'));
        }

        VoiceCollaborator.find({
          voiceId: req.activeVoice.id,
          collaboratorId: hashids.decode(req.body.personId)[0]
        }, function (err, result) {
          if (err) { return next(err); }

          if (result.length <= 0) {
            return res.json({ status: 'not collaborator' });
          } else {
            result[0].destroy(function (err) {
              if (err) { return next(err); }

              res.json({ status: 'removed' });
            })
          }
        });
      });
    },

    archiveVoice: function (req, res, next) {
      ACL.isAllowed('archiveVoice', 'voices', req.role, {
        currentPersonId: req.currentPerson.id,
        voiceId: req.activeVoice.id
      }, function (err, isAllowed) {
        if (err) { return next(err); }

        if (!isAllowed) {
          return next(new ForbiddenError('Unauthorized.'));
        }

        var voice = new Voice(req.activeVoice);
        voice.id = hashids.decode(voice.id)[0];

        voice.status = Voice.STATUS_ARCHIVED;

        voice.save(function (err) {
          if (err) { return next(err); }

          FeedInjector().inject(voice.ownerId, 'both entityArchivesVoice', voice, function (err) {
            if (err) { return next(err); }

            res.json({ status: 'archived' });
          });
        });
      });
    }

  }
});

module.exports = new VoicesController();
