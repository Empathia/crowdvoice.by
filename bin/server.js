#!/usr/bin/env node

var application = require('neonode-core');

var io = require('socket.io')(application.server)
var posts = require('../public/demo-data/posts')

application._serverStart();

require('./../presenters/PostsPresenter');

io.on('connection', function(socket) {
  logger.log('socket connected')

  socket.on('getMonth', function(dateString, up) {
    var dateData = dateString.split('-');
    Post.find(['"Posts".voice_id = ? AND EXTRACT(MONTH FROM "Posts".published_at) = ? AND EXTRACT(YEAR FROM "Posts".published_at) = ? ORDER BY "Posts".published_at DESC', [1, dateData[1], dateData[0]]], function(err, posts) {
      PostsPresenter.build(posts, function(err, result) {
        if (err) {
          return socket.emit('monthData', {'error': err}, dateString, up);
        }

        socket.emit('monthData', results, dateString, up);
      })
    });
  })
});
