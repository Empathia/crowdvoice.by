K.RelatedVoice = Class(K, 'RelatedVoice').inherits(Krypton.Model)({
  tableName: 'RelatedVoices',

  attributes: [
    'id',
    'voiceId',
    'relatedId',
    'createdAt',
    'updatedAt'
  ]
})

module.exports = new K.RelatedVoice()
