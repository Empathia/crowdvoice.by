var ImageUploader = require(__dirname + '/../lib/image_uploader.js');
var Post = Class('Post').inherits(Argon.KnexModel).includes(ImageUploader)({

  // Source services:
  SOURCE_SERVICE_RAW:     'raw',
  SOURCE_SERVICE_LINK:    'link',
  SOURCE_SERVICE_VIMEO:   'vimeo',
  SOURCE_SERVICE_YOUTUBE: 'youtube',
  SOURCE_SERVICE_YFROG:   'yfrog',
  SOURCE_SERVICE_TWITPIC: 'twitpic',
  SOURCE_SERVICE_FLICKR:  'flickr',
  SOURCE_SERVICE_LOCAL:   'local',

  // Source types:
  SOURCE_TYPE_IMAGE:      'image',
  SOURCE_TYPE_VIDEO:      'video',
  SOURCE_TYPE_LINK:       'link',
  SOURCE_TYPE_TEXT:       'text',

  validations : {
    ownerId       : ['required'],
    voiceId       : ['required'],
    sourceType    : ['required'],
    sourceUrl     : [
      {
        rule: function (val) {
          if (this.target.sourceType !== Post.SOURCE_TYPE_TEXT && !val) {
            throw new Checkit.FieldError('sourceService is required unless sourceType === "text"');
          }
        },
        message: 'sourceService is required unless sourceType === "text"'
      }
    ],
    sourceService : ['required'],
    publishedAt   : ['required'],
    title         : ['required', 'maxLength:65'],
    description   : [
      'required',
      {
        rule: function (val) {
          if (this.target.sourceType !== Post.SOURCE_TYPE_TEXT && val.length > 180) {
            throw new Checkit.FieldError('The description must be less than 65 characters.');
          }
        },
        message: 'The description must be less than 65 characters.'
      }
    ],
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
          small: function (readStream) {
            if (!useGM) {
              return readStream.pipe(
                sharp()
                  .resize(85)
                  .embed()
                  .flatten()
                  .background('#FFFFFF')
                  .quality(80)
              );
            } else {
              return gm(readStream)
                .resize(85)
                .stream()
            }
          },
          medium: function (readStream) {
            if (!useGM) {
              return readStream.pipe(
                sharp()
                  .resize(340)
                  .embed()
                  .flatten()
                  .background('#FFFFFF')
                  .quality(80)
              );
            } else {
              return gm(readStream)
                .resize(340)
                .stream()
            }
          },
          big: function(readStream) {
            return readStream.pipe(
              sharp()
                .resize(2560,1113)
                .interpolateWith(sharp.interpolator.nohalo)
                .progressive()
                .flatten()
                .background('#FFFFFF')
                .quality(100)
                .blur(25)
            );
          }
        },
        bucket: 'crowdvoice.by',
        basePath: '{env}/{modelName}_{id}/{property}_{versionName}.{extension}'
      });
    }
  }
});

module.exports = Post;
