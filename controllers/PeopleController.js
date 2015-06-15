var PeopleController = Class('PeopleController').inherits(EntitiesController)({
  prototype : {
    init : function () {
      return this;
    },

    savedPosts : function savedPosts (req, res, next) {
      var entity = req.entity;
      SavedPosts.find({entityId: entity.id}, function (err, result) {
        if (err) { next(err); return; }

        res.format({
          'application/json': function () {
            res.json(result);
          },
          'text/html': function () {
            res.locals.savedPosts = result;
            res.render('people/saved_posts.html', {});
          }
        });
      });
    },
  }
});

module.exports = new PeopleController();
