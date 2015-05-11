var EntityFollower = Class('EntityFollower').inherits(Argon.KnexModel)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'EntityFollower'
  })),

  prototype : {

  }
});

module.exports = EntityFollower;
