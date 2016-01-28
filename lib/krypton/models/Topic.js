var K.Topic = Class(K, 'Topic')({
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
