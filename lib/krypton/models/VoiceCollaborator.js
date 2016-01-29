K.VoiceCollaborator = Class(K, 'VoiceCollaborator').inherits(Krypton.Model)({
  tableName: 'VoiceCollaborator',

  attributes: [
    'id',
    'voiceId',
    'contributorId',
    'isAnonymous',
    'createdAt',
    'updatedAt'
  ]
})

module.exports = new K.VoiceCollaborator()
