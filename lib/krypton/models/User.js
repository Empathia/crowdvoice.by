K.User = Class(K, 'User').inherits(Krypton.Model)({
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

module.exports = new K.User()
