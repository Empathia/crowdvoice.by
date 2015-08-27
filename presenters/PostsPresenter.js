'use strict'

var PostsPresenter = Module('PostsPresenter')({
  build : function build(posts, currentPerson, callback) {
    var response = [];

    async.eachLimit(posts, 1, function(post, next) {

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

      async.series([

        // votes
        function(done) {
          if (currentPerson) {
            Vote.find({
              'entity_id' : hashids.decode(currentPerson.id)[0],
              'post_id' : postInstance.id
            }, function(err, result) {
              if (err) { return done(err); }

              post.voted = true;

              if (result.length === 0) {
                post.voted = false;
              }

              return done();
            });
          } else {
            post.voted = false;
            return done();
          }
        },

        // saved
        function(done) {
          if (currentPerson) {
            SavedPost.find({
              entity_id: hashids.decode(currentPerson.id)[0],
              post_id: postInstance.id
            }, function (err, result) {
              if (err) { return done(err); }

              if (result.length > 0) {
                post.saved = true;
              } else {
                post.saved = false;
              }

              console.log('RESULT', result, {
                entity_id: hashids.decode(currentPerson.id)[0],
                post_id: postInstance.id
              }, currentPerson.id)

              post.currentPerson = currentPerson;
              post.postInstance = postInstance

              return done();
            });
          } else {
            post.saved = false;
            return done();
          }
        },

        // totalSaves
        function(done) {
          SavedPost.find({
            post_id: postInstance.id
          }, function (err, result) {
            if (err) { return done(err); }

            post.totalSaves = result.length

            return done();
          });
        }, function(done) {

          // voice
          Voice.find({ id : postInstance.voiceId }, function(err, result) {
            if (err) {
              return done(err);
            }

            VoicesPresenter.build(result, currentPerson, function(err, voices) {
              if (err) {
                return done(err);
              }

              post.voice = voices[0];

              done();
            });
          });
        } ], function(err) {
        if (err) { return next(err); }

        response.push(post);
        return next();
      });
    }, function(err) {
      callback(err, response);
    });
  }
});

module.exports = PostsPresenter;
