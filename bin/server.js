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
