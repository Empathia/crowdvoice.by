var K.EntityMembership = Class(K, 'EntityMembership')({
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
