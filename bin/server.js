#!/usr/bin/env node

var application = require('neonode-core');

var io = require('socket.io')(application.server);

global.FeedInjector = require(__dirname + '/../lib/FeedInjector.js');

require(path.join(process.cwd(), 'lib', 'krypton', 'load-models.js'));

require(path.join(process.cwd(), 'lib', 'routes.js'));

require(path.join(process.cwd(), 'lib', 'TwitterFetcher.js'));

require(path.join(process.cwd(), 'presenters', 'PostsPresenter.js'));

application._serverStart();

io.use(function(socket, next) {
  sessionMiddleWare(socket.request, socket.request.res, next);
});

var socketFuncs = require(path.join(process.cwd(), 'lib/socket.js'));

io.on('connection', socketFuncs);

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
