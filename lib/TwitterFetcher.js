var Twitter = require('twitter');
var Scrapper = require(process.cwd() + '/lib/cvscrapper');

var TwitterClient = new Twitter({
  'consumer_key' : CONFIG.twitter['consumer_key'],
  'consumer_secret' : CONFIG.twitter['consumer_secret'],
  'access_token_key' : CONFIG.twitter['access_token'],
  'access_token_secret' : CONFIG.twitter['access_token_secret']
});

var TwitterFetcher = Class('TwitterFetcher')({
  prototype : {
    voice : null,
    count : 0,
    tweets : [],
    client : null,

    init : function(config) {
      Object.keys(config || {}).forEach(function(propertyName) {
          this[propertyName] = config[propertyName];
      }, this);

      if (this.twitterCredentials) {
        var client = new Twitter({
          'consumer_key' : CONFIG.twitter['consumer_key'],
          'consumer_secret' : CONFIG.twitter['consumer_secret'],
          'access_token_key' : this.twitterCredentials.accessToken,
          'access_token_secret' : this.twitterCredentials.accessTokenSecret
        });

        this.client = client;
      } else {
        this.client = TwitterClient;
      }

      this.voice = new K.Voice(this.voice);

      return this;
    },

    fetchTweets : function(callback) {
      var fetcher = this;

      async.series([function(next) {
        logger.info('Fetching ' + fetcher.count + ' tweets');

        fetcher.client.get(
          'search/tweets',
          {
            q : fetcher.voice.twitterSearch + ' exclude:retweets exclude:replies',
            'result_type' : 'recent',
            'since_id' : fetcher.voice.lastTweetId,
            count : fetcher.count
          },
          function(err, tweets, response) {
            if (err) {
              return next(err);
            }

            logger.info('Fetched ' +  tweets.statuses.length + ' tweets...');
            fetcher.tweets = tweets.statuses || [];

            next();
          }
        );
      }, function(next) {
        if (fetcher.tweets.length === 0) {
          return next();
        }

        fetcher.voice.lastTweetId = fetcher.tweets[fetcher.tweets.length - 1].id_str;

        fetcher.voice.save().then(function() {
          next();
        }).catch(next);
      }], callback);

      return this;
    },

    createPosts : function(callback) {
      var fetcher = this;
      var posts = [];

      async.eachLimit(fetcher.tweets, 1, function(tweet, nextTweet) {
        logger.info('Processing tweet ' + tweet.id_str);

        var tweetPost = K.Post.buildFromTweet(tweet);
        tweetPost.images = [];

        posts.push(tweetPost);

        // Extract URLs from tweet;
        var hasUrls = false;

        if (tweet.entities && tweet.entities.urls && tweet.entities.urls.length > 0) {
          hasUrls = true;
        }

        var hasMedia = false;

        if (tweet.entities && tweet.entities.media && tweet.entities.media.length > 0) {
          hasMedia = true;
        }

        var controller = PostsController.prototype;

        async.series([function(done) {
          if (!hasUrls) {
            return done();
          }

          async.each(tweet.entities.urls, function(entity, doneEach) {
            controller._processURL(entity.url, function(err, result) {
              if (err) {
                logger.error('ProcessURL ERROR');
                logger.error(err);
              }

              if (result.status === 200) {
                posts.push(result.result);
              }

              return doneEach();
            });
          }, done);
        }, function(done) {
          if (!hasMedia) {
            return done();
          }

          async.each(tweet.entities.media, function(entity, doneEach) {
            controller._processURL(entity.media_url, function(err, result) {
              if (err) {
                logger.error('ProcessURL ERROR');
                logger.error(err);
              }

              if (result.status === 200) {
                posts.push(result.result);
              }

              return doneEach();
            });
          }, done);
        }], function(err) {
          if (err) {
            logger.error(err);
          }

          nextTweet();
        });
      }, function(err) {
        return callback(err, posts);
      });

      return this;
    }
  }
});
