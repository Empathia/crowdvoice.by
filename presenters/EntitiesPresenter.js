var EntitiesPresenter = Module('EntitiesPresenter')({
  build : function build(entities, currentPerson, callback) {
    var response = [];

    async.each(entities, function(entity, nextEntity) {
      var entityInstance = new Entity(entity);

      entityInstance.id = hashids.encode(entityInstance.id);

      var images = {};

      for (var version in entityInstance.imageMeta) {
        images[version] = {
          url : entityInstance.image.url(version),
          meta : entityInstance.image.meta(version)
        };
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

        // Is followed by me?
        entityInstance.followed = false;

        if (!currentPerson) {
          return done();
        }

        EntityFollower.find({
          'follower_id' : hashids.decode(currentPerson.id)[0],
          'followed_id' : entity.id
        }, function(err, result) {
          if (err) {
            return done(err);
          }

          if (result.length === 0) {
            return done();
          }

          entityInstance.followed = true;

          done();
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
      }, function(done) {

        // An array of ids of organizations this entity owns or is member of

        var organizationIds = [];

        async.series([function(doneOrgs) {

          // Get owned
          EntityOwner.find({
            owner_id : entity.id
          }, function(err, result) {
            if (err) {
              return doneOrgs(err);
            }

            organizationIds = result.map(function(item) {
              return item.ownedId;
            });

            doneOrgs();
          });
        }, function(doneOrgs) {

          // Get the ones this entity is member of
          EntityMembership.find({
            'member_id' : entity.id
          }, function(err, result) {
            if (err) {
              return doneOrgs(err);
            }

            organizationIds = organizationIds.concat(result.map(function(item) {
              return item.entityId;
            }));

            doneOrgs();
          });
        }], function(err) {
          if (err) {
            return done(err);
          }

          Entity.whereIn('id', organizationIds, function(err, result) {
            if (err) {
              return done(err);
            }

            result = result.filter(function(item) {
              if (item.type === 'organization') {
                return true;
              }
            });

            var filteredOrganizationIds = result.map(function(item) {
              return item.id;
            });

            var response = [];

            filteredOrganizationIds.forEach(function(item) {
              response.push(hashids.encode(item));
            });

            entityInstance.organizationIds = response;

            done();
          });
        });
      }, function(done) {

        // Get the Voice ids that the Entity is owner or contributor
        voiceIds = [];

        async.series([function(doneVoice) {

          // Get own voices
          Voice.find({
            'owner_id' : entity.id
          }, function(err, result) {
            if (err) {
              return doneVoice(err);
            }

            voiceIds = result.map(function(item) {
              return item.id;
            });

            doneVoice();
          });
        }, function(doneVoice) {

          // Get voices this entity is contributor of
          VoiceCollaborator.find({
            'collaborator_id' : entity.id
          }, function(err, result) {
            if (err) {
              return doneVoice(err);
            }

            voiceIds = voiceIds.concat(result.map(function(item) {
              return item.voiceId;
            }));

            doneVoice();
          });
        }], function(err) {
          if (err) {
            return done(err);
          }

          var result = [];

          voiceIds.forEach(function(item) {
            result.push(hashids.encode(item));
          });

          entityInstance.voiceIds = result;

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
