var Topic = Class('Topic').inherits(Argon.KnexModel)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'Topics'
  })),
  
  prototype : {

  }
});

module.exports = Topic;
