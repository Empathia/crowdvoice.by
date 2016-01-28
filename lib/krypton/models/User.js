var K.User = Class(K, 'User')({
  tableName: 'Users',

  attributes: [
    'id',
    'entityId',
    'email',
    'encryptedPassword',
    'token',
    'deleted',
    'createdAt',
    'updatedAt'
  ]
})
