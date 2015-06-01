exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('Voices').del(),

    knex('Voices').insert({
      id: 1,
      title: 'Public Voice Title',
      description : 'Public Voice Description',
      latitude : '4.815',
      longitude : '162.342',
      'location_name' : 'Jin Jang Island',
      'owner_id' : 1,
      'status' : 'STATUS_PUBLISHED',
      'type' : 'TYPE_PUBLIC',
      'twitter_search' : 'gaza',
      'tweet_last_fetch_at' : null,
      'rss_url' : null,
      'rss_last_fetch_at' : null,
      'post_count' : 0,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    knex('Voices').insert({
      id: 2,
      title: 'Closed Voice Title',
      description : 'Closed Voice Description',
      latitude : '4.815',
      longitude : '162.342',
      'location_name' : 'Jin Jang Island',
      'owner_id' : 1,
      'status' : 'STATUS_PUBLISHED',
      'type' : 'TYPE_CLOSED',
      'twitter_search' : null,
      'tweet_last_fetch_at' : null,
      'rss_url' : null,
      'rss_last_fetch_at' : null,
      'post_count' : 0,
      'created_at' : new Date(),
      'updated_at' : new Date()
    })
  )
}
