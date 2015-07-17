var VoicesPresenter = require(path.join(process.cwd(), '/presenters/VoicesPresenter.js'));
var PostsPresenter = require(path.join(process.cwd(), '/presenters/PostsPresenter.js'));

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

        Voice.find({ owner_id: response.entity.id }, function (err, result) {
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
              res.render('person/myVoices');
            },
            json: function () {
              res.json(endResult);
            },
          })
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

        res.render('people/feed');
      });
    },

    savedPosts : function savedPosts(req, res, next) {
      var entity = req.entity;
      SavedPost.find({ 'entity_id' : entity.id }, function(err, result) {
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

          PostsPresenter.build(posts, function(err, result) {
            if (err) {
              return next(err);
            }

            res.format({
              'application/json': function() {
                res.json(result);
              },
              'text/html': function() {
                res.locals.savedPosts = result;
                res.render('people/saved_posts.html');
              }
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
