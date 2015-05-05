var User = Class('User').inherits(Argon.KnexModel)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'Users'
  })),
  
  prototype : {

  }
});

module.exports = User;
