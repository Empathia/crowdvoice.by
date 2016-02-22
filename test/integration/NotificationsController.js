'use strict'

var application = require('neonode-core')
require(path.join(__dirname, '../../lib/routes.js'))

global.FeedInjector = require(path.join(__dirname, '../../lib/FeedInjector.js'))
require(path.join(__dirname, '../../presenters/PostsPresenter'))

application._serverStart()

// COMMENT IF YOU WANT LOGGER OUTPUT
logger.log = function () {}

var login = require(path.join(__dirname, 'login.js')),
  expect = require('chai').expect

CONFIG.database.logQueries = false

var urlBase = 'http://localhost:3000'

describe('NotificationsController', function () {

  describe('#getNotifications', function () {

    it('Get notifications when in anonymous mode', function (testDone) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return testDone(err) }

        async.series([
          // change to anonymous
          function (seriesNext) {
            agent
              .get(urlBase + '/switchPerson')
              .end(function (err, res) {
                if (err) { return seriesNext(err) }

                expect(res.status).to.equal(200)

                return seriesNext()
              })
          },

          // getNotifications
          function (seriesNext) {
            agent
              .get(urlBase + '/cersei-lannister/notifications')
              .accept('application/json')
              .end(function (err, res) {
                if (err) { return seriesNext(err) }

                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(2)
                expect(res.body[0].notificationId).to.exist
                expect(res.body[1].notificationId).to.exist
                expect(res.body[0].action).to.exist
                expect(res.body[1].action).to.exist

                return seriesNext()
              })
          },
        ], testDone)
      })
    })

  })

  describe('#markAllAsRead', function () {

    it('Mark as read all notifications "owned" by you', function (done) {
      login('cersei-lannister', function (err, agent, csrf) {
        if (err) { return done(err) }

        agent
          .del(urlBase + '/cersei-lannister/notifications/markAllAsRead')
          .accept('application/json')
          .send({
            _csrf: csrf,
          })
          .end(function (err, res) {
            if (err) { return done(err) }

            expect(res.status).to.equal(200)
            expect(res.body.status).to.equal('ok')
            expect(res.body.affectedNotifications).to.equal(3)

            async.series([
              // Cersei
              function (next) {
                Notification.find({ follower_id: 3 }, function (err, notifications) {
                  if (err) { return done(err) }

                  notifications.forEach(function (notif) {
                    expect(notif.read).to.equal(true)
                  })

                  return next()
                })
              },
              // House Lannister
              function (next) {
                Notification.find({ follower_id: 22 }, function (err, notifications) {
                  if (err) { return done(err) }

                  notifications.forEach(function (notif) {
                    expect(notif.read).to.equal(true)
                  })

                  return next()
                })
              },
            ], done)
          })
      })
    })

  })

})
