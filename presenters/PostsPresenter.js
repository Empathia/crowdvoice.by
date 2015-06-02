Module('PostsPresenter')({
  build : function build(posts, callback) {
    async.each(posts, function(post, next) {

      post.id       = hashids.encode(post.id);
      post.voiceId  = hashids.encode(post.voiceId);

      async.series([function(done) {
        Entity.findById(post.ownerId, function(err, result) {
          if (err) {
            return done(err);
          }

          post.owner = new Entity(result[0]);
          post.owner.id = hashids.encode(post.ownerId);

          delete post.ownerId;

          done();
        })
      }], function(err) {
        next(err);
      })
    }, function(err) {
      callback(err, posts);
    });
  }
});
