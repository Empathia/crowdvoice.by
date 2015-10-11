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

test('Follow a voice ( .follow() )', function (t) {
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
          username: 'cersei',
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
      .post(urlBase + '/jon-snow/white-walkers/follow')
      .accept('application/json')
      .send({
        _csrf: csrf,
        followerId : hashids.encode(3) // cersei's ID
      })
      .end(function (err, res) {
        if (err) { t.fail(err) }

        t.equal(res.status, 200, 'res.status')
        t.equal(res.body.status, 'followed', 'res.body.status followed')
        t.equal(res.body.status, 'unfollowed', 'res.body.status unfollowed')

        t.end()
      })
  })
})

test('Invite to contribute ( .inviteToContribute() )', function (t) {
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
          username: 'cersei',
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
      .post(urlBase + '/cersei-lannister/walk-of-atonement/inviteToContribute')
      .accept('application/json')
      .send({
        _csrf: csrf,
        personId: hashids.encode(9), // Jon's ID
        message: 'I know you want to',
      })
      .end(function (err, res) {
        if (err) { t.fail(err) }

        t.equal(res.status, 200, 'res.status')
        t.equal(res.body.status, 'invited', 'res.body.status invited')

        t.end()
      })
  })
})

test('Request to contribute ( .requestToContribute() )', function (t) {
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
          username: 'cersei',
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
      .post(urlBase + '/cersei-lannister/walk-of-atonement/requestToContribute')
      .accept('application/json')
      .send({
        _csrf: csrf,
        message: 'I know you want to me to join',
      })
      .end(function (err, res) {
        if (err) { t.fail(err) }

        t.equal(res.status, 200, 'res.status')

        t.end()
      })
  })
})
