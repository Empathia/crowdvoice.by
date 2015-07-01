#!/usr/bin/env node

var application = require('neonode-core');

// Load socket.io
var io = require('socket.io')(application.server);

// Load moment
global.moment = require('moment');

// Load routes
require('./../lib/routes.js');

application._serverStart();

require('./../presenters/PostsPresenter');

io.on('connection', function(socket) {
  logger.log('socket connected');

  socket.on('getMonthPosts', function(voiceId, dateString, up) {
    var dateData = dateString.split('-');

    logger.log(voiceId, dateString, up);

    Post.find(['"Posts".voice_id = ? AND EXTRACT(MONTH FROM "Posts".published_at) = ? AND EXTRACT(YEAR FROM "Posts".published_at) = ? AND approved = true ORDER BY "Posts".published_at DESC', [hashids.decode(voiceId)[0], dateData[1], dateData[0]]], function(err, posts) {
      logger.log(posts.length);

      PostsPresenter.build(posts, function(err, results) {
        if (err) {
          return socket.emit('monthPosts', {'error': err}, dateString, up);
        }

        socket.emit('monthPosts', results, dateString, up);
      });
    });
  });

  socket.on('getMonthPostsModerate', function(voiceId, dateString, up) {
    var dateData = dateString.split('-');

    logger.log(voiceId, dateString, up);

    Post.find(['"Posts".voice_id = ?  AND EXTRACT(MONTH FROM "Posts".published_at) = ?  AND EXTRACT(YEAR FROM "Posts".published_at) = ?  AND approved = false ORDER BY "Posts".published_at DESC', [hashids.decode(voiceId)[0], dateData[1], dateData[0]]], function(err, posts) {
      logger.log(posts.length);

      PostsPresenter.build(posts, function(err, results) {
        if (err) {
          return socket.emit('monthPostsModerate', {'error': err}, dateString, up);
        }

        socket.emit('monthPostsModerate', results, dateString, up);
      });
    });
  });

});
