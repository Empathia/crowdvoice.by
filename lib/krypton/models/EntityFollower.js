var K.EntityFollower = Class(K, 'EntityFollower')({
  tableName: 'EntityFollower',

  attributes: [
    'id',
    'followerId',
    'followedId',
    'createdAt',
    'updatedAt'
  ]
})
