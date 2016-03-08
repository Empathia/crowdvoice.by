#!/usr/bin/env node

var Promise = require('bluebird');

var domain = require('domain');

var d = domain.create();

var path = require('path');

var application = require(path.join(process.cwd(), 'lib', 'neonode-core'));
require('./../lib/TwitterFetcher');

require(path.join(process.cwd(), 'lib', 'krypton', 'load-models.js'));

var moment = require('moment');

var Scrapper = require(process.cwd() + '/lib/cvscrapper');

process.on('SIGTERM', function() {
  logger.info('Twitter Fetcher Terminated');
  logger.info('Cleaning...');
  process.exit();
});

process.on('SIGINT', function() {
  logger.info('Twitter Fetcher Terminated');
  logger.info('Cleaning...');
  process.exit();
});

d.on('error', function(err) {
  logger.error('Twitter Fetcher Error');
  logger.error(err);
  logger.error(err.stack);
});

CONFIG.database.debug = true;

d.run(function() {

  var later = require('later');

  var schedule = later.parse.recur().on(0, 6, 12, 18).hour();

  if (CONFIG.environment === 'development') {
     schedule = later.parse.recur().every(1).second();
  }

  var tick = function() {
    logger.info('tick')
    var items = [];
    // item = {
    //   entity : {},
    //   twitterCredentials : {
    //     accessToken : '',
    //     accessTokenSecret : ''
    //   },
    //   voices : []
    // }

    K.User.query().where({
        deleted : false
      }).include('entity.[organizations]')
      .then(function(users) {
        users.forEach(function(user) {
          var item = {
            twitterCredentials : null
          };

          item.entity = user.entity;

          if (user.twitterCredentials) {
            item.twitterCredentials = user.twitterCredentials;
          }

          items.push(item);
        });

        return Promise.resolve();
      })
      .then(function() {
        return new Promise(function(res, rej) {
          async.each(items, function(item, done) {
            var ids = item.entity.organizations.map(function(org) {
              return org.id;
            });

            ids.push(item.entity.id);

            var query = K.Voice.query()
              .whereIn('owner_id', ids)
              .andWhere('Voices.status', '=', Voice.STATUS_PUBLISHED)
              .andWhere('twitter_search', 'IS NOT', null)
              .andWhere(function() {
                this.where('tweet_last_fetch_at', 'IS', null);

                if (CONFIG.environment === 'development') {
                  this.orWhere('tweet_last_fetch_at', '<', moment().subtract(1, 'second').format());
                } else {
                  this.orWhere('tweet_last_fetch_at', '<', moment().subtract(6, 'hour').format());
                }
              });

              query.then(function(voices) {
                item.voices = voices;
                done();
              }).catch(done);

          }, function(err) {
            if (err) {
              logger.error(err);
              return rej(err);
            }

            return res(items);
          });
        });
      })
      .then(function(items) {

        async.eachLimit(items, 1, function(item, nextItem) {
          async.eachLimit(item.voices, 1, function(voice, nextVoice) {
            logger.info('Ready to fetch tweets from voice ' + voice.title + '...');
            logger.info('Using Users credentias? ' + item.twitterCredentials ? true : false);

            var twitterFetcher = new TwitterFetcher({
              voice : voice,
              count : 100,
              credentials : item.twitterCredentials
            });

            async.series([function(done) {
              twitterFetcher.fetchTweets(done);
            }, function(done) {
              twitterFetcher.createPosts(function(err, result) {
                if (err) {
                  return done(err);
                }

                result.forEach(function(item) {
                  item.title = item.title.substr(0, 64);
                  item.description = item.description.substr(0, 179);

                  if (item.images.length > 0) {
                    item.imagePath = item.images[0].path;
                  }

                });

                PostsController.prototype.createPosts(result, false, voice.ownerId, voice.id, function(err, result) {
                  if (err) {
                    return done(err);
                  }

                  done();
                });
              });
            }, function(done) {
              voice.tweetLastFetchAt = new Date(Date.now());
              return voice.save().then(function() {
                logger.info('Updated Voice.tweetLastFetchAt');
                done();
              }).catch(done);

            }], nextVoice);
          }, nextItem);
        }, function(err) {
          if (err) {
            logger.error(err);
            logger.error(err.stack)
          }

          logger.info('end')
        });
      });
  }


  var interval;
  logger.info('s', later.schedule(schedule).next(10))

  if (CONFIG.environment === 'development') {
    interval = later.setTimeout(tick, schedule);
  } else {
    interval = later.setInterval(tick, schedule);
  }

  logger.info('i', interval)





});
