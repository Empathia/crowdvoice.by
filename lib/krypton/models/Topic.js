K.Topic = Class(K, 'Topic').inherits(Krypton.Model)({
  tableName: 'Topics',

  attributes: [
    'id',
    'name',
    'slug',
    'imageBaseUrl',
    'imageMeta',
    'createdAt',
    'updatedAt',
    'deleted'
  ]
})

module.exports = new K.Topic()
