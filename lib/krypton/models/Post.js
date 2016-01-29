K.Post = Class(K, 'Post').inherits(Krypton.Model)({
  tableName: 'Posts',

  attributes: [
    'id',
    'title',
    'description',
    'ownerId',
    'voiceId',
    'approved',
    'imageBaseUrl',
    'imageMeta',
    'sourceService',
    'sourceType',
    'sourceUrl',
    'publishedAt',
    'createdAt',
    'updatedAt',
    'sourceDomain',
    'faviconPath'
  ]
})

module.exports = new K.Post()
