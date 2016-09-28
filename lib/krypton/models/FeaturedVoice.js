K.FeaturedVoice = Class(K, 'FeaturedVoice').inherits(Krypton.Model)({
  tableName: 'FeaturedVoices',

  attributes: [
    'id',
    'voiceId',
    'position',
    'createdAt',
    'updatedAt',
  ],

  validations: {}
});

module.exports = K.FeaturedVoice;
