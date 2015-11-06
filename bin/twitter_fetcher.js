#!/usr/bin/env node

global.Admin = {};

var domain = require('domain');

var d = domain.create();

var application = require('neonode-core');
require('./../lib/TwitterFetcher');

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

d.run(function() {

  var CronJob = require('cron').CronJob;
  var job = new CronJob({
    cronTime: '* * * * *',
    onTick: function() {
      console.log('fetch...')
      var fetching = false;

      if (fs.existsSync(LOCK_FILE)) {
        fetching = true;
      }

      if (fetching) {
        logger.log('Fetcher is already running');
        return false;
      }

      fs.closeSync(fs.openSync(LOCK_FILE, 'w'));

      Voice.find(["twitter_search IS NOT null AND (tweet_last_fetch_at IS null OR tweet_last_fetch_at <  '"  + moment().subtract(1, 'hour').format() +  "')", []], function(err, voices) {
        async.eachLimit(voices, 1, function(voice, next) {

          var twitterFetcher = new TwitterFetcher({
            voice : voice,
            count : 100
          });

          async.series([function(done) {
            twitterFetcher.fetchTweets(done);
          }, function(done) {
            twitterFetcher.createPosts(done);
          }, function(done) {
            var voiceInstance = new Voice(voice);
            voiceInstance.tweetLastFetchAt = new Date(Date.now());

            voiceInstance.save(function(err, result) {
              logger.log('Updated Voice.tweetLastFetchAt');
              done();
            });
          }], function(err) {
            next(err);
          });
        }, function(err) {
          if (err) {
            logger.error(err);
            console.log(err.stack);
          }

          fs.unlinkSync(LOCK_FILE);
        });
      });
    },
    start: true,
    timeZone: 'UTC'
  });

  job.start();
});
