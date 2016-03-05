// requires: node bin/posts_generator 15 20

'use strict'

var path = require('path')

require(path.join(process.cwd(), 'bin', 'server.js'))

// COMMENT IF YOU WANT LOGGER OUTPUT
logger.info = function () {}

var login = require(path.join(__dirname, 'login.js')),
  expect = require('chai').expect,
  request = require('superagent')

var urlBase = 'http://localhost:3000'

describe('PostsController', function () {

  describe('#repost', function () {

    it('Should repost with no errors', function (doneTest) {
      login('tyrion-lannister', function (err, agent, csrf) {
        if (err) { return doneTest() }

        agent
          .post(urlBase + '/tyrion-lannister/valyrian-roads/' + hashids.encode(15) + '/repost')
          .send({
            _csrf: csrf,
            voicesIds: [hashids.encode(1)] // blackwater-battle
          })
          .end(function (err, res) {
            if (err) { return doneTest(err) }

            expect(res.status).to.equal(200)

            return doneTest()
          })
      })
    })

  })

})
