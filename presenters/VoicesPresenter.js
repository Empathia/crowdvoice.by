var EntitiesPresenter = require('./EntitiesPresenter.js');

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

        Entity.find({ id : voice.ownerId }, function(err, entities) {
          if (err) {
            return nextVoice(err);
          }

          EntitiesPresenter.build(entities, function(err, result) {
            console.log(result)
            if (err) {
              return nextVoice(err);
            }

            voiceInstance.author = result[0];

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
      });
    }, function(err) {
      return callback(err, response);
    });
  }
});

module.exports = VoicesPresenter;
