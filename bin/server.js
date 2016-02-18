#!/usr/bin/env node

// Admin namespace for Admin Controllers
global.Admin = {};

var application = require('neonode-core');

// Argon Monkey patches
require(__dirname + '/../lib/ArgonPatches');

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
