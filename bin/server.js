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
    console.log('socket connected');

    socket.on('getMonthPosts', function(voiceId, dateString, up) {
        socket.emit('monthPosts', monthData, dateString, up);
    });
});
