'use strict'

var PostsPresenter = Module('PostsPresenter')({
  build : function build(posts, currentPerson, callback) {
    var response = [];

    async.each(posts, function(post, next) {

      var postInstance = new Post(post);

      post.id = hashids.encode(post.id);
      post.voiceId = hashids.encode(post.voiceId);
      post.ownerId = hashids.encode(post.ownerId);

      var images = {};

      for (var version in postInstance.imageMeta) {
        images[version] = {
          url : postInstance.image.url(version),
          meta : postInstance.image.meta(version)
        };
      }

      post.postImages = images;

      if (currentPerson) {
        async.series([
          // votes
          function (next) {
            Vote.find({
              entity_id : hashids.decode(currentPerson.id)[0],
              post_id : postInstance.id
            }, function(err, result) {
              if (err) { return next(err); }

              post.voted = true;

              if (result.length === 0) {
                post.voted = false;
              }

              response.push(post);
              return next();
            });
          },

          // saved/favorited
          function (next) {
            SavedPost.find({
              entity_id: hashids.decode(currentPerson.id)[0],
              post_id: postInstance.id
            }, function (err, result) {
              if (err) { return next(err); }

              if (result.length > 0) {
                post.saved = true;
              } else {
                post.saved = false;
              }

              return next();
            });
          }
        ], next);
      } else {
        post.voted = false;
        post.saved = false;
        response.push(post);
        return next();
      }
    }, function(err) {
      callback(err, response);
    });
  }
});

module.exports = PostsPresenter;
