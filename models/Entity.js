var ImageUploader = require(__dirname + '/../lib/image_uploader.js');
var Entity = Class('Entity').inherits(Argon.KnexModel).includes(ImageUploader)({

  validations : {
    type: [
      'required',
      {
        rule: function (val) {
          if (!val.match(/(person|organization)/)) {
            throw new Checkit.FieldError('Entity type must be person|organization.')
          }
        },
        message: 'Entity type must be person|organization'
      }
    ],
    name: ['required', 'minLength:1', 'maxLength:512'],
    lastname: ['minLength:1', 'maxLength:512'],
    isAnonymous: ['boolean'],
    profileName: [
      'required',
      {
        rule: function (val) {
          if (val.match(/[^a-zA-Z0-9_-]/)) {
            throw new Checkit.FieldError('Profilename should only contain letters, numbers and dashes.')
          }
        },
        message : 'Profilename should only contain letters, numbers and dashes.'
      }
    ]
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'Entities',
    queries : {
      searchPeople : function(reqObj, callback) {
        db(reqObj.model.storage.tableName).
          where('is_anonymous', '=', false)
          .andWhere('type', '=', 'person')
          .andWhereRaw("(name like ? OR lastname like ? OR profile_name like ?)",['%' + reqObj.params.value + '%', '%' + reqObj.params.value + '%', '%' + reqObj.params.value + '%'])
          .andWhere('id', '!=', reqObj.params.currentPersonId)
          .exec(callback)
      },

      whereIn : function(requestObj, callback) {
        db(requestObj.model.storage.tableName).whereIn(requestObj.columnName, requestObj.array).exec(callback)
      }
    },

    searchPeople : function searchPeople(requestObj, callback) {
      // var data;
      var storage = this;

      for (i = 0; i < storage.preprocessors.length; i++) {
        requestObj.data = storage.preprocessors[i](requestObj.data, requestObj);
      }


      this.queries.searchPeople(requestObj, function(err, data) {
        for (i = 0; i < storage.processors.length; i++) {
          data = storage.processors[i](data, requestObj);
        }

        return callback(err, data);
      });
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
    },
  })),

  searchPeople : function searchPeople(params, callback) {
    var Model, request;

    Model = this;

    request = {
      action : 'searchPeople',
      model : Model,
      params : params
    }


    this.dispatch('beforeSearchPeople');

    this.storage.searchPeople(request, function(err, data) {
      callback(err, data);
      Model.dispatch('afterSearchPeople');
    });

    return this;
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
      id: null,
      type: null,
      name: null,
      lastname: null,
      profileName: null,
      isAnonymous: false,
      createdAt: null,
      updatedAt: null,

      init : function init(config) {
        Argon.KnexModel.prototype.init.call(this, config);

        var model = this;

        this.bind('beforeSave', function() {
          model.profileName = model.profileName.toLowerCase().trim();
        });

        // Add image attachment
        this.hasImage({
          propertyName: 'image',
          versions: {
            icon: function (readStream) {
              return readStream.pipe(
                sharp()
                  .resize(16,16)
                  .interpolateWith(sharp.interpolator.nohalo)
                  .embed()
                  .progressive()
                  .flatten()
                  .background('#FFFFFF')
                  .quality(100)
              );
            },
            small: function (readStream) {
              return readStream.pipe(
                sharp()
                  .resize(36,36)
                  .interpolateWith(sharp.interpolator.nohalo)
                  .embed()
                  .progressive()
                  .flatten()
                  .background('#FFFFFF')
                  .quality(100)
              );
            },
            card: function (readStream) {
              return readStream.pipe(
                sharp()
                .resize(88,88)
                .interpolateWith(sharp.interpolator.nohalo)
                .embed()
                .progressive()
                .flatten()
                .background('#FFFFFF')
                .quality(100)
              );
            },
            medium: function (readStream) {
              return readStream.pipe(
                sharp()
                  .resize(160,160)
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

        // Add image attachment
        this.hasImage({
          propertyName: 'background',
          versions: {
            card: function (readStream) {
              return readStream.pipe(
                sharp()
                  .resize(440)
                  .interpolateWith(sharp.interpolator.nohalo)
                  .progressive()
                  .flatten()
                  .background('#FFFFFF')
                  .quality(100)
              );
            },
            bluredCard: function (readStream) {
              return readStream.pipe(
                sharp()
                  .resize(440)
                  .interpolateWith(sharp.interpolator.nohalo)
                  .progressive()
                  .flatten()
                  .background('#FFFFFF')
                  .blur(5)
                  .quality(100)
              );
            },
            big: function (readStream) {
              return readStream.pipe(
                sharp()
                  .resize(2560, 1113)
                  .interpolateWith(sharp.interpolator.nohalo)
                  .progressive()
                  .flatten()
                  .background('#FFFFFF')
                  .blur(25)
                  .quality(100)
              );
            }
          },
          bucket: 'crowdvoice.by',
          basePath: '{env}/{modelName}_{id}/{property}_{versionName}.{extension}'
        });
      },

      /* Starts following an entity
       * @method: followEntity
       * @params:
       *  + entity
       *  + callback
       */
      followEntity : function followEntity (entity, done) {
        var currentEntity = this;

        // We try to find first if the relation already exists,
        // so we don't duplicate it.
        EntityFollower.find({
          follower_id: currentEntity.id,
          followed_id: entity.id
        }, function (err, result) {
          if (err) { done(err); return; }
          if (result.length > 0) {
            done(null);
          } else {
            var entityFollower = new EntityFollower({
              followerId: currentEntity.id,
              followedId: entity.id
            });
            entityFollower.save(function (err, result) {
              done(err, result);
            });
          }
        });
      },

      /* Returns the current entity followers
       * @method: followers
       * @params:
       *  + callback
       */
      followers : function followers (done) {
        var query = db('Entities').
            select('Entities.*').
            rightJoin('EntityFollower', 'Entities.id', 'EntityFollower.follower_id').
            where('followed_id', '=', this.id);

        if (done) {
          query.then(done);
        } else {
          return query;
        }
      },

      /* Returns the followedEntities made by the current entity
       * @method: followedEntities
       */
      followedEntities : function followedEntities (done) {
        var query = db('Entities').
            select('Entities.*').
            rightJoin('EntityFollower', 'Entities.id', 'EntityFollower.followed_id').
            where('follower_id', '=', this.id);

        if (done) {
          query.then(done);
        } else {
          return query;
        }
      },

      /* Follows a voice
       * @method followVoice
       * @params:
       *  + voice
       *  + callback
       */
      followVoice: function followVoice (voice, done) {
        var vf = new VoiceFollower({
          entityId: this.id,
          voiceId: voice.id
        });
        vf.save(function (err, result) {
          done(err, result);
        });
      },

      /* Followed voices
       * @method: followedVoices
       * @params:
       *  + callback
       */
      followedVoices: function followedVoices (done) {
        var query = db('Voices').
            select('Voices.*').
            rightJoin('VoiceFollowers', 'Voices.id', 'VoiceFollowers.voice_id').
            where('entity_id', '=', this.id);

        if (done) {
          query.then(done);
        } else {
          return query;
        }
      },

      /* Invite another entity to join the organization
       * @method inviteEntity
       * @property entity <Object>
       * @return undefined
       */
      inviteEntity: function inviteEntity (entity, done) {
        var currentEntity = this;

        // We try to find first if the relation already exists,
        // so we don't duplicate it.
        InvitationRequest.find({
          invitator_entity_id: currentEntity.id,
          invited_entity_id: entity.id
        }, function (err, result) {
          if (err) { done(err); return; }
          if (result.length > 0) {
            done(null);
          } else {
            var invite = new InvitationRequest({
              invitatorEntityId: currentEntity.id,
              invitedEntityId: entity.id
            });
            invite.save(function (err, result) {
              done(err, result);
            });
          }
        });
      },

      /* Make an entity belong to current entity.
       * @method setOwnershipTo
       * @property entity <Object>
       * @return undefined
       */
      setOwnershipTo : function setOwnershipTo(entity, done) {
        var ownerRelation = new EntityOwner({
          ownerId: this.id,
          ownedId: entity.id
        });

        ownerRelation.save(function(err, result) {
          done(err, result);
        });
      },

      /* Make an organization belong to current entity.
       * @method ownOrganization
       * @property organization <Object>
       * @return undefined
       */
      ownOrganization: function ownOrganization (organization, done) {
        var ownerRelation = new EntityOwner({
          ownerId: this.id,
          ownedId: organization.id
        });
        ownerRelation.save(function (err, result) {
          done(err, result);
        });
      },

      /* Return owner, if any.
       * @method owner
       * @return entity <Object>
       */
      owner: function owner (done) {
        if (!done) { return; }

        var entity = this;

        EntityOwner.find({
          owned_id: entity.id
        }, function (err, result) {
          if (err) { done(err); return; }

          if (result.length === 0) {
            done(null, [])
          } else {
            Entity.find({id: result[0].ownerId}, function (err, result) {

              if (err) { done(err); return; }
              done(null, result[0]);
            });
          }
        });
      },

      isOwnerOf : function isOwnerOf(entityId, callback) {
        if (!this.id) {
          return callback("Entity doesn't have an id");
        }

        EntityOwner.find({'owner_id' : this.id, 'owned_id' : entityId}, function(err, result) {
          if (err) {
            return callback(err);
          }

          if (result.length === 0) {
            return callback(null, false);
          } else {
            return callback(null, true);
          }
        });
      },

      addMember : function addMember(person, callback) {
        if (!this.id) {
          return callback(new Error('Must have an ID'));
        }

        if (this.type !== 'organization') {
          return callback(new Error('Entity is not an organization'));
        }

        if (person.type !== 'person') {
          return callback(new Error('Member is not a person'));
        }

        var entityMembership = new EntityMembership({
          entityId : this.id,
          memberId : person.id
        });

        return entityMembership.save(callback);
      },

      isMemberOf : function isMemberOf(entityId, callback) {
        if (!this.id) {
          return callback("Entity doesn't have an id");
        }

        EntityMembership.find({'entity_id' : entityId, 'member_id' : this.id}, function(err, result) {
          if (err) {
            return callback(err);
          }

          if (result.length === 0) {
            return callback(null, false);
          } else {
            return callback(null, true);
          }
        });
      },

      /* Return organizations for which the current entity is owner or member.
       * @method organizations
       * @return callback(err <Error>, organizations <Array>) <Callback>
       */
      organizations : function organizations(callback) {
        var entity = this;

        if (!this.id) {
          return callback(new Error("Entity doesn't have an id"));
        }

        var organizations = [];

        async.series([function(done) {
          EntityOwner.find({'owner_id' : entity.id}, function(err, result) {
            if (err) {
              return done(err);
            }

            var ownedIds = result.map(function(item) {return item.ownedId});

            if (ownedIds.length === 0) {
              return done();
            }

            Entity.whereIn('id', ownedIds, function(err, result) {
              if (err) {
                return done(err);
              }

              organizations = organizations.concat(result);

              done();
            })
          })
        }, function(done) {
          EntityMembership.find({'member_id': entity.id}, function(err, result) {
            if (err) {
              return done(err);
            }

            var entityIds = result.map(function(item) {return item.entityId});

            if (entityIds.length === 0) {
              return done();
            }

            Entity.whereIn('id', entityIds, function(err, result) {
              if (err) {
                return done(err);
              }

              organizations = organizations.concat(result);

              done();
            })
          })
        }], function(err) {
          if (err) {
            logger.error(err)
            return callback(err);
          }

          organizations = organizations.filter(function(item) {return item.type === 'organization'})

          var result = [];

          organizations.forEach(function(organization) {
            var orgInstance = new Entity(organization);

            orgInstance = orgInstance.toJSON()
            result.push(orgInstance)
          })

          callback(null, result)
        })


      },

      /* Return voices for which the current entity is owner.
       * @method voices
       * @return voices <Array>
       */
      voices: function voices (done) {
        Voice.find({owner_id: this.id}, done);
      },

      /* Returns, for a given entity, the set of voices that belong
       * to those entities that the given entity is following and are not
       * being followed by the given entity.
       */
      recommendedVoices: function (done) {
        var query = db('Voices');
        query.leftJoin('VoiceFollowers', 'Voices.id', 'VoiceFollowers.voice_id');
        query.leftJoin('EntityFollower', 'Voices.owner_id', 'EntityFollower.followed_id');
        query.whereRaw('("VoiceFollowers".entity_id <> ? or "VoiceFollowers".entity_id is null)', [this.id]);
        query.andWhere('EntityFollower.follower_id', '=', this.id);

        query.exec(done);
      },

      toJSON : function toJSON() {
        var model = this;
        var json = {};

        Object.keys(this).forEach(function(property) {

          if (property === 'id' && !isNaN(model.id)) {
            json[property] = hashids.encode(model.id);
          } else {
            json[property] = model[property];
          }
        });

        delete json.eventListeners;

        return json;
      }
  }
});

module.exports = Entity;
