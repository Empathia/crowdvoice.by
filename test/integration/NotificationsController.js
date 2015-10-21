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

describe('NotificationsController', function () {

  describe('#markAllAsRead', function () {

    it('Mark as read all notifications "owned" by you', function (done) {
      login('cersei', function (err, agent, csrf) {
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
