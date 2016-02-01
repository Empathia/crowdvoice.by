K.Voice = Class(K, 'Voice').inherits(Krypton.Model)({
  tableName: 'Voices',

  attributes: [
    'id',
    'title',
    'description',
    'latitude',
    'longitude',
    'locationName',
    'ownerId',
    'status',
    'type',
    'twitterSearch',
    'tweetLastFetchAt',
    'rssUrl',
    'rssLastFetchAt',
    'createdAt',
    'updatedAt',
    'deleted'
  ],

  prototype: {
    getPostsCount: function () {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Entity doesn\'t have an ID.'))
        }

        K.Post.query()
          .count('*')
          .where('voice_id', '=', that.id)
          .then(function (count) {
            return res(+count[0].count)
          })
          .catch(rej)
      })
    }
  }
})

module.exports = new K.Voice()
