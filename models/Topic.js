var Topic = Class('Topic').inherits(Argon.KnexModel).includes(ImageUploader)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'Topics'
  })),

  prototype : {
    init : function (config) {
      Argon.KnexModel.prototype.init.call(this, config);

      this.hasImage({
        propertyName: 'image',
        versions : {
          icon: function (readStream) {
            return readStream.pipe(sharp().resize(28,28)); // TODO: Confirm dimensions.
          },
        },
        bucket: 'crowdvoice.by',
        basePath: '{env}/{modelName}_{id}/{property}_{versionName}.{extension}'
      });
    }
  }
});

module.exports = Topic;
