var PostsController = Class('PostsController')({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      this._initRouter();

      return this;
    },

    _initRouter : function() {
      application.router.route('/:profileName/:voiceSlug/')
        .post(this.create);

      application.router.route('/:profileName/:voiceSlug/:postId')
        .get(this.show)
        .put(this.update)
        .delete(this.destroy);
    },

    show : function show(req, res, next) {
      var post;
      var voice;
      var entity;

      async.series([function(done) {
        Post.findById(req.params.postId, function(err, result) {
          if (err) {
            return done(err);
          }

          if (result.length === 0) {
            return done(new NotFoundError('Post Not Found'));
          }

          post = new Post(result[0]);

          done();
        });
      }, function(done) {
        Voice.findBySlug(req.params.voiceSlug, function(err, result) {
          if (err) {
            return done(err);
          }

          if (result.length === 0) {
            return done(new NotFoundError('Voice Not Found'));
          }

          voice = new Voice(result[0]);

          done();
        })
      }, function(done) {
        Entity.find({'profile_name' : req.params.profileName}, function(err, result) {
          if (err) {
            return done(err);
          }

          if (result.length === 0) {
            return done(new NotFoundError('Entity Not Found'));
          }

          entity = new Entity(result[0]);

          done();
        })
      }], function(err) {
        if (err) {
          return next(err);
        }

        res.format({
          json : function() {
            res.json(post.toJSON());
          },
          html : function() {
            res.render('posts/show', {layout : 'application', entity : entity.toJSON(), voice : voice.toJSON(), post : post.toJSON()});
          }
        })

      });
    },

    new : function(req, res) {
      res.render('posts/new.html');
    },

    create : function create(req, res) {
      res.redirect('/post/id');
    },

    edit : function edit(req, res) {
      res.render('posts/edit.html', {layout : false});
    },

    update : function update(req, res) {
      res.redirect('/post/id');
    },

    destroy : function destroy(req, res) {
      res.redirect('/posts');
    }
  }
});

module.exports = new PostsController();
