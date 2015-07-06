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

    voices : function voices(req, res, next) {
      Voice.find({
        'owner_id' : req.entity.id,
        status : Voice.STATUS_PUBLISHED
      }, function(err, result) {
        if (err) { next(err); return; }

        VoicesPresenter.build(result, function(err, voices) {
          if (err) {
            return next(err);
          }

          res.format({
            json : function() {
              res.json(voices);
            }
          });
        });
      });
    }
  }
});

module.exports = new PeopleController();
