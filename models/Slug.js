var Slug = Class('Slug').inherits(Argon.KnexModel)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'Slugs'
  })),
  
  prototype : {

  }
});

module.exports = Slug;
