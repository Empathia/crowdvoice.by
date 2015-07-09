var EntitiesPresenter = Module('EntitiesPresenter')({
  build : function build(entities, callback) {
    var response = [];

    async.each(entities, function(entity, nextEntity) {
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

      async.series([function(done) {
        db('Voices').count('*').where({
          'owner_id' : entity.id,
          status : 'STATUS_PUBLISHED'
        }).exec(function(err, result) {
          if (err) {
            return done(err);
          }

          entityInstance.voicesCount = parseInt(result[0].count, 10);

          done();
        });
      }, function(done) {
        db('EntityFollower').count('*').where({
          'followed_id' :  entity.id
        }).exec(function(err, result) {
          if (err) {
            return done(err);
          }

          entityInstance.followersCount = parseInt(result[0].count, 10);

          done();
        });
      }, function(done) {
        db('EntityFollower').count('*').where({
          'follower_id' : entity.id
        }).exec(function(err, result) {
          if (err) {
            return done(err);
          }

          var entityFollowingCount = parseInt(result[0].count, 10);

          VoiceFollower.find({
            'entity_id' : entity.id
          }, function(err, result) {
            if (err) {
              return next(err);
            }

            var voiceIds = result.map(function(item) {
              return item.voiceId;
            });

            Voice.whereIn('id', voiceIds, function(err, result) {
              if (err) {
                return next(err);
              }

              var voices = result.filter(function(item) {
                if (item.status === Voice.STATUS_PUBLISHED) {
                  return true;
                }
              });

              entityInstance.followingCount = entityFollowingCount + voices.length;

              done();
            });
          });
        });
      }, function(done) {
        db('EntityMembership').count('*').where({
          'entity_id' : entity.id
        }).exec(function(err, result) {
          if (err) {
            return done(err);
          }

          entityInstance.membershipCount = parseInt(result[0].count, 10);

          done();
        });
      }], function(err) {
        if (err) {
          return nextEntity(err);
        }

        response.push(entityInstance);

        nextEntity();
      })
    }, function(err) {
      if (err) {
        return callback(err);
      }

      callback(null, response);
    });
  }
});

module.exports = EntitiesPresenter;
