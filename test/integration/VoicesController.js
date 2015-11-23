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

  describe('#follow', function () {

    it('Should follow voice', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .post(urlBase + '/jon-snow/white-walkers/follow')
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

  describe('#inviteToContribute', function () {

    it('Should invite to contribute', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .post(urlBase + '/cersei-lannister/walk-of-atonement/inviteToContribute')
          .accept('application/json')
          .send({
            _csrf: csrf,
            personId: hashids.encode(9), // Jon
            message: 'I know you want to',
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)
            expect(res.body.status).to.equal('invited')

            return done()
          })
      })
    })

    it('Should "refresh" invitation_voice message instead of duplicating', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        // send our invitations
        async.series([
          function (next) {
            agent
              .post(urlBase + '/cersei-lannister/walk-of-atonement/inviteToContribute')
              .accept('application/json')
              .send({
                _csrf: csrf,
                personId: hashids.encode(17), // Robert
                message: 'I think this is an offer you cannot turn down...',
              })
              .end(function (err, res) {
                if (err) { return done(err) }

                expect(res.status).to.equal(200)
                expect(res.body.status).to.equal('invited')

                return next()
              })
          },

          function (next) {
            agent
              .post(urlBase + '/cersei-lannister/walk-of-atonement/inviteToContribute')
              .accept('application/json')
              .send({
                _csrf: csrf,
                personId: hashids.encode(17), // Robert
                message: 'Just re-sending it, you know...',
              })
              .end(function (err, res) {
                if (err) { return done(err) }

                expect(res.status).to.equal(200)
                expect(res.body.status).to.equal('already invited')

                return next()
              })
          },

          function (next) {
            agent
              .post(urlBase + '/cersei-lannister/walk-of-atonement/inviteToContribute')
              .accept('application/json')
              .send({
                _csrf: csrf,
                personId: hashids.encode(17), // Robert
                message: 'The real final invitation',
              })
              .end(function (err, res) {
                if (err) { return done(err) }

                expect(res.status).to.equal(200)
                expect(res.body.status).to.equal('already invited')

                return next()
              })
          },
        ], function (err) { // async.series
          if (err) { return done(err) }

          // check that records check out

          async.series([
            // invitation requests
            function (next) {
              InvitationRequest.find({
                invited_entity_id: 17, // Robert
                invitator_entity_id: 3, // Cersei
              }, function (err, invitations) {
                if (err) { return next(err) }

                expect(invitations.length).to.equal(1)

                return next()
              })
            },

            // messages
            function (next) {
              Message.find({
                type: 'invitation_voice',
                sender_person_id: 3, // Cersei
                sender_entity_id: 3,
                receiver_entity_id: 17, // Robert
                voice_id: 6, // Walk of Atonement
              }, function (err, messages) {
                if (err) { return next(err) }

                expect(messages.length).to.equal(1)
                expect(messages[0].message).to.equal('The real final invitation')

                return next()
              })
            },
          ], done)
        })
      })
    })

  })

  describe('#requestToContribute', function () {

    it('Request to contribute', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .post(urlBase + '/cersei-lannister/walk-of-atonement/requestToContribute')
          .accept('application/json')
          .send({
            _csrf: csrf,
            message: 'I know you want to me to join',
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            return done()
          })
      })
    })

  })

  describe('#create', function () {

    it('Should return missing background image and not enough posts errors if status published', function (doneTest) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        agent
          .post(urlBase + '/voice')
          .accept('application/json')
          .send({
            _csrf: csrf,
            image: 'undefined',
            title: 'Casterly Cock',
            slug: 'casterly-cock',
            description: 'Cock as in the animal.',
            topics: 'd6wb1XVgRvzm',
            type: 'TYPE_PUBLIC',
            status: 'STATUS_PUBLISHED',
            locationName: 'The farm',
            latitude: '4.815',
            longitude: '162.342',
            anonymously: 'false',
            ownerId: hashids.encode(3),
          })
          .end(function (err, res) {
            expect(res.status).to.equal(403)

            expect(res.body.errors).to.eql(['Voice does not have a background image.', 'Voice does not have 15 posts.'])

            return doneTest()
          })
      })
    })

  })

  describe('#update', function () {

    it('Should update voice owned by organization you own', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .put(urlBase + '/house-lannister/casterly-rock')
          .accept('application/json')
          .send({
            _csrf: csrf,
            image: 'undefined',
            title: 'Casterly Rock',
            slug: 'casterly-rock',
            description: 'This is a new and completely unique description.',
            topics: 'd6wb1XVgRvzm',
            type: 'TYPE_PUBLIC',
            status: 'STATUS_DRAFT',
            locationName: 'Casterly Rock',
            latitude: '4.815',
            longitude: '162.342',
            anonymously: 'false',
            ownerId: hashids.encode(3),
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            Voice.findById(15, function (err, voice) {
              if (err) { done(err) }

              expect(voice[0].description).to.equal('This is a new and completely unique description.')

              return done();
            })
          })
      })
    })

    it('Should return missing background image and not enough posts errors if status published', function (doneTest) {
      login('tyrion-lannister', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        agent
          .put(urlBase + '/tyrion-lannister/valyrian-roads')
          .accept('application/json')
          .send({
            _csrf: csrf,
            image: 'undefined',
            title: 'Casterly Cock',
            slug: 'casterly-cock',
            description: 'Cock as in the animal.',
            topics: 'd6wb1XVgRvzm',
            type: 'TYPE_CLOSED',
            status: 'STATUS_PUBLISHED',
            locationName: 'The farm',
            latitude: '4.815',
            longitude: '162.342',
            anonymously: 'false',
            ownerId: hashids.encode(1),
          })
          .end(function (err, res) {
            expect(res.status).to.equal(403)

            expect(res.body.errors).to.eql(['Voice does not have 15 posts.'])

            return doneTest()
          })
      })
    })

  })

})
