var Entity = Class('Entity').inherits(Argon.KnexModel)({

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
    tableName : 'Entities'
  })),

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

        EntityOwner.find({
          ownedId: this.id
        }, function (err, result) {
          if (err) { done(err); return; }
          Entity.find({id: result[0].owner_id}, function (err, result) {
            if (err) { done(err); return; }
            done(null, result[0]);
          });
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
