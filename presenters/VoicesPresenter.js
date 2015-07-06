var VoicesPresenter = Module('VoicesPresenter')({
  build : function build(voices, callback) {
    var response = [];
    async.each(voices, function(voice, nextVoice) {
      var voiceInstance = new Voice(voice);

      voiceInstance.id = hashids.encode(voiceInstance.id);
      voiceInstance.ownerId = hashids.encode(voiceInstance.ownerId);

      Slug.find({ voice_id : voice.id }, function(err, result) {
        if (err) {
          return nextVoice(err);
        }

        voiceInstance.slug = result[0].url;

        Entity.find({ id : voice.ownerId }, function(err, result) {
          if (err) {
            return nextVoice(err);
          }

          var owner;

          if (result.length === 0) {
            owner = new Entity({
              id : hashids.encode(0),
              name : 'Anonymous',
              lastname : null,
              profileName : 'anonymous'
            });
          } else {
            owner = new Entity(result[0]);

            owner.id = hashids.encode(owner.id);
          }

          voiceInstance.author = owner;

          // Images

          var images = {};

          for (var version in voiceInstance.imageMeta) {
            images[version] = {
              url : voiceInstance.image.url(version),
              meta : voiceInstance.image.meta(version)
            }
          }

          voiceInstance.images = images;

          response.push(voiceInstance);

          nextVoice();
        });
      });
    }, function(err) {
      return callback(err, response);
    });
  }
});

module.exports = VoicesPresenter;
