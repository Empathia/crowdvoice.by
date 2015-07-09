var VoicesPresenter = require(path.join(process.cwd(), '/presenters/VoicesPresenter.js'));

var PeopleController = Class('PeopleController').inherits(EntitiesController)({
  prototype : {
    init : function () {
      return this;
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
          res.format({
            'application/json': function() {
              res.json(posts);
            },
            'text/html': function() {
              res.locals.savedPosts = posts;
              res.render('people/saved_posts.html', {});
            }
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
              return val.entityId;
            })

            Entity.whereIn('id', entityIds, function (err, result) {
              if (err) { return done(err); }

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

        var result = orgsOwnerOf.concat(orgsMemberOf)

        res.json(result);
      })
    }
  }
});

module.exports = new PeopleController();
