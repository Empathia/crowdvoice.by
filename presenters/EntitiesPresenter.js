var EntitiesPresenter = Module('EntitiesPresenter')({
  build : function build(entities, callback) {
    var response = [];

    async.each(entities, function(entity, done) {
      var entityInstance = new Entity(entity);

      entityInstance.id = hashids.encode(entityInstance.id);

      var images = {};

      for (var version in entityInstance.imageMeta) {
        images[version] = {
          url : entityInstance.image.url(version),
          meta : entityInstance.image.meta(version)
        }
      }

      entityInstance.images = images;

      var backgrounds = {};

      for (var version in entityInstance.backgroundMeta) {
        backgrounds[version] = {
          url : entityInstance.background.url(version),
          meta : entityInstance.background.meta(version)
        };
      }

      entityInstance.backgrounds = backgrounds;

      response.push(entityInstance);

      done();
    }, function(err) {
      if (err) {
        return callback(err);
      }

      callback(null, response);
    });
  }
});

module.exports = EntitiesPresenter;
