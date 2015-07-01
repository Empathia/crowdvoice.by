var PeopleController = Class('PeopleController').inherits(EntitiesController)({
  prototype : {
    init : function () {
      return this;
    },

    savedPosts : function savedPosts (req, res, next) {
      var entity = req.entity;
      SavedPost.find({entity_id: entity.id}, function (err, result) {
        if (err) { next(err); return; }

        var posts = [];
        async.each(result, function (sp, done) {
          var sp = new SavedPost(sp);
          sp.post(function (err, post) {
            posts.push(post);
            done();
          });
        }, function (err) {
          if (err) { next(err); return; }
          res.format({
            'application/json': function () {
              res.json(posts);
            },
            'text/html': function () {
              res.locals.savedPosts = posts;
              res.render('people/saved_posts.html', {});
            }
          });
        });
      });
    },

    voices : function voices (req, res, next) {
      Voice.find({owner_id: req.entity.id}, function (err, result) {
        if (err) { next(err); return; }

        var voices = [];
        async.each(result, function (rvoice, done) {
          var rvoice = new Voice(rvoice);
          voices.push(rvoice);
          done();
        }, function (err) {
          if (err) { next(err); return; }
          res.format({
            'application/json': function () {
              res.json(voices);
            }
          });
        });

      });
    },

  }
});

module.exports = new PeopleController();
