var PostsPresenter = Module('PostsPresenter')({
  build : function build(posts, currentPerson, callback) {
    var response = [];

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

      if (currentPerson) {
        Vote.find({
          'post_id' : postInstance.id,
          'entity_id' : hashids.decode(currentPerson.id)[0]
        }, function(err, result) {
          if (err) {
            return next(err);
          }

          post.voted = true;

          if (result.length === 0) {
            post.voted = false;
          }

          response.push(post);
          return next();
        });
      } else {
        post.voted = false;
        response.push(post);
        return next();
      }
    }, function(err) {
      callback(err, response);
    });
  }
});

module.exports = PostsPresenter;
