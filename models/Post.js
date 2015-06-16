var ImageUploader = require(__dirname + '/../lib/image_uploader.js');
var Post = Class('Post').inherits(Argon.KnexModel).includes(ImageUploader)({

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
    ownerId       : ['required'],
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
    ownerId       : null,
    voiceId       : null,
    approved      : false,
    imageBaseUrl  : null,
    imageMeta     : {},
    sourceService : null,
    sourceType    : null,
    sourceUrl     : null,
    title         : null,
    description   : null,
    publishedAt   : null,
    createdAt     : null,
    updatedAt     : null,

    init : function init(config) {
      Argon.KnexModel.prototype.init.call(this, config);

      var model = this;

      // Ensure publishedAt is present to prevent a validation error
      this.bind('beforeValidate', function() {
        if (!model.publishedAt) {
          model.publishedAt =  new Date();
        }
      });

      // Set publishedAt to be the same as createdAt on create
      this.bind('beforeCreate', function(){
        model.publishedAt =  model.createdAt;
      });

      // Add image attachment
      this.hasImage({
        propertyName: 'image',
        versions: {
          medium: function (readStream) {
            return readStream.pipe(sharp().resize(340));
          }
        },
        bucket: 'crowdvoice.by',
        basePath: '{env}/{modelName}_{id}/{property}_{versionName}.{extension}'
      });
    },

    toJSON : function toJSON () {
      var json = {};

      Object.keys(this).forEach(function(property) {
        if (property === 'id' || property === 'ownerId' || property === 'voiceId') {
          json[property] = hashids.encode(this[property]);
        } else {
          json[property] = this[property];
        }
      });

      return json;
    }
  }
});

module.exports = Post;
