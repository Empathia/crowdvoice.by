K.VoiceCollaborator = Class(K, 'VoiceCollaborator').inherits(Krypton.Model)({
  tableName: 'VoiceCollaborator',

  attributes: [
    'id',
    'voiceId',
    'contributorId',
    'isAnonymous',
    'createdAt',
    'updatedAt'
  ],

  validations: {
    voiceId: ['required'],
    collaboratorId: ['required']
  },

  prototype: {
    isAnonymous: false
  }
})

module.exports = new K.VoiceCollaborator()
