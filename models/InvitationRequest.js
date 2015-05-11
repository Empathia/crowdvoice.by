var InvitationRequest = Class('InvitationRequest').inherits(Argon.KnexModel)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'InvitationRequest'
  })),
  
  prototype : {

  }
});

module.exports = InvitationRequest;
