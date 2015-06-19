var VoiceCollaborator = Class('VoiceCollaborator').inherits(Argon.KnexModel)({

  validations : {
    voiceId : ['required'],
    collaboratorId : ['required']
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'VoiceCollaborator'
  })),

  prototype : {
    voiceId : null,
    collaboratorId : null,
    isAnonymous : false
  }
});

module.exports = VoiceCollaborator;
