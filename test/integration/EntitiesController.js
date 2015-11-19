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

describe('EntitiesController', function () {

  describe('#edit', function () {

    it('Should open edit page', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .get(urlBase + '/cersei-lannister/edit')
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            return done()
          })
      })
    })

    it('Should open edit page of organization you own', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .get(urlBase + '/house-lannister/edit')
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            return done()
          })
      })
    })

  })

  describe('#follow', function () {

    it('Should follow with no errors', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .post(urlBase + '/jon-snow/follow')
          .accept('application/json')
          .send({
            _csrf: csrf,
            followerId : hashids.encode(3) // Cersei
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)
            expect(res.body.status).to.equal('followed')

            return done()
          })
      })
    })

  })

})
