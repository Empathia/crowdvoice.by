exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('Voices').del(),
    knex('Slugs').del(),

    knex('Voices').insert({
      id: 1,
      title: 'Continued Effects of the Fukushima Disaster',
      description : 'On March 11, 2011, a tsunami and earthquake damaged the Fukushima Daiichi power plant in Fukushima, Japan. Subsequent equipment failures led to the release of nuclear material into the surrounding ground and ocean. It is regarded as the biggest nuclear disaster since Chernobyl. Initially, studies conducted by TEPCO, the company operating the plant, concluded that the risks',
      'owner_id' : 1,
      'status' : 'STATUS_PUBLISHED',
      'type' : 'TYPE_PUBLIC',
      latitude : '4.815',
      longitude : '162.342',
      'location_name' : 'Jin Jang Island',
      'twitter_search' : 'gaza',
      'tweet_last_fetch_at' : null,
      'rss_url' : null,
      'rss_last_fetch_at' : null,
      'post_count' : 7200,
      'first_post_date' : new Date('2012-05-01'),
      'last_post_date' : new Date('2015-04-28'),
      'created_at' : new Date('2015-03-30T13:59:47Z'),
      'updated_at' : new Date('2015-03-30T13:59:47Z')
    }),

    knex('Slugs').insert({
      id : 1,
      'voice_id' : 1,
      'url' : 'fukushima-disaster',
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),


    knex('Voices').insert({
      id: 2,
      title: 'Ferguson Unrest',
      description : 'An ongoing series of protests and civil disorder began the day after the fatal shooting of Michael Brown on August 9, 2014, in Ferguson, Missouri. The unrest sparked a vigorous debate',
      'owner_id' : 1,
      'status' : 'STATUS_PUBLISHED',
      'type' : 'TYPE_PUBLIC',
      latitude : '4.815',
      longitude : '162.342',
      'location_name' : 'Jin Jang Island',
      'twitter_search' : 'gaza',
      'tweet_last_fetch_at' : null,
      'rss_url' : null,
      'rss_last_fetch_at' : null,
      'post_count' : 7200,
      'first_post_date' : new Date('2012-05-01'),
      'last_post_date' : new Date('2015-04-28'),
      'created_at' : new Date('2015-04-23T13:59:47Z'),
      'updated_at' : new Date('2015-04-23T13:59:47Z')
    }),

    knex('Slugs').insert({
      id : 2,
      'voice_id' : 2,
      'url' : 'ferguson-unrest',
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),


    knex('Voices').insert({
      id: 3,
      title: 'Civil War in Syria',
      description : 'With thousands of schools destroyed in the conflict, and families being displaced from their homes and communities, maintaining any meaningful form of structured education',
      'owner_id' : 1,
      'status' : 'STATUS_PUBLISHED',
      'type' : 'TYPE_PUBLIC',
      latitude : '4.815',
      longitude : '162.342',
      'location_name' : 'Jin Jang Island',
      'twitter_search' : 'gaza',
      'tweet_last_fetch_at' : null,
      'rss_url' : null,
      'rss_last_fetch_at' : null,
      'post_count' : 7200,
      'first_post_date' : new Date('2012-05-01'),
      'last_post_date' : new Date('2015-04-28'),
      'created_at' : new Date('2015-04-23T13:59:47Z'),
      'updated_at' : new Date('2015-04-23T13:59:47Z')
    }),

    knex('Slugs').insert({
      id : 3,
      'voice_id' : 3,
      'url' : 'civil-war-syria',
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),


    knex('Voices').insert({
      id: 4,
      title: 'U.S Presidential Elections 2016',
      description : 'The United States presidential election of 2016 will be the 58th quadrennial U.S. presidential election and is scheduled for Tuesday, November 8, 2016. Voters in the election will',
      'owner_id' : 1,
      'status' : 'STATUS_PUBLISHED',
      'type' : 'TYPE_PUBLIC',
      latitude : '4.815',
      longitude : '162.342',
      'location_name' : 'Jin Jang Island',
      'twitter_search' : 'gaza',
      'tweet_last_fetch_at' : null,
      'rss_url' : null,
      'rss_last_fetch_at' : null,
      'post_count' : 7200,
      'first_post_date' : new Date('2012-05-01'),
      'last_post_date' : new Date('2015-04-28'),
      'created_at' : new Date('2015-04-23T13:59:47Z'),
      'updated_at' : new Date('2015-04-23T13:59:47Z')
    }),

    knex('Slugs').insert({
      id : 4,
      'voice_id' : 4,
      'url' : 'presidential-elections-2016',
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    knex('Voices').insert({
      id: 5,
      title: 'Unemployment in Detroit',
      description : 'The latest extension is the fourth since the recession began, which means some unemployed workers in the state could qualify for up to 99 weeks of benefits',
      'owner_id' : 1,
      'status' : 'STATUS_PUBLISHED',
      'type' : 'TYPE_PUBLIC',
      latitude : '4.815',
      longitude : '162.342',
      'location_name' : 'Jin Jang Island',
      'twitter_search' : 'gaza',
      'tweet_last_fetch_at' : null,
      'rss_url' : null,
      'rss_last_fetch_at' : null,
      'post_count' : 7200,
      'first_post_date' : new Date('2012-05-01'),
      'last_post_date' : new Date('2015-04-28'),
      'created_at' : new Date('2015-04-23T13:59:47Z'),
      'updated_at' : new Date('2015-04-23T13:59:47Z')
    }),

    knex('Slugs').insert({
      id : 5,
      'voice_id' : 5,
      'url' : 'detroit-unemployment',
      'created_at' : new Date(),
      'updated_at' : new Date()
    })
  )
}
