var K.VoiceCollaborator = Class(K, 'VoiceCollaborator')({
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
