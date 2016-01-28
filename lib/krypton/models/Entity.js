var K.Entity = Class(K, 'Entity')({
  tableName: 'Entities',

  attributes: [
    'type',
    'name',
    'lastname',
    'profileName',
    'isAnonymous',
    'isAdmin',
    'description',
    'location',
    'imageBaseUrl',
    'imageMeta',
    'backgroundBaseUrl',
    'backgroundMeta',
    'createdAt',
    'updatedAt',
    'deleted'
  ]
})
