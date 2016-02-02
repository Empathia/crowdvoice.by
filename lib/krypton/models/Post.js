K.Post = Class(K, 'Post').inherits(Krypton.Model)({
  tableName: 'Posts',

  attributes: [
    'id',
    'title',
    'description',
    'ownerId',
    'voiceId',
    'approved',
    'imageBaseUrl',
    'imageMeta',
    'sourceService',
    'sourceType',
    'sourceUrl',
    'publishedAt',
    'createdAt',
    'updatedAt',
    'sourceDomain',
    'faviconPath'
  ],

  prototype: {
    getSavesCount: function () {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Post doesn\'t have an ID.'))
        }

        K.SavedPost.query()
          .count('*')
          .where('post_id', '=', that.id)
          .then(function (count) {
            return res(+count[0].count)
          })
          .catch(rej)
      })
    },

    getVotesCount: function () {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Post doesn\'t have an ID.'))
        }

        K.Vote.query()
          .count('*')
          .where('post_id', '=', that.id)
          .then(function (count) {
            return res(+count[0].count)
          })
          .catch(rej)
      })
    },

    isVotedBy: function (entity) {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Post doesn\'t have an ID.'))
        }

        K.Vote.query()
          .where('post_id', '=', that.id)
          .andWhere('entity_id', '=', entity.id)
          .then(function (votes) {
            return res(votes > 0)
          })
          .catch(rej)
      })
    },

    isSavedBy: function (entity) {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Post doesn\'t have an ID.'))
        }

        K.SavedPost.query()
          .where('post_id', '=', that.id)
          .andWhere('entity_id', '=', entity.id)
          .then(function (saves) {
            return res(saves > 0)
          })
          .catch(rej)
      })
    }
  }
})

module.exports = new K.Post()
