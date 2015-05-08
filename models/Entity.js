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
        db('EntityFollower').insert({
          follower_id: this.id,
        followed_id: entity.id
        }).then(function (err, result) {
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

      /* Returns the follows made by the current entity
       * @method: follows
       */
      follows : function follows (done) {
        var query = db('Entities').
            select('Entities.*').
            rightJoin('EntityFollower', 'Entities.id', 'EntityFollower.followed_id').
            where('follower_id', '=', this.id);

        if (done) {
          query.then(done);
        } else {
          return query;
        }
      }
  }
});

module.exports = Entity;
