var Entity = Class('Entity').inherits(Argon.KnexModel)({

  validations : {
    type: [
      'required',
      {
        rule: function (val) {
          if (!val.match(/(person|organization)/)) {
            throw new Checkit.FieldError('* Entity type must be person|organization.')
          }
        },
        message: 'Entity type must be person|organization'
      }
    ],
    name: ['required', 'minLength:1', 'maxLength:512'],
    lastname: ['minLength:1', 'maxLength:512'],
    isAnonymous: ['boolean']
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'Entities'
  })),
  
  prototype : {
      /* Starts following an entity
       * @method: followEntity
       * @params:
       *  + entity
       *  + callback
       */
      followEntity : function followEntity (entity, done) {
        var entityFollower = new EntityFollower({
          followerId: this.id,
          followedId: entity.id
        });
        entityFollower.save(function (err, result) {
          done(err, result);
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
        var invite = new InvitationRequest({
          invitatorEntityId: this.id,
          invitedEntityId: entity.id
        });
        invite.save(function (err, result) {
          done(err, result);
        });
      }
  }
});

module.exports = Entity;
