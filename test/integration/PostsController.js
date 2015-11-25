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

  describe('#update', function () {

    it('Should change updated_at of Voice when post is published', function (doneTest) {
        var oldUpdatedAt

        async.series([
          // Jon Snow create unapproved post
          function (nextSeries) {
            login('jon-snow', function (err, agent, csrf) {
              if (err) { console.log(err); return nextSeries(err) }

              agent
                .post(urlBase + '/cersei-lannister/walk-of-atonement')
                .accept('application/json')
                .send({
                  _csrf: csrf,
                  posts: [
                    {
                      title: 'Mirage A Smoke',
                      description: 'French Uncomfortable Jenny',
                      publishedAt: 'Thu Oct 15 2015 12:20:00 GMT-0500 (CDT)',
                      image: '',
                      imageWidth: '0',
                      imageHeight: '0',
                      sourceType: 'link',
                      sourceService: 'link',
                      sourceUrl: 'http://gfycat.com/FrenchUncomfortableJenny',
                      imagePath: '',
                    },
                  ],
                })
                .end(function (err, res) {
                  if (err) { return nextSeries(err) }

                  expect(res.status).to.equal(200)

                  return nextSeries()
                })
            })
          },

          // Record Voice date
          function (nextSeries) {
            Voice.findById(6, function (err, voice) {
              if (err) { return nextSeries(err) }

              oldUpdatedAt = new Date(voice[0].updatedAt)

              return nextSeries()
            })
          },

          // Cersei approve Jon's post
          function (nextSeries) {
            login('cersei-lannister', function (err, agent, csrf) {
              if (err) { return nextSeries(err) }

              agent
                .put(urlBase + '/cersei-lannister/walk-of-atonement/' + hashids.encode(1))
                .accept('application/json')
                .send({
                  _csrf: csrf,
                  title: 'CSGO Mirage Smoke T spawn to Connector Jungle - Gfycat',
                  description: 'new mirage smoke from t spawn to a site',
                  publishedAt: 'Thu Nov 19 2015 11:43:00 GMT-0600 (CST)',
                  image: null,
                  imageWidth: 0,
                  imageHeight: 0,
                  sourceType: 'link',
                  sourceService: 'link',
                  sourceUrl: 'http://gfycat.com/FrenchUncomfortableJenny',
                  imagePath: '/uploads/development/post_' + hashids.encode(1) + '/image_medium.jpeg',
                  approved: true,
                })
                .end(function (err, res) {
                  if (err) { return nextSeries(err) }

                  expect(res.status).to.equal(200)

                  return nextSeries()
                })
            })
          },
        ], function (err) {
          if (err) { return doneTest(err) }

          Voice.find(6, function (err, voice) {
            if (err) { return doneTest(err) }

            expect(oldUpdatedAt).to.not.eql(new Date(voice[0].updatedAt))

            return doneTest()
          })
        })
    })

  })

  describe('#saveArticle', function () {

    it('Should create post with no errors', function (doneTest) {
      login('jon-snow', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        agent
          .post(urlBase + '/jon-snow/white-walkers/saveArticle')
          .accept('application/json')
          .send({
            _csrf: csrf,
            title: 'Test article being saved.',
            content: 'THIS IS THE VERY INSIGHTFUL CONTENT OF THIS POST ABOUT THE WHITE WALKERS.',
            publishedAt: new Date(),
          })
          .end(function (err, res) {
            if (err) { return doneTest(err) }

            expect(res.status).to.equal(200)

            Post.find({
              title: 'Test article being saved.',
            }, function (err, post) {
              if (err) { return doneTest(err) }

              expect(post[0].title).to.equal('Test article being saved.')
              expect(post[0].sourceType).to.equal(Post.SOURCE_TYPE_TEXT)

              return doneTest()
            })
          })
      })
    })

    it('Should insta-publish article if Voice owner', function (doneTest) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        agent
          .post(urlBase + '/cersei-lannister/walk-of-atonement/saveArticle')
          .accept('application/json')
          .send({
            _csrf: csrf,
            title: 'Insta-publish because owner test',
            content: 'THIS IS THE VERY INSIGHTFUL CONTENT OF THIS POST ABOUT THE WALK OF ATONEMENT.',
            publishedAt: new Date(),
          })
          .end(function (err, res) {
            if (err) { return doneTest(err) }

            expect(res.status).to.equal(200)

            Post.find({
              title: 'Insta-publish because owner test',
            }, function (err, post) {
              if (err) { return doneTest(err) }

              expect(post[0].approved).to.equal(true)

              return doneTest()
            })
          })
      })
    })

  })

  describe('#create', function () {

    it('Should create post with no errors as non-admin', function (done) {
      login('jon-snow', function (err, agent, csrf) {
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

    it('Should create post with no errors in public voice as non-owner', function (done) {
      login('arya-stark', function (err, agent, csrf) {
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
      login('cersei-lannister', function (err, agent, csrf) {
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

            ScrapperError.find({
              url: 'https://www.youtube.com/watch?v=M4Txn4FtV4',
            }, function (err, result) {
              if (err) { return done(err) }

              expect(result.length).to.equal(1)

              return done()
            })
          })
      })
    })

    it('Should log scrappers\' errors', function (doneTest) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        agent
          .post(urlBase + '/cersei-lannister/dead-of-arryn/preview')
          .accept('application/json')
          .send({
            _csrf: csrf,
            url: 'htt://blog.greduan.com', // missing a "p" at http
          })
          .end(function (err, res) {
            expect(res.status).to.equal(400)
            expect(res.body.status).to.equal('Bad URL')

            ScrapperError.find({
              url: 'htt://blog.greduan.com',
            }, function (err, result) {
              if (err) { return doneTest(err) }

              expect(result.length).to.equal(1)

              return doneTest()
            })
          })
      })
    })

  })

})
