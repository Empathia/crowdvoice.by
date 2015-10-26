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

// COMMENT IF YOU WANT LOGGER OUTPUT
logger.log = function () {}

var login = require(path.join(__dirname, 'login.js')),
  expect = require('chai').expect

CONFIG.database.logQueries = false

var urlBase = 'http://localhost:3000'


describe('PostsController', function () {

  describe('#create', function () {

    it('create post with no errors as non-admin', function (done) {
      login('jon', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .post(urlBase + '/jon-snow/white-walkers')
          .accept('application/json')
          .send({
            _csrf: csrf,
            posts: [
              {
                title: 'Archives - Blog - Greduan.com',
                description: 'A great website.',
                publishedAt: 'Thu Oct 15 2015 12:20:00 GMT-0500 (CDT)',
                image: '',
                imageWidth: '0',
                imageHeight: '0',
                sourceType: 'link',
                sourceService: 'link',
                sourceUrl: 'http://blog.greduan.com',
                imagePath: '',
              },
            ],
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            Post.find({ source_url: 'http://blog.greduan.com' }, function (err, post) {
              if (err) { return done(err) }

              expect(post.length).to.equal(1)
              expect(post[0].title).to.equal('Archives - Blog - Greduan.com')

              return done()
            })
          })
      })
    })

    it('create post with no errors in public voice as non-owner', function (done) {
      login('arya', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .post(urlBase + '/jon-snow/white-walkers')
          .accept('application/json')
          .send({
            _csrf: csrf,
            posts: [
              {
                title: 'Greduan.com',
                description: 'A great website.',
                publishedAt: 'Thu Oct 15 2015 12:20:00 GMT-0500 (CDT)',
                image: '',
                imageWidth: '0',
                imageHeight: '0',
                sourceType: 'link',
                sourceService: 'link',
                sourceUrl: 'http://greduan.com',
                imagePath: '',
              },
            ],
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            Post.find({ source_url: 'http://greduan.com' }, function (err, post) {
              if (err) { return done(err) }

              expect(post.length).to.equal(1)
              expect(post[0].title).to.equal('Greduan.com')

              return done()
            })
          })
      })
    })

  })

  describe('#preview', function () {

    it('From URL: Invalid YouTube URL should not crash server', function (done) {
      login('cersei', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .post(urlBase + '/cersei-lannister/dead-of-arryn/preview')
          .accept('application/json')
          .send({
            _csrf: csrf,
            url: 'https://www.youtube.com/watch?v=M4Txn4FtV4', // missing an "o" at end
          })
          .end(function (err, res) {
            expect(res.status).to.equal(400)
            expect(res.body.status).to.equal('There was an error in the request')

            return done()
          })
      })
    })

  })

})
