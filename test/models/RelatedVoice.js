/**
 * NOTE:
 * These tests require the following stuff to have been done before being run in
 * order tfor all tests to pass.
 *
 * DELETE FROM "Posts" WHERE voice_id = 15
 *
 * $ node bin/posts_generator.js 15 3
 */

'use strict'

var path = require('path')

require(path.join(process.cwd(), 'bin', 'server.js'))

logger.log = function () {}

var expect = require('chai').expect

var constructorLoop = function (array, className) {
  array.forEach(function (a) {
    expect(a.constructor.className).to.equal(className)
  })
}

describe('K.RelatedVoice', function () {

  describe('Relations', function () {

    describe('voice', function () {

      it('Should return a proper Voice object', function (doneTest) {
        K.RelatedVoice.query()
          .where('voice_id', 1)
          .andWhere('related_id', 2)
          .include('voice')
          .then(function (result) {
            var related = result[0]

            expect(related.voice).to.be.an('object')
            expect(related.voice.constructor.className).to.equal('Voice')

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('relatedVoice', function () {

      it('Should return a proper Voice object', function (doneTest) {
        K.RelatedVoice.query()
          .where('voice_id', 1)
          .andWhere('related_id', 2)
          .include('relatedVoice')
          .then(function (result) {
            var related = result[0]

            expect(related.relatedVoice).to.be.an('object')
            expect(related.relatedVoice.constructor.className).to.equal('Voice')

            return doneTest()
          })
          .catch(doneTest)
      })

    })

  })

})
