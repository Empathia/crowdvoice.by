#!/usr/bin/env node

var application = require('neonode-core');

// Argon Monkey patches
require(__dirname + '/../lib/ArgonPatches');

// Load socket.io
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

io.on('connection', require(path.join(process.cwd(), 'lib/socket.js')));
