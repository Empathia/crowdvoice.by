var EntityMembership = Class('EntityMembership').inherits(Argon.KnexModel)({

  validations : {
    entityId : ['required'],
    memberId : ['required']
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'EntityMembership'
  })),

  prototype : {
    entityId : null,
    memberId : null,
    isAnonymous : false
  }
});

module.exports = EntityMembership;
