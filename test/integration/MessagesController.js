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

describe('MessagesController', function () {

  describe('#create', function () {

    it('Create message in pre-existing conversation', function (done) {
      login('tyrion', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .post(urlBase + '/tyrion-lannister/messages/6xOVBlryjQ0a')
          .accept('application/json')
          .send({
            _csrf: csrf,
            message: 'So anyway, weird conversation huh?',
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            return done()
          })
      })
    })

  })

  describe('#answerInvite', function () {

    it('"Accept > Leave > Accept > Error" shouldn\'t happen', function (done) {
      async.series([
        function (nextSeries) {
          login('cersei', function (err, agent, csrf) {
            if (err) { return nextSeries(err) }

            agent
              .post(urlBase + '/cersei-lannister/messages')
              .accept('application/json')
              .send({
                _csrf: csrf,
                type: 'invitation_organization',
                senderEntityId: hashids.encode(3), // Cersei
                receiverEntityId: hashids.encode(17), // Robert
                organizationId: hashids.encode(22), // House Lannister
                message: 'I think this is an offer you cannot turn down...',
              })
              .end(function (err, res) {
                if (err) { return nextSeries(err) }

                expect(res.status).to.equal(200)

                return nextSeries()
              })
          })
        },

        function (nextSeries) {
          login('robert', function (err, agent, csrf) {
            if (err) { return nextSeries(err) }

            agent
              .post(urlBase + '/robert-baratheon/messages/d6wb1XVgRvzm/jd36BpEg4Mbe/answerInvite')
              .accept('application/json')
              .send({
                _csrf: csrf,
                action: 'accept',
              })
              .end(function (err, res) {
                if (err) { return nextSeries(err) }

                expect(res.status).to.equal(200)

                return nextSeries()
              })
          })
        },

        function (nextSeries) {
          login('robert', function (err, agent, csrf) {
            if (err) { return nextSeries(err) }

            agent
              .post(urlBase + '/robert-baratheon/leaveOrganization')
              .accept('application/json')
              .send({
                _csrf: csrf,
                orgId: hashids.encode(22), // House Lannister
                entityId: hashids.encode(17), // Robert
              })
              .end(function (err, res) {
                if (err) { return nextSeries(err) }

                expect(res.status).to.equal(200)

                return nextSeries()
              })
          })
        },

        function (nextSeries) {
          login('cersei', function (err, agent, csrf) {
            if (err) { return nextSeries(err) }

            agent
              .post(urlBase + '/cersei-lannister/messages')
              .accept('application/json')
              .send({
                _csrf: csrf,
                type: 'invitation_organization',
                senderEntityId: hashids.encode(3), // Cersei
                receiverEntityId: hashids.encode(17), // Robert
                organizationId: hashids.encode(22), // House Lannister
                message: 'I think this is an offer you cannot turn down...',
              })
              .end(function (err, res) {
                if (err) { return nextSeries(err) }

                expect(res.status).to.equal(200)

                return nextSeries()
              })
          })
        },

        function (nextSeries) {
          login('robert', function (err, agent, csrf) {
            if (err) { return nextSeries(err) }

            agent
              .post(urlBase + '/robert-baratheon/messages/d6wb1XVgRvzm/QLP8gxJ13z6D/answerInvite')
              .accept('application/json')
              .send({
                _csrf: csrf,
                action: 'accept',
              })
              .end(function (err, res) {
                if (err) { return nextSeries(err) }

                expect(res.status).to.equal(200)

                return nextSeries()
              })
          })
        },

      ], done)
    })

  })

})
