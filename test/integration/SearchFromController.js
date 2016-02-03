'use strict'

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
  expect = require('chai').expect,
  request = require('superagent')

CONFIG.database.logQueries = false

var urlBase = 'http://localhost:3000'

describe('SearchFromController', function () {

  describe('#youtube', function () {

    it('Should not crash on anonymous voices when search term has a space', function (doneTest) {
      request
        .get(urlBase + '/anonymous_' + hashids.encode(2) + '/second-trial-by-combat/youtube/' + encodeURIComponent('pokemon rocks'))
        .accept('application/json')
        .end(function (err, res) {
          if (err) { return doneTest(err) }

          expect(res.status).to.equal(200)

          return doneTest()
        })
    })

  })

})
