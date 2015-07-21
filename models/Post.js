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
    tableName : 'Posts',
    queries : {
      whereIn : function(requestObj, callback) {
        db(requestObj.model.storage.tableName).whereIn(requestObj.columnName, requestObj.array).exec(callback);
      }
    },

    whereIn : function whereIn(requestObj, callback) {
      // var data;
      var storage = this;

      for (i = 0; i < storage.preprocessors.length; i++) {
        requestObj.data = storage.preprocessors[i](requestObj.data, requestObj);
      }

      this.queries.whereIn(requestObj, function(err, data) {
        for (i = 0; i < storage.processors.length; i++) {
          data = storage.processors[i](data, requestObj);
        }

        return callback(err, data);
      });
    }
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

  whereIn : function WhereIn(columnName, array, callback) {
    var Model, request;

    Model = this;

    request = {
      action : 'whereIn',
      model : Model,
      columnName : columnName,
      array : array
    };

    this.dispatch('beforeWhereIn');

    this.storage.whereIn(request, function(err, data) {
      callback(err, data);
      Model.dispatch('afterWhereIn');
    });

    return this;
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

      // Set publishedAt to be the same as createdAt on create if not present
      this.bind('beforeCreate', function() {
        if (!model.publishedAt) {
          model.publishedAt =  model.createdAt;
        } else {
          model.publishedAt = new Date(model.publishedAt);
        }
      });

      // Add image attachment
      this.hasImage({
        propertyName: 'image',
        versions: {
          medium: function (readStream) {
            return readStream.pipe(
              sharp()
                .resize(340)
                .interpolateWith(sharp.interpolator.nohalo)
                .embed()
                .progressive()
                .flatten()
                .background('#FFFFFF')
                .quality(100)
            );
          }
        },
        bucket: 'crowdvoice.by',
        basePath: '{env}/{modelName}_{id}/{property}_{versionName}.{extension}'
      });
    }

    // toJSON : function toJSON () {
    //   var json = {};
    //
    //   Object.keys(this).forEach(function(property) {
    //     if (property === 'id' || property === 'ownerId' || property === 'voiceId') {
    //       json[property] = hashids.encode(this[property]);
    //     } else {
    //       json[property] = this[property];
    //     }
    //   });
    //
    //   return json;
    // }
  }
});

module.exports = Post;
