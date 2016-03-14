// This file tests the socket related stuff

'use strict'

var path = require('path')

require(path.join(process.cwd(), 'bin', 'server.js'))

logger.info = function () {}

var expect = require('chai').expect,
  socket = require('socket.io-client')('http://localhost:3000');

describe('Sockets', function () {

  describe('getStats', function () {

    it('Should count voice locations as well as entities locations', function (doneTest) {
      socket.emit('getStats')

      socket.on('stats', function (stats) {
        expect(parseInt(stats.cities)).to.equal(13)

        return doneTest()
      })
    })

  })

  describe('getSavedPostsPage', function () {

    it('Should return with no errors', function (doneTest) {
      socket.emit('getSavedPostsPage', hashids.encode(11), 0)

      socket.on('savedPostsPage', function (posts, page, scrollDirection) {
        expect(posts).to.be.an('array')
        expect(page).to.be.a('number')

        return doneTest()
      })
    })

  })

})
