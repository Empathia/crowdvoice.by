Module('PostsPresenter')({
  build : function build(posts, callback) {
    async.each(posts, function(post, next) {

      post.id       = hashids.encode(post.id);
      post.voiceId  = hashids.encode(post.voiceId);
      post.ownerId  = hashids.encode(post.ownerId);
    }, function(err) {
      callback(err, posts);
    });
  }
});
