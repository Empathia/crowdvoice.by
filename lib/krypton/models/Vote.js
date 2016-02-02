K.Vote = Class(K, 'Vote').inherits(Krypton.Model)({
  tableName: 'Votes',

  attributes: [
    'id',
    'value',
    'postId',
    'entityId',
    'ip',
    'createdAt',
    'updatedAt'
  ]
})

module.exports = new K.Vote()
