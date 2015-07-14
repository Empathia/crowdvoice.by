var BlackListFilter = require(__dirname + '/BlackListFilter');
var VoicesPresenter = require(path.join(process.cwd(), '/presenters/VoicesPresenter.js'));

var EntitiesController = Class('EntitiesController').includes(BlackListFilter)({

  prototype : {
    getEntityByProfileName : function (req, res, next) {
      Entity.find({
        profile_name: req.params.profile_name
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

    index : function index (req, res, next) {
      Entity.find({type:req.entityType}, function (err, result) {
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
      res.render(inflection.pluralize(req.entityType) + '/new.html', {errors: null});
    },

    create : function create (req, res, next) {
      var entity = new Entity({
        name: req.body['name'],
        lastname: req.body['lastname'],
        profileName: req.body['profileName'],
        isAnonymous: req.body['isAnonymous'] === "true" ? true : false
      });
      entity.type = req.entityType;
      entity.save(function (err) {
        if (err) {
          res.render(req.entityType + '/new.html', {errors: err});
        } else {
          res.redirect('/' + entity.profileName);
        }
      });
    },

    edit : function edit (req, res, next) {
      res.render(inflection.pluralize(req.entityType) + '/edit.html', {errors: null});
    },

    update : function update (req, res, next) {
      var entity = req.entity;
      var pathToPublic = path.join(__dirname, '../public');

      entity.setProperties({
        name: req.body['name'] || entity.name,
        lastname: req.body['lastname'] || entity.lastname,
        profileName: req.body['profileName'] || entity.profileName,
        description: req.body['description'] || entity.description,
        location: req.body['location'] || entity.location
      });
      if (typeof(req.body['isAnonymous']) !== 'undefined') {
        entity.isAnonymous = (req.body['isAnonymous'] === "true") ? true : false
      }

      async.series([
        function (done) {
          entity.save(function (err) {
            done(err);
          });
        },
        function (done) {
          if (!req.files['image']) { return done(); }
          entity.uploadImage('image', req.files['image'].path, function (err) {
            done(err);
          });
        },
        function (done) {
          if (!req.files['background']) { return done(); }
          entity.uploadImage('background', req.files['background'].path, function (err) {
            done(err);
          });
        },
        function (done) {
          entity.save(function (err) {
            done(err);
          });
        }
      ], function (err) {
        if (err) {
          res.render(req.entityType + '/edit.html', {errors: err});
        } else {
          res.redirect('/' + entity.profileName + '/edit');
        }
      });
    },

    follow : function follow (req, res, next) {
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
      }, function (err, result) {
        if (err) { return next(err); }

        if (result.length > 0) { // already following?
          // unfollow
          follower.unfollowEntity(entity, function (err) {
            if (err) { return next(err); }

            res.format({
              html: function () {
                res.redirect('/' + entity.profileName);
              },
              json: function () {
                res.json({ status: 'unfollowed' });
              }
            })
          });
        } else {
          // follow
          follower.followEntity(entity, function (err) {
            if (err) { return next(err); }

            res.format({
              html: function () {
                res.redirect('/' + entity.profileName);
              },
              json: function () {
                res.json({ status: 'followed' });
              }
            })
          });
        }
      });
    },

    voices : function voices (req, res, next) {
      var entity = req.entity;
      Voice.find({
        owner_id: hashids.decode(entity.id)[0],
        status : Voice.STATUS_PUBLISHED
      }, function (err, result) {
        if (err) { next(err); return; }

        VoicesPresenter.build(result, req.currentPerson, function(err, voices) {
          if (err) {
            return next(err);
          }

          res.format({
            'application/json': function () {
              res.send(voices);
            },
            'text/html': function () {
              next(new Error('Not found'));
            }
          });
        });
      });
    },

    myVoices: function (req, res, next) {
      ACL.isAllowed('myVoices', 'entities', req.role, {
        currentEntity: req.entity,
        currentPerson: req.currentPerson
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        Voice.find({
          owner_id: hashids.decode(req.currentPerson.id)[0]
        }, function (err, result) {
          if (err) { return next(err); }

          var endResult = {
            draft: [],
            unlisted: [],
            published: []
          };

          result.forEach(function (val) {
            switch (val.status) {
              case 'STATUS_DRAFT':
                endResult.draft.push(val);
                break;
              case 'STATUS_UNLISTED':
                endResult.unlisted.push(val);
                break;
              case 'STATUS_PUBLISHED':
                endResult.published.push(val);
                break;
            };
          });

          res.format({
            html: function () {
              req.voices = endResult;
              res.params.voices = endResult;
              res.render('entities/myVoices');
            },
            json: function () {
              res.json(endResult);
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
      entity.recommendedVoices(function (err, voices) {
        if (err) { next(err); return; }
        res.format({
          'application/json': function () {
            res.json(voices);
          },
          'default': function () {
            next(new NotFoundError('Unknown format for this request'));
          }
        });
      });
    }
  }
});

module.exports = new EntitiesController();
