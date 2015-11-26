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

    it('Follow voice', function (done) {
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

    it('Invite to contribute', function (done) {
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

    it('"Refresh" invitation_voice message instead of duplicating', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
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

  describe('#update', function () {

    it('Update voice owned by organization you own', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
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
            status: 'STATUS_PUBLISHED',
            locationName: 'Casterly Rock',
            latitude: '4.815',
            longitude: '162.342',
            anonymously: 'false',
            ownerId: 'dWK6yYeyk8P4'
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

    it('Should not update ownerId of Anonymous Voice even if provided', function (doneTest) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        async.series([
          function (nextSeries) {
            agent
              .post(urlBase + '/voice')
              .accept('application/json')
              .send({
                _csrf: csrf,
                image: 'undefined',
                title: 'Casterly nock',
                slug: 'casterly-nock',
                description: 'This is a new and completely unique description.',
                topics: 'd6wb1XVgRvzm',
                type: 'TYPE_PUBLIC',
                status: 'STATUS_DRAFT',
                locationName: 'Casterly Rock',
                latitude: '4.815',
                longitude: '162.342',
                anonymously: 'true',
                ownerId: 'K8adgKWgZPlo'
              })
              .end(function (err, res) {
                if (err) { return nextSeries(err) }

                expect(res.status).to.equal(200)

                return nextSeries()
              })
          },

          function (nextSeries) {
            agent
              .put(urlBase + '/anonymous/casterly-nock')
              .accept('application/json')
              .send({
                _csrf: csrf,
                image: 'undefined',
                title: 'Casterly nock',
                slug: 'casterly-nock',
                description: 'This is a new and completely unique description.',
                topics: 'd6wb1XVgRvzm',
                type: 'TYPE_PUBLIC',
                status: 'STATUS_DRAFT',
                locationName: 'Casterly Rock',
                latitude: '4.815',
                longitude: '162.342',
                ownerId: 'K8adgKWgZPlo'
              })
              .end(function (err, res) {
                if (err) { return nextSeries(err) }

                expect(res.status).to.equal(200)

                Voice.findById(15, function (err, voice) {
                  if (err) { nextSeries(err) }

                  expect(voice[0].description).to.equal('This is a new and completely unique description.')

                  return nextSeries();
                })
              })
          },
        ], function (err) {
          if (err) { return doneTest(err) }

          Voice.find({
            owner_id: 4,
          }, function (err, voice) {
            if (err) { return doneTest(err) }

            expect(voice.length).to.equal(1)

            return doneTest()
          })
        })

      })
    })

  })

})
