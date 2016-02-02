K.SavedPost = Class(K, 'SavedPost').inherits(Krypton.Model)({
  tableName: 'SavedPosts',

  attributes: [
    'id',
    'entityId',
    'postId',
    'createdAt',
    'updatedAt'
  ]
})

module.exports = new K.SavedPost()
