'use strict'

var application = require('neonode-core'),
  test = require('tape-catch'),
  request = require('superagent'),
  login = require('./login')

var urlBase = 'http://localhost:3000'

// assuming somehow we're logged in as user ID 1 (username 'follower')
// and we're following user with profile name 'follow-test-1' (same for username)

test('EntitiesController', function (t) {
  // FOLLOW
  t.test(function (tt) {
    var agent

    async.series([
      // login
      function (next) {
        login.login(request, function (loginAgent) {
          agent = loginAgent

          return next()
        })
      },

      // follow
      function (next) {
        request
          .post(urlBase + '/jon-snow/follow')
          .send({ followerId: '6xOVBlryjQ0a' })
          .end(function (err, res) {
            if (err) { throw err }
          })
      },
    ], function (err) {
      if (err) { return tt.fail(err) }
    })
  })
})
