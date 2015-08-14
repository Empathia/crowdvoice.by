var BlackListFilter = require(__dirname + '/BlackListFilter');
var VoicesPresenter = require(path.join(process.cwd(), '/presenters/VoicesPresenter.js'));
var feed = require(__dirname + '/../lib/feedInject.js');

var EntitiesController = Class('EntitiesController').includes(BlackListFilter)({

  prototype : {
    getEntityByProfileName : function (req, res, next) {
      Entity.find({
        'profile_name' : req.params.profile_name
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new NotFoundError('Entity Not Found')); return; }

        EntitiesPresenter.build(result, req.currentPerson, function(err, entities) {
          if (err) {
            return next(err);
          }

          req.entity = entities[0];
          req.entityType = req.entity.type;
          res.locals[req.entityType] = entities[0];
          next();
        })
      });
    },

    getEntity : function getEntity (req, res, next) {
      Entity.find({
        id: req.params.id,
        type: req.entityType
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) {
          next(new NotFoundError('Entity Not Found')); return;
        }

        res.locals[req.entityType] = new Entity(result[0]);
        req.entity = new Entity(result[0]);

        next();
      });
    },

    index : function index(req, res, next) {
      Entity.find({ type:req.entityType }, function (err, result) {
        if (err) { next(err); return; }

        if (result.length === 0) {
          next(new NotFoundError('Entity Not Found')); return;
        }

        res.format({
          'text/html': function () {
            res.locals[inflection.pluralize(req.entityType)] = result;
            res.render(req.entityType + '/index.html', {});
          },
          'application/json': function () {
            res.json(result);
          }
        });
      });
    },

    show : function show (req, res, next) {
      res.render(inflection.pluralize(req.entityType) + '/show.html');
    },

    new : function (req, res, next) {
      return next(new NotFoundError());
    },

    create : function create(req, res, next) {
      return next(new NotFoundError());
    },

    edit : function edit(req, res, next) {
      ACL.isAllowed('edit', 'entities', req.role, {
        entity : req.entity,
        currentPerson : req.currentPerson
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        res.locals.checkit = Checkit;
        res.locals.currentUser = req.user;
        res.render(inflection.pluralize(req.entityType) + '/edit.html');

      });
    },

    // update profile (as opposed to user account)
    update : function update(req, res, next) {
      ACL.isAllowed('update', 'entities', req.role, {
        entity : req.entity,
        currentPerson : req.currentPerson
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        Entity.find({ id : hashids.decode(req.entity.id)[0] }, function(err, result) {
          if (err) {
            return next(err);
          }

          var entity = new Entity(result[0]);

          var pathToPublic = path.join(__dirname, '../public');

          entity.setProperties({
            name: req.body.name || entity.name,
            lastname: req.body.lastname || entity.lastname,
            profileName: req.body.profileName || entity.profileName,
            description: req.body.description || entity.description,
            location: req.body.location || entity.location
          });

          async.series([
            function (done) {
              entity.save(done);
            },
            function (done) {
              if (!req.files.image) { return done(); }
              entity.uploadImage('image', req.files.image.path, function (err) {
                if (err) { return done(err); }

                feed.entityUpdateAvatar(req, done);
              });
            },
            function (done) {
              if (!req.files.background) { return done(); }
              entity.uploadImage('background', req.files.background.path, function (err) {
                if (err) { return done(err); }

                feed.entityUpdateBackground(req, done);
              });
            },
            function (done) {
              entity.save(done);
            }
          ], function (err) {
            if (err) {
              res.locals.errors = err;
              req.errors = err;
              logger.log(err);

              res.render(inflection.pluralize(req.entityType) + '/edit.html');
            } else {
              req.flash('success', 'Your profile has been updated.');
              res.redirect('/' + entity.profileName + '/edit');
            }
          });
        });
      });
    },

    // update user account (as opposed to profile)
    updateUser : function updateUser(req, res, next) {
      var entity = req.entity;

      ACL.isAllowed('updateUser', 'entities', req.role, {
        entity : entity,
        currentPerson : req.currentPerson
      }, function (err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        var user = new User(req.user);

        if (req.body.email){
          var email = req.body.email.toLowerCase().trim();

          if (email && email !== '') {
            user.email = email;
          }
        }

        if (req.body.password) {
          var password = req.body.password;

          if (password && password !== '') {
            user.password = password;
          }
        }

        user.save(function(err, result) {
          if (err) {
            res.locals.errors = err;
            req.errors = err;
            logger.log(err);

            res.render(inflection.pluralize(req.entityType) + '/edit.html');
          } else {
            req.flash('success', 'Your account details have been updated.');
            res.redirect('/' + entity.profileName + '/edit');
          }
        });
      });
    },

    follow : function follow(req, res, next) {
      var entity = req.entity;
      var follower = req.currentPerson;
      follower.id = hashids.decode(follower.id)[0];
      entity.id = hashids.decode(entity.id)[0];

      // we don't want to allow the user to follow if he is anonymous
      if (follower.isAnonymous) {
        return next(new ForbiddenError('Anonymous users can\'t follow'));
      }

      EntityFollower.find({
        follower_id: follower.id,
        followed_id: entity.id
      }, function(err, result) {
        if (err) { return next(err); }

        if (result.length > 0) { // already following?
          // unfollow
          follower.unfollowEntity(entity, function(err) {
            if (err) { return next(err); }

            res.format({
              html: function() {
                req.flash('success', 'Unfollowed successfully.');
                res.redirect('/' + entity.profileName);
              },
              json: function() {
                res.json({ status: 'unfollowed' });
              }
            });
          });
        } else {
          // follow
          follower.followEntity(entity, function (err, result) {
            if (err) { return next(err); }

            feed.entityFollowsEntity(req, result, function (err) {
              if (err) { return next(err); }

              res.format({
                html: function() {
                  req.flash('success', 'Followed successfully.');
                  res.redirect('/' + entity.profileName);
                },
                json: function() {
                  res.json({ status: 'followed' });
                }
              });
            });
          });
        }
      });
    },

    voices : function voices(req, res, next) {
      var entity = req.entity;
      Voice.find({
        'owner_id' : hashids.decode(entity.id)[0],
        status : Voice.STATUS_PUBLISHED
      }, function(err, result) {
        if (err) { next(err); return; }

        VoicesPresenter.build(result, req.currentPerson, function(err, voices) {
          if (err) {
            return next(err);
          }

          res.format({
            json: function () {
              res.send(voices);
            },
            html: function () {
              next(new Error('Not found'));
            }
          });
        });
      });
    },

    followers : function followers(req, res, next) {
      var entity = req.entity;
      var followerIds = [];

      async.series([function(done) {
        EntityFollower.find({ 'followed_id' : hashids.decode(entity.id)[0] }, function(err, result) {
          if (err) {
            return done(err);
          }

          followerIds = result.map(function(item) {
            return item.followerId;
          });

          done();
        });
      }], function(err) {
        if (err) {
          return next(err);
        }

        Entity.whereIn('id', followerIds, function(err, result) {
          if (err) {
            return done(err);
          }

          EntitiesPresenter.build(result, req.currentPerson, function(err, followers) {
            if (err) {
              return done(err);
            }

            res.json(followers);
          });
        });
      });
    },

    voicesFollowed : function voicesFollowed(req, res, next) {
      VoiceFollower.find({ 'entity_id' : hashids.decode(req.entity.id)[0] }, function(err, voicesFollowed) {
        if (err) {
          return next(err);
        }

        var followedIds = voicesFollowed.map(function(item) {
          return item.voiceId;
        });

        Voice.whereIn('id', followedIds, function(err, result) {
          if (err) {
            return next(err);
          }

          result = result.filter(function(item) {
            if (item.status === Voice.STATUS_PUBLISHED) {
              return true;
            }
          })

          VoicesPresenter.build(result, req.currentPerson, function(err, voices) {
            if (err) {
              return next(err);
            }

            res.json(voices);
          });
        });
      });
    },

    entitiesFollowed : function entitiesFollowed(req, res, next) {
      EntityFollower.find({ 'follower_id' : hashids.decode(req.entity.id)[0] }, function(err, entitiesFollowed) {
        if (err) {
          return next(err);
        }

        var followedIds = entitiesFollowed.map(function(item) {
          return item.followedId;
        });

        Entity.whereIn('id', followedIds, function(err, result) {
          if (err) {
            return next(err);
          }

          EntitiesPresenter.build(result, req.currentPerson, function(err, entities) {
            if (err) {
              return next(err);
            }

            res.json(entities);
          });
        });
      });
    },

    recommended : function recommended(req, res, next) {
      var entity = req.entity;
      entity.recommendedVoices(function(err, voices) {
        if (err) { next(err); return; }
        res.format({
          'application/json': function() {
            res.json(voices);
          },
          'default': function() {
            next(new NotFoundError('Unknown format for this request'));
          }
        });
      });
    },

    isProfileNameAvailable : function isProfileNameAvailable(req, res, next) {
      ACL.isAllowed('isProfileNameAvailable', 'entities', req.role, {
        currentPerson : req.currentPerson,
        entity : req.entity
      }, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        var value = req.body.value.toLowerCase().trim();
        var currentPersonId = hashids.decode(req.currentPerson.id)[0];
        res.format({
          json : function() {

            Entity.find(['profile_name = ? AND id != ?', [value, currentPersonId]], function(err, result) {
              if (err) {
                return next(err);
              }

              if (result.length > 0) {
                return res.json({ status : 'taken' });
              } else {
                return res.json({ status : 'available' });
              }
            });
          }
        });
      });
    },

    isEmailAvailable : function isEmailAvailable(req, res, next) {
      ACL.isAllowed('isEmailAvailable', 'entities', req.role, {
        currentPerson : req.currentPerson,
        entity : req.entity
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        var value = req.body.value.toLowerCase().trim();
        var currentUserId = req.user.id;

        User.find(['email = ? AND id != ?', [value, currentUserId]], function(err, result) {
          if (err) {
            return next(err);
          }

          if (result.length > 0) {
            return res.json({ status : 'taken' });
          } else {
            return res.json({ status : 'available' });
          }
        })
      });
    },

    isVoiceSlugAvailable : function isVoiceSlugAvailable(req, res, next) {
      ACL.isAllowed('isVoiceSlugAvailable', 'entities', req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        var value = req.body.value.toLowerCase().trim();

        if (value.search(' ') !== -1) {
          return res.json({ 'status' : 'taken' });
        }

        Slug.find({ url : value }, function(err, result) {
          if (err) {
            return next(err);
          }

          if (result.length === 0) {
            return res.json({ 'status' : 'available' });
          } else {
            return res.json({ 'status' : 'taken' });
          }
        })
      })
    },

    reportEntity : function (req, res, next) {
      // data.body = {
      //   message: <String>
      // }

      ACL.isAllowed('reportEntity', 'entities', req.role, {
        currentEntityId: req.entity.id,
        currentPersonId: req.currentPerson.id
      }, function (err, isAllowed) {
        if (err) { return next(err); }

        if (!isAllowed) { return next(new ForbiddenError()); }

        var threads = [],
          admins;

        async.series([
          // get the admins
          function (next) {
            Entity.find({ is_admin: true }, function (err, result) {
              if (err) { return next(err); }

              admins = result;

              next();
            });
          },

          // create or find message thread for all admins
          function (next) {
            var sender = new Entity({ id: hashids.decode(req.currentPerson.id)[0] });

            // iterate over admins
            async.each(admins, function (admin, next) {
              MessageThread.findOrCreate({
                senderPerson: sender,
                senderEntity: sender,
                receiverEntity: admin
              }, function (err, result) {
                if (err) { return next(err); }

                threads.push(result);

                next();
              });
            }, function (err) { // async.each
              if (err) { return next(err); }

              next();
            });
          },

          // go over threads and create a message for each admin
          function (next) {
            var senderId = hashids.decode(req.currentPerson.id)[0],
              receiverId;

            // go over the threads and create a message for each one
            async.each(threads, function (thread, next) {
              receiverId = hashids.decode(thread.receiverEntityId)[0];

              thread.createMessage({
                type: 'report',
                senderPersonId: senderId,
                senderEntityId: senderId,
                receiverEntityId: receiverId,
                message: req.body.message
              }, next);
            }, function (err) { // async.each
              if (err) { return next(err); }

              next();
            });
          },

          function (next) {
            var report = new Report({
              reporterId: hashids.decode(req.currentPerson.id)[0],
              reportedId: hashids.decode(req.entity.id)[0]
            });

            report.save(function (err) {
              if (err) { return next(err); }

              next();
            });
          }
        ], function (err) { // async.series
          if (err) { return next(err); }

          ThreadsPresenter.build(req, threads, function (err, result) {
            if (err) { return next(err); }

            res.json(result);
          });
        });
      });
    },

    feed : function (req, res, next) {
      ACL.isAllowed('feed', 'entities', req.role, {
        entityProfileName: req.entity.profileName,
        currentPerson: req.currentPerson
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        Notification.find({ follower_id: response.follower.id }, function (err, notifications) {
          var actionIds = notifications.map(function (val) { return val.actionId; });

          FeedAction.whereIn('id', actionIds, function (err, actions) {
            FeedPresenter.build(actions, response.follower, false, function (err, presentedFeed) {
              if (err) { return next(err); }

              res.format({
                html: function () {
                  req.feed = presentedFeed;
                  res.locals.feed = presentedFeed;
                  res.render('people/feed');
                },
                json: function () {
                  res.json(presentedFeed);
                }
              });
            });
          });
        });
      });
    },

  }
});

module.exports = new EntitiesController();
