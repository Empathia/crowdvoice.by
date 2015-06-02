#!/usr/bin/env node

var application = require('neonode-core');

var LOCK_FILE = '/tmp/fetching_tweets';

var Twitter = require('twitter');

var unshortener = require('unshortener');

var client = new Twitter({
  consumer_key: CONFIG.twitter.consumer_key,
  consumer_secret: CONFIG.twitter.consumer_secret,
  access_token_key: CONFIG.twitter.access_token,
  access_token_secret: CONFIG.twitter.access_token_secret
});

var fetching = false;

if (fs.existsSync(LOCK_FILE)) {
  fetching = true;
}

if (fetching) {
  logger.log('Fetcher is already running');
  return false;
}

fs.closeSync(fs.openSync(LOCK_FILE, 'w'));

Voice.find(["twitter_search IS NOT null AND (tweet_last_fetch_at IS null OR tweet_last_fetch_at < DATE '"  + (new Date(Date.now() - (3600 * 6))).toISOString() +  "')", []], function(err, voices) {

  async.each(voices, function(voice, next) {

    logger.log("\n\n");
    logger.log(new Date(Date.now()));
    logger.log("Last: "+ voice.tweet_last_fetch_at + "in Voice " + voice.id);
    logger.log("Search term: " +  voice.twitter_search);

    client.get('search/tweets', {q: voice.twitterSearch + ' exclude:retweets exclude:replies', result_type: 'recent', count : 100}, function(err, tweets, response) {
      if (err) {
        logger.log(err)
        return next(err)
      }

      logger.log("Processing " + tweets.statuses.length + " results.");


      async.each(tweets.statuses, function(tweet, nextTweet) {

        logger.log("Tweet date: " +  tweet.created_at)
        logger.log("Tweet: " +  tweet.text);



        async.each(tweet.entities.urls, function(url, nextUrl) {
          unshortener.expand(url.url, function(err, unshortered) {
            if (err) {
              logger.error(err)
              logger.error(url.url)
              return nextUrl(err);
            }

            console.log('TODO: Save the link!')
            console.log(unshortered.href)
            nextUrl()
          })
        }, function(err) {
          if (err) {
            logger.error(err);
            return nextTweet(err);
          }

          tweet = new Tweet({
            idStr : tweet.id_str,
            voiceId : voice.id,
            text : tweet.text
          });

          tweet.save(function(err, result) {
            logger.log('Saved ' + tweet.idStr);
            nextTweet(err);
          });

        });
      }, function(err) {
        if (err) {
          logger.error(err);
        }

        voice = new Voice(voice);

        voice.tweetLastFetchAt = new Date(Date.now());

        voice.save(function(err, result) {
          logger.log('Updated Voice.tweetLastFetchAt');
          next();
        })
      });
    });
  }, function(err) {
    if (err) {
      logger.error(err)
    }

    fs.unlinkSync(LOCK_FILE);

    process.exit(0);
  })
})


