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

describe('ThreadsController', function () {

  describe('#create', function () {

    it('Create new thread', function (done) {
      login('cersei', function (err, agent, csrf) {
        agent
          .post(urlBase + '/cersei-lannister/messages')
          .accept('application/json')
          .send({
            _csrf: csrf,
            type: 'message',
            senderEntityId: hashids.encode(3), // Cersei
            receiverEntityId: hashids.encode(17), // Robert
            message: 'Hey, what\'s up? Wanna catch up over coffee?',
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)

            return done()
          })
      })
    })

  })

  describe('#destroy', function () {

    it('Delete invitations of hidden messages', function (done) {
      login('cersei', function (err, agent, csrf) {
        agent
          .del(urlBase + '/cersei-lannister/messages/' + hashids.encode(2))
          .accept('application/json')
          .send({
            _csrf: csrf,
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)
            expect(res.body.status).to.equal('ok')

            InvitationRequest.find({
              invitator_entity_id: 3, // Cersei
              invited_entity_id: 11, // Arya
            }, function (err, result) {
              if (err) { return done(err) }

              expect(result.length).to.equal(0)

              return done()
            })
          })
      })
    })

  })

})
