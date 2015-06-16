Module('PostsPresenter')({
  build : function build(posts, callback) {
    async.each(posts, function(post, next) {

      var postInstance = new Post(post);

      post.id           = hashids.encode(post.id);
      post.voiceId      = hashids.encode(post.voiceId);
      post.ownerId      = hashids.encode(post.ownerId);
      post.image        = postInstance.image.url('medium');
      post.imageWidth   = postInstance.image.meta('medium').width
      post.imageHeight  = postInstance.image.meta('medium').height
      next();
    }, function(err) {
      callback(err, posts);
    });
  }
});
