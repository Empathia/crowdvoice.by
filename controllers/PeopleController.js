var VoicesPresenter = require(path.join(process.cwd(), '/presenters/VoicesPresenter.js'));
var PostsPresenter = require(path.join(process.cwd(), '/presenters/PostsPresenter.js'));
var FeedPresenter = require(__dirname + '/../presenters/FeedPresenter.js');

var PeopleController = Class('PeopleController').inherits(EntitiesController)({
  prototype : {
    init : function () {
      return this;
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

        Voice.find({ owner_id: response.entity.id }, function (err, voices) {
          if (err) { return next(err); }

          VoicesPresenter.build(voices, req.currentPerson, function (err, result) {
            if (err) { return next(err); }

            var endResult = {
              drafts: [],
              unlisted: [],
              published: []
            };

            var voicesLength = result.length;

            result.forEach(function (val) {
              switch (val.status) {
                case 'STATUS_DRAFT':
                  endResult.drafts.push(val);
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
                res.locals.voicesLength = voicesLength;
                res.locals.voices = endResult;
                res.render('people/myVoices');
              },
              json: function () {
                res.json(endResult);
              },
            });
          });

        });
      });
    },

    feed: function (req, res, next) {
      ACL.isAllowed('feed', 'entities', req.role, {
        currentEntity: req.entity,
        currentPerson: req.currentPerson
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        Notification.find({ follower_id: hashids.decode(req.currentPerson.id)[0] }, function (err, notifications) {
          var actionIds = notifications.map(function (val) { return val.actionId; });

          FeedAction.whereIn('id', actionIds, function (err, actions) {
            FeedPresenter.build(actions, req.currentPerson, false, function (err, presentedFeed) {
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

    savedPosts : function savedPosts(req, res, next) {
      ACL.isAllowed('savedPosts', 'entities', req.role, {
        currentEntity : req.entity,
        currentPerson : req.currentPerson
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError);
        }

        SavedPost.find({ 'entity_id' : response.entity.id }, function(err, result) {
          if (err) { next(err); return; }

          var posts = [];

          async.each(result, function(sp, done) {
            var sp = new SavedPost(sp);
            sp.post(function(err, post) {
              posts.push(post);
              done();
            });
          }, function(err) {
            if (err) { next(err); return; }

            PostsPresenter.build(posts, req.currentPerson, function(err, result) {
              if (err) {
                return next(err);
              }

              res.format({
                html : function() {
                  res.locals.savedPosts = result;
                  res.render('people/savedPosts.html');
                },
                json : function() {
                  res.json(result);
                }
              });
            });
          });
        });
      });
    },

    getOrganizations : function getOrganizations(req, res, next) {
      var entity = req.currentPerson;
      var orgsMemberOf;
      var orgsOwnerOf;

      async.series([
        function (done) {
          EntityMembership.find({ member_id: hashids.decode(entity.id)[0] }, function (err, result) {
            if (err) { return done(err); }

            var entityIds = result.map(function (val) {
              return val.entityId;
            })

            Entity.whereIn('id', entityIds, function (err, result) {
              if (err) { return done(err); }

              result = result.filter(function(item) {
                if (item.type === 'organization') {
                  return true;
                }
              });

              EntitiesPresenter.build(result, req.currentPerson, function (err, result) {
                if (err) { return done(err); }

                orgsMemberOf = result;
                done();
              })
            })
          })
        },

        function (done) {
          EntityOwner.find({ owner_id: hashids.decode(entity.id)[0] }, function (err, result) {
            if (err) { return done(err); }

            var entityIds = result.map(function (val) {
              return val.ownedId;
            });

            Entity.whereIn('id', entityIds, function (err, result) {
              if (err) { return done(err); }

              result = result.filter(function(item) {
                if (item.type === 'organization') {
                  return true;
                }
              });

              EntitiesPresenter.build(result, req.currentPerson, function (err, result) {
                if (err) { return done(err); }

                orgsOwnerOf = result;

                done();
              })
            })
          })
        }
      ], function (err) {
        if (err) { return next(err); }

        var result = orgsOwnerOf.concat(orgsMemberOf);

        res.json(result);
      })
    }
  }
});

module.exports = new PeopleController();
