var PostsPresenter = Module('PostsPresenter')({
  build : function build(posts, callback) {
    async.eachLimit(posts, 1, function(post, next) {

      var postInstance = new Post(post);

      post.id           = hashids.encode(post.id);
      post.voiceId      = hashids.encode(post.voiceId);
      post.ownerId      = hashids.encode(post.ownerId);

      if (postInstance.image.meta('medium')) {
        post.image        = postInstance.image.url('medium');
        post.imageWidth   = postInstance.image.meta('medium').width;
        post.imageHeight  = postInstance.image.meta('medium').height;
      }

      next();
    }, function(err) {
      callback(err, posts);
    });
  }
});

module.exports = PostsPresenter;
