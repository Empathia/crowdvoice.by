var K.Post = Class(K, 'Post')({
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
