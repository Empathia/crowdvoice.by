'use strict'

// SETUP NEONODE

global.Admin = {}

var application = require('neonode-core')
require(path.join(__dirname, '../../lib/routes.js'))

// Load moment
global.moment = require('moment')

global.FeedInjector = require(path.join(__dirname, '../../lib/FeedInjector.js'))
require(path.join(__dirname, '../../presenters/PostsPresenter'))

application._serverStart()

var request = require('superagent'),
  expect = require('chai').expect

CONFIG.database.logQueries = false

var urlBase = 'http://localhost:3000'

var login = function (username, callback) {
  var csrf,
    agent = request.agent()

  async.series([
    function (next) {
      agent
        .get(urlBase + '/csrf')
        .end(function (err, res) {
          if (err) { return callback(err) }

          csrf = res.text

          return next()
        })
    },

    function (next) {
      agent
        .post(urlBase + '/session')
        .send({
          _csrf: csrf,
          username: username,
          password: '12345678'
        })
        .end(function (err, res) {
          if (err) { return callback(err) }

          return next()
        })
    },
  ], function (err) {
    if (err) { return callback(err) }

    return callback(null, agent, csrf)
  })
}

// ACTUAL TESTS

describe('PostsController', function () {

  describe('#create', function () {
    it('create post with no errors as non-admin', function (done) {
      // LOGIN
      login('jon', function (err, agent, csrf) {
        if (err) { return done(err) }

        // CREATE POST
        agent
          .post(urlBase + '/jon-snow/white-walkers')
          .accept('application/json')
          .send({
            _csrf: csrf,
            posts: [
              {
                title: 'Archives - Blog - Greduan.com',
                description: '2015-04-30 » Experience upgrading OpenBSD to 5.72015-04-29 » Indentation and hooks in Emacs2015-04-19 » My switch to OpenBSD, first impressions2015-04-18 » December 2014 to April 2',
                publishedAt: 'Thu Oct 15 2015 12:20:00 GMT-0500 (CDT)',
                image: '',
                imageWidth: '0',
                imageHeight: '0',
                sourceType: 'link',
                sourceService: 'link',
                sourceUrl: 'http://blog.greduan.com/',
                imagePath: '',
              },
            ],
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            done()
          })
      })
    })
  })

})
