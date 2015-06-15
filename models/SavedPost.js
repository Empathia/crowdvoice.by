var SavedPost = Class('SavedPost').inherits(Argon.KnexModel)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'SavedPosts'
  })),
  
  prototype : {

  }
});

module.exports = SavedPost;
