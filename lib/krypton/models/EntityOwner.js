K.EntityOwner = Class(K, 'EntityOwner').inherits(Krypton.Model)({
  tableName: 'EntityOwner',

  attributes: [
    'id',
    'owner_id',
    'owned_id',
    'createdAt',
    'updatedAt',
  ],

  validations: {}
})

module.exports = new K.EntityOwner()

