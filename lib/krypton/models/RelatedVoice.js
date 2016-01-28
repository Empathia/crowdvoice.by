var K.RelatedVoice = Class(K, 'RelatedVoice')({
  tableName: 'RelatedVoices',

  attributes: [
    'id',
    'voiceId',
    'relatedId',
    'createdAt',
    'updatedAt'
  ]
})
