#!/usr/bin/env node

var application = require('neonode-core');

var io = require('socket.io')(application.server);
var posts = require('../public/demo-data/posts');
var monthData = [];

// 12 posts * n
for (var i = 0; i < 2; i++) {
    monthData = monthData.concat(posts);
}

application._serverStart();

io.on('connection', function(socket) {
  logger.log('socket connected');

  socket.on('getMonthPosts', function(voiceId, dateString, up) {
    var dateData = dateString.split('-');
    Post.find(['"Posts".voice_id = ? AND EXTRACT(MONTH FROM "Posts".published_at) = ? AND EXTRACT(YEAR FROM "Posts".published_at) = ? ORDER BY "Posts".published_at DESC', [voiceId, dateData[1], dateData[0]]], function(err, posts) {
      socket.emit('monthData', posts, dateString, up);
    });
  });
});
