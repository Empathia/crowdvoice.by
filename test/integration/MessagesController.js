'use strict'

global.Admin = {}

var application = require('neonode-core')
require(path.join(__dirname, '../../lib/routes.js'))

// Load moment
global.moment = require('moment')

global.FeedInjector = require(path.join(__dirname, '../../lib/FeedInjector.js'))
require(path.join(__dirname, '../../presenters/PostsPresenter'))

application._serverStart()

var request = require('superagent')
var test = require('tape-catch')

CONFIG.database.logQueries = false

var urlBase = 'http://localhost:3000'

test('Create new message ( .create() )', function (t) {
  var cookies,
    csrf,
    agent = request.agent()

  async.series([
    function (next) {
      agent
        .get(urlBase + '/csrf')
        .end(function (err, res) {
          if (err) { t.fail(err) }

          csrf = res.text

          return next()
        })
    },

    function (next) {
      agent
        .post(urlBase + '/session')
        .send({
          _csrf: csrf,
          username: 'tyrion',
          password: '12345678'
        })
        .end(function (err, res) {
          if (err) { t.fail(err) }

          return next()
        })
    },
  ], function(err) {
    if (err) { t.fail(err) }

    agent
      .post(urlBase + '/tyrion-lannister/messages/6xOVBlryjQ0a')
      .accept('application/json')
      .send({
        _csrf: csrf,
        message: 'So anyway, weird conversation huh?',
      })
      .end(function (err, res) {
        if (err) { t.fail(err) }

        t.equal(res.status, 200, 'res.status')

        t.end()
      })
  })
})
