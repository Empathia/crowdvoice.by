#!/usr/bin/env node

global.ForbiddenError = function ForbiddenError(message) {
  this.name = 'ForbiddenError';
  this.message = message || 'Not Authorized';
}

ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

var application = require('neonode-core');

// Load aws-sdk and S3
var AWS = require('aws-sdk');
global.amazonS3 = new AWS.S3(CONFIG.s3);

global.ACL = require('./../lib/ACL/ACL.js');
require('./../lib/ACL/visitor.js');
require('./../lib/ACL/anonymous.js');
require('./../lib/ACL/person.js');
require('./../lib/ACL/admin.js');

var io = require('socket.io')(application.server);
global.moment = require('moment');

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
});
