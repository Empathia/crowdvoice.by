var Topic = Class('Topic').inherits(Argon.KnexModel).includes(ImageUploader)({

  validations : {
    name : ['required'],
    slug : ['required']
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'Topics'
  })),

  findBySlug : function findBySlug(slugString, done) {
    Topic.find({ slug : slugString }, function(err, result) {
      if (err) {
        return done(err);
      }

      if (result.length === 0) {
        return next(new NotFoundError('Topic Not Found'));
      }

      return done(null, result[0]);
    });
  },

  prototype : {
    name : null,
    slug : null,

    init : function init(config) {
      Argon.KnexModel.prototype.init.call(this, config);

      this.hasImage({
        propertyName: 'image',
        versions : {
          icon: function(readStream) {

            // TODO: Confirm dimensions.
            return readStream.pipe(sharp().resize(28, 28));
          }
        },
        bucket: 'crowdvoice.by',
        basePath: '{env}/{modelName}_{id}/{property}_{versionName}.{extension}'
      });
    }
  }
});

module.exports = Topic;
