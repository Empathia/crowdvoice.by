#!/usr/bin/env node

var application = require('neonode-core');

var io = require('socket.io')(application.server)
var posts = require('../public/demo-data/posts')
var monthData = []

// 12 posts * n
for (var i = 0; i < 10; i++) {
    monthData = monthData.concat(posts);
}

application._serverStart();

io.on('connection', function(socket) {
    console.log('socket connected')

    socket.on('getMonth', function(dateString, up) {
        socket.emit('monthData', monthData, dateString, up);
    })
});
