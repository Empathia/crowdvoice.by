K.EntityMembership = Class(K, 'EntityMembership').inherits(Krypton.Model)({
  tableName: 'EntityMembership',

  attributes: [
    'id',
    'entityId',
    'memberId',
    'createdAt',
    'updatedAt',
    'isAnonymous'
  ]
})
