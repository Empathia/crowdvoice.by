var EntitiesPresenter = require('./EntitiesPresenter.js');
var TopicsPresenter = require('./TopicsPresenter.js');

var VoicesPresenter = Module('VoicesPresenter')({
  build : function build(voices, callback) {
    var response = [];
    async.each(voices, function(voice, nextVoice) {
      var voiceInstance = new Voice(voice);

      voiceInstance.id = hashids.encode(voiceInstance.id);
      voiceInstance.ownerId = hashids.encode(voiceInstance.ownerId);

      Slug.find(['voice_id = ? ORDER BY id DESC LIMIT 1', [voice.id]], function(err, result) {
        if (err) {
          return nextVoice(err);
        }

        voiceInstance.slug = result[0].url;

        Entity.find({ id : voice.ownerId }, function(err, entities) {
          if (err) {
            return nextVoice(err);
          }

          EntitiesPresenter.build(entities, function(err, result) {
            if (err) {
              return nextVoice(err);
            }

            voiceInstance.owner = result[0];

            // Images
            var images = {};

            for (var version in voiceInstance.imageMeta) {
              images[version] = {
                url : voiceInstance.image.url(version),
                meta : voiceInstance.image.meta(version)
              };
            }

            voiceInstance.images = images;

            var topicIds = [];

            async.series([function(done) {
              VoiceTopic.find({ 'voice_id' : voice.id }, function(err, result) {
                if (err) {
                  return done(err);
                }

                topicIds = result.map(function(item) {
                  return item.topicId;
                });

                done();
              });
            }, function(done) {

              // Topics
              Topic.whereIn('id', topicIds, function(err, result) {
                if (err) {
                  return done(err);
                }

                TopicsPresenter.build(result, function(err, topics) {
                  if (err) {
                    return done(err);
                  }

                  voiceInstance.topics = topics;

                  done();
                });
              });
            }, function(done) {

              // Followers
              VoiceFollower.find({ 'voice_id' : voice.id }, function(err, voiceFollowers) {
                var followerIds = voiceFollowers.map(function(item) {
                  return item.entityId;
                });

                Entity.whereIn('id', followerIds, function(err, result) {
                  if (err) {
                    return done(err);
                  }
                  EntitiesPresenter.build(result, function(err, followers) {
                    if (err) {
                      return done(err);
                    }

                    voiceInstance.followers = followers;

                    done();
                  });
                });
              });
            }], function(err) {
              if (err) {
                return nextVoice(err);
              }

              delete voiceInstance.imageMeta;
              delete voiceInstance.imageBaseUrl;
              delete voiceInstance.ownerId;

              response.push(voiceInstance);

              nextVoice();
            });
          });
        });
      });
    }, function(err) {
      return callback(err, response);
    });
  }
});

module.exports = VoicesPresenter;
