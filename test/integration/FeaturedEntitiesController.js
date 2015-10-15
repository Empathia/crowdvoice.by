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

test('Re-order featured people ( .updatePositions() )', function (t) {
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

    FeaturedPerson.all(function (err, featured) {
      if (err) { t.fail(err) }

      var hashedIds = featured.sort(function (a, b) {
        return a.position - b.position
      }).map(function (val) {
        return hashids.encode(val.entityId)
      })

      agent
        .post(urlBase + '/admin/featured/people/updatePositions')
        .accept('application/json')
        .send({
          _csrf: csrf,
          entityIds: hashedIds,
        })
        .end(function (err, res) {
          if (err) { t.fail(err) }

          t.equal(res.status, 200, 'res.status')
          t.equal(res.body.status, 'updated positions', 'res.body.status "updated positions"')

          t.end()
        })
    })
  })
})

test('Re-order featured organizations ( .updatePositions() )', function (t) {
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

    FeaturedOrganization.all(function (err, featured) {
      if (err) { t.fail(err) }

      var hashedIds = featured.sort(function (a, b) {
        return a.position - b.position
      }).map(function (val) {
        return hashids.encode(val.entityId)
      })

      agent
        .post(urlBase + '/admin/featured/organizations/updatePositions')
        .accept('application/json')
        .send({
          _csrf: csrf,
          entityIds: hashedIds,
        })
        .end(function (err, res) {
          if (err) { t.fail(err) }

          t.equal(res.status, 200, 'res.status')
          t.equal(res.body.status, 'updated positions', 'res.body.status "updated positions"')

          t.end()
        })
    })
  })
})

test('Create new featured organization ( .create() )', function (t) {
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
      .post(urlBase + '/admin/featured/organizations/new')
      .accept('application/json')
      .send({
        _csrf: csrf,
        entityId: 'AVolB9X1b3Ym', // House Baratheon
      })
      .end(function (err, res) {
        if (err) { console.log(err); t.fail(err) }

        t.equal(res.status, 200, 'res.status')

        FeaturedOrganization.find({ entity_id: 24 }, function (err, result) {
          if (err) { return t.fail(err) }

          t.equal(result.length, 1, 'one record in the DB')

          t.end()
        })
      })
  })
})
