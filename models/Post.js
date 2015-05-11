var Post = Class('Post').inherits(Argon.KnexModel)({

  // Source services:
  SOURCE_SERVICE_RAW:     "raw",
  SOURCE_SERVICE_LINK:    "link",
  SOURCE_SERVICE_VIMEO:   "vimeo",
  SOURCE_SERVICE_YOUTUBE: "youtube",
  SOURCE_SERVICE_YFROG:   "yfrog",
  SOURCE_SERVICE_TWITPIC: "twitpic",
  SOURCE_SERVICE_FLICKR:  "flickr",

  // Source types:
  SOURCE_TYPE_IMAGE:      "image",
  SOURCE_TYPE_VIDEO:      "video",
  SOURCE_TYPE_LINK:       "link",
  SOURCE_TYPE_VIDEO:      "text",

  validations : {
    voiceId       : ['required'],
    sourceType    : ['required'],
    sourceUrl     : ['required'],
    sourceService : ['required'],
    publishedAt   : ['required']
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'Posts'
  })),

  findByVoiceId : function findByVoiceId(voiceId, callback) {
    var Model, request;

    Model = this;

    request = {
      action : 'findByVoiceId',
      model : Model,
      params : {
        'voice_id' : voiceId
      }
    };

    this.dispatch('beforeFindByVoiceId');

    this.storage.findById(request, function(err, data) {
      callback(err, data);
      Model.dispatch('afterFindByVoiceId');
    });
  },

  prototype : {
    id            : null,
    approved      : false,
    image         : null,
    imageWidth    : null,
    imageHeight   : null,
    sourceType    : null,
    sourceUrl     : null,
    sourceService : null,
    title         : '',
    description   : '',
    voiceId       : null,
    publishedAt   : null,
    createdAt     : null,
    updatedAt     : null,

    init : function init(config) {
      Argon.KnexModel.prototype.init.call(this, config);

      var model = this;

      model.publishedAt = new Date();

      // Set publishedAt to be the same as createdAt on create
      this.bind('beforeCreate', function() {
        console.log('BEFORECREATE'.green)
        model.publishedAt =  model.createdAt;
      });


      // Update the voice.postCount on create
      this.bind('afterCreate', function(data) {
        Voice.findById(model.voiceId, function(err, result) {
          var voice = new Voice(result[0]);
          voice.updatePostCount(true, function(err, saveResult) {
            if (err) {
              throw new Error(err);
            } else {
              logger.log('Voice ' + voice.id + ' postCount updated ' + voice.postCount);
            }
          });
        });
      });

      // Update the voice.postCount on destroy
      this.bind('afterDestroy', function(data) {
        Voice.findById(model.voiceId, function(err, result) {
          var voice = new Voice(result[0]);
          voice.updatePostCount(false, function(err, saveResult) {
            if (err) {
              throw new Error(err);
            } else {
              logger.log('Voice ' + voice.id + ' postCount updated ' + voice.postCount);
            }
          });
        });
      })
    }
  }
});

module.exports = Post;
