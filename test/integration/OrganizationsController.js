'use strict'

global.Admin = {}

var application = require('neonode-core')
require(path.join(__dirname, '../../lib/routes.js'))

// Load moment
global.moment = require('moment')

global.FeedInjector = require(path.join(__dirname, '../../lib/FeedInjector.js'))
require(path.join(__dirname, '../../presenters/PostsPresenter'))

application._serverStart()

// COMMENT IF YOU WANT LOGGER OUTPUT
logger.log = function () {}

var login = require(path.join(__dirname, 'login.js')),
  expect = require('chai').expect

CONFIG.database.logQueries = false

var urlBase = 'http://localhost:3000'

describe('VoicesController', function () {

  describe('#requestMembership', function () {

    it('Request membership with no errors', function (done) {
      login('jon', function (err, agent, csrf) {
        agent
          .post(urlBase + '/house-targaryen/requestMembership')
          .accept('application/json')
          .send({
            _csrf: csrf,
            orgId: hashids.encode(23), // House Targaryen
            message: 'I wanna join you so bad!'
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            return done()
          })
      })
    })

  })

  /*
  describe('#members', function () {

    it('Return all members (also anonymous members)', function (done) {
    })

  })
  */

})
