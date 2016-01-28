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
  ]
})

module.exports = new K.Voice()
