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

  }
});

module.exports = Entity;
