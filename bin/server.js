#!/usr/bin/env node

// Admin namespace for Admin Controllers
global.Admin = {};

var application = require('neonode-core');

// Load socket.io
var io = require('socket.io')(application.server);

// Load moment
global.moment = require('moment');

global.FeedInjector = require(__dirname + '/../lib/FeedInjector.js');

// Load routes
require('./../lib/routes.js');

require('./../lib/TwitterFetcher');

application._serverStart();

require('./../presenters/PostsPresenter');

io.use(function(socket, next) {
  sessionMiddleWare(socket.request, socket.request.res, next);
});

io.on('connection', require(path.join(process.cwd(), 'lib/socket.js')));


io.on('connection', function(socket) {
  var notificationHandler = function(data) {
    var notification = data.data.model;

    var followerId = notification.followerId;

    var currentPerson = new Entity(socket.request.session.currentPerson);

    if (notification.forFeed === true) {
      return;
    }

    async.series([function(done) {
      if (!socket.request.session.isAnonymous) {
        return done();
      }

      currentPerson.owner(function(err, result) {
        if (err) {
          return done(err);
        }

        currentPerson = new Entity(result);

        done();
      });
    }, function(done) {
      if (hashids.decode(currentPerson.id)[0] !== followerId) {
        return done();
      }

      Entity.find({id : hashids.decode(currentPerson.id)[0] }, function(err, res) {
        if (err) {
          return done(err);
        }

        currentPerson = new Entity(res[0]);
        currentPerson.lastNotificationDate = new Date(notification.createdAt);

        currentPerson.save(function(err, res) {
          if (err) {
            return done(err);
          }

          done();
        })
      });
    }], function(err) {
      if (err) {
        logger.error(err);
      }

      if (currentPerson.id !== followerId) {
        return;
      }

      NotificationsPresenter.build([notification], currentPerson, function(err, notifications) {
        if (err) {
          logger.error(err);
        }

        socket.emit('newNotifications', notifications);
      });
    })
  }

  Notification.bind('afterSave', notificationHandler);

  socket.on('disconnect', function() {
    Notification.unbind('afterSave', notificationHandler);
  });
});

// MONKEY PATCH
// This is in order to fix the issue where if you provide an updatedAt property
// the updatedAt property will be set to what you provided, thus causing
// problems.
Argon.Storage.Knex.prototype.update = function update(requestObj, callback) {
  var storage = this;

  callback = callback || function defaultPutCallBack() {
    throw new Error('callback is undefined');
  };

  if ((typeof requestObj) === 'undefined' || requestObj === null) {
    return callback('requestObj is undefined');
  }

  if (requestObj.data) {
    for (i = 0; i < storage.preprocessors.length; i++) {
      requestObj.data = storage.preprocessors[i](requestObj.data, requestObj);
    }
  }

  var date = new Date(Date.now());

  this.updatedAt = date;
  requestObj.data.updated_at = date;

  this.queries.update(requestObj, function(err, data) {
    for (i = 0; i < storage.processors.length; i++) {
      data = storage.processors[i](data, requestObj);
    }

    return callback(err, data);
  });
};
