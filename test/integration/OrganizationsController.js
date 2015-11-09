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

describe('OrganizationsController', function () {

  describe('#requestMembership', function () {

    it('Should request membership with no errors', function (done) {
      login('jon-snow', function (err, agent, csrf) {
        if (err) { return done(err) }

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

  describe('#create', function () {

    it('Should create notification settings for organization', function (doneTest) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        agent
          .post(urlBase + '/cersei-lannister/newOrganization')
          .type('form')
          .accept('application/json')
          .send({
            _csrf: csrf,
            title: 'House Lannister of them all',
            profileName: 'house-lannister-2',
            description: 'The alternative to the House Lannister, in case you don\'t like the main line.',
            locationName: '',
            imageLogo: undefined,
            imageBackground: undefined,
          })
          .end(function (err, res) {
            if (err) { return doneTest(err) }

            expect(res.status).to.equal(200)

            NotificationSetting.find({ entity_id: 25 }, function (err, result) {
              if (err) { return doneTest(err) }

              expect(result.length).to.equal(1)

              return doneTest()
            })
          })
      })
    })

    it('Should not allow you to create org with same profile name as currentPerson', function (doneTest) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        agent
          .post(urlBase + '/cersei-lannister/newOrganization')
          .type('form')
          .accept('application/json')
          .send({
            _csrf: csrf,
            title: 'Valve',
            profileName: 'cersei-lannister',
            description: 'Creator of games such as Portal, TF2 or CS and creators of the Steam platform.',
            locationName: '',
            imageLogo: undefined,
            imageBackground: undefined,
          })
          .end(function (err, res) {
            expect(err).to.exist
            expect(res.status).to.equal(403)

            return doneTest()
          })
      })
    })

    it('Should not allow you to create org with profile name in BlackListFilter', function (doneTest) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return doneTest(err) }

        agent
          .post(urlBase + '/cersei-lannister/newOrganization')
          .type('form')
          .accept('application/json')
          .send({
            _csrf: csrf,
            title: 'BlackList Organization',
            profileName: 'search',
            description: 'The true organization, the one in the blacklist for naughtiness.',
            locationName: '',
            imageLogo: undefined,
            imageBackground: undefined,
          })
          .end(function (err, res) {
            expect(err).to.exist
            expect(res.status).to.equal(403)

            return doneTest()
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
