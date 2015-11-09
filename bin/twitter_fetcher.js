#!/usr/bin/env node

global.Admin = {};

var domain = require('domain');

var d = domain.create();

var application = require('neonode-core');

CONFIG.database.logQueries = false;

var moment = require('moment');

var Scrapper = require(process.cwd() + '/lib/cvscrapper');

var LOCK_FILE = '/tmp/fetching_tweets';

process.on('SIGTERM', function() {
  logger.log('Twitter Fetcher Terminated');
  logger.log('Cleaning...');
  if (fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE);
  }
});

d.on('error', function(err) {
  logger.error('Twitter Fetcher Error');
  logger.error(err);
  logger.error(err.stack);
  if (fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE);
  }
});

var cronExpression = '0 0 * * * *';

if (CONFIG.environment === 'develpment') {
  cronExpression = '* * * * * *';
}

d.run(function() {

  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: CONFIG.twitter.consumer_key,
    consumer_secret: CONFIG.twitter.consumer_secret,
    access_token_key: CONFIG.twitter.access_token,
    access_token_secret: CONFIG.twitter.access_token_secret
  });


  var CronJob = require('cron').CronJob;
  var job = new CronJob({
    cronTime: cronExpression,
    onTick: function() {
      var fetching = false;

      if (fs.existsSync(LOCK_FILE)) {
        fetching = true;
      }

      if (fetching) {
        logger.log('Fetcher is already running');
        return false;
      }

      fs.closeSync(fs.openSync(LOCK_FILE, 'w'));

      Voice.find(["twitter_search IS NOT null AND (tweet_last_fetch_at IS null OR tweet_last_fetch_at <  '"  + moment(new Date(Date.now() - (3600 * 6)).toISOString()).format() +  "')", []], function(err, voices) {

        async.eachLimit(voices, 1, function(voice, next) {

          logger.log("\n\n");
          logger.log(new Date(Date.now()));
          logger.log("Last: "+ voice.tweetLastFetchAt + "in Voice " + voice.id);
          logger.log("Search term: " +  voice.twitterSearch);

          client.get('search/tweets', {q: voice.twitterSearch + ' exclude:retweets exclude:replies', result_type: 'recent', count : 100}, function(err, tweets, response) {
            if (err) {
              logger.log(err)
              return next(err)
            }

            logger.log("Processing " + tweets.statuses.length + " results.");


            async.eachLimit(tweets.statuses, 1, function(tweet, nextTweet) {

              logger.log("Tweet date: " +  tweet.created_at)
              // logger.log("Tweet: " +  tweet.text);



              async.eachLimit(tweet.entities.urls, 1, function(url, nextUrl) {
                request(url, function(err, res, body) {
                  if (err) {
                    logger.error(err);
                    return nextUrl();
                  }

                  var longURL = res.request.uri.href;

                  logger.log('Will process ' + longURL);

                  Post.find(['source_url = ?', [longURL]], function(err, posts) {
                    if (err) {
                      logger.error(err);

                      return nextUrl();
                    }

                    if (posts.length > 0) {
                      logger.log('URL exists');
                      return nextUrl();
                    }

                    Scrapper.processUrl(longURL, res, function(err, result) {
                      if (err) {
                        logger.log('Scrapper Error');
                        logger.error(err.stack);
                        return nextUrl();
                      }

                      var data = {
                        sourceUrl : result.sourceUrl,
                        sourceType : result.sourceType,
                        sourceService : result.sourceService,
                        title : result.title.substr(0, 65),
                        description : result.description.substr(0, 180),
                        voiceId : voice.id,
                        ownerId : voice.ownerId,
                        approved : false
                      }

                      var post = new Post(data);

                      post.save(function(err, postResult) {
                        if (err) {
                          logger.error(err);
                          logger.error(err.stack);
                          return nextUrl();
                        }

                        if (result.images.length > 0) {

                          logger.log(result.images[0].path);

                          var imagePath = process.cwd() + '/public' + result.images[0].path;

                          post.uploadImage('image', imagePath, function(err) {
                            if (err) {
                              logger.error(err);
                              logger.error(err.stack);
                            }

                            post.save(function(err, result) {
                              return nextUrl();
                            });
                          });
                        } else {
                          return nextUrl();
                        };
                      });
                    });
                  });
                });

              }, function(err) {
                if (err) {
                  return nextTweet(err);
                }

                var tweetInstance = new Tweet({
                  idStr : tweet.id_str,
                  voiceId : voice.id,
                  text : tweet.text
                });

                tweetInstance.save(function(err, result) {
                  logger.log('Saved ' + tweetInstance.idStr);
                  nextTweet(err);
                });
              });
            }, function(err) {
              if (err) {
                logger.error(err);
                console.log(err.stack)
              }

              var voiceInstance = new Voice(voice);

              voiceInstance.tweetLastFetchAt = new Date(Date.now());

              voiceInstance.save(function(err, result) {
                logger.log('Updated Voice.tweetLastFetchAt');
                next();
              });
            });
          });
        }, function(err) {
          if (err) {
            logger.error(err);
            console.log(err.stack)
          }

          fs.unlinkSync(LOCK_FILE);

          process.exit(0);
        });
      });
    },
    start: true,
    timeZone: 'UTC'
  });

  job.start();
});
