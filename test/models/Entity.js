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

var propertyLoop = function (array, propertyName, value) {
  array.forEach(function (a) {
    expect(a[propertyName]).to.equal(value)
  })
}

describe('K.Entity', function () {

  describe('Relations', function () {

    describe('user', function () {

      it('Should return a proper User object', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('user')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.user).to.be.an('object')
            expect(tyrion.user.constructor.className).to.equal('User')
            expect(tyrion.user.entityId).to.equal(1)

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('voices', function () {

      it('Should return an array with proper Voices', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('voices')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.voices).to.be.an('array')
            expect(tyrion.voices.length).to.equal(4)
            constructorLoop(tyrion.voices, 'Voice')
            propertyLoop(tyrion.voices, 'ownerId', 1)

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('listableVoices', function () {

      it('Should return an array with proper Voices', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('listableVoices')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.listableVoices).to.be.an('array')
            expect(tyrion.listableVoices.length).to.equal(2)
            constructorLoop(tyrion.listableVoices, 'Voice')
            propertyLoop(tyrion.listableVoices, 'ownerId', 1)

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('viewableVoices', function () {

      it('Should return an array with proper Voices', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('viewableVoices')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.viewableVoices).to.be.an('array')
            expect(tyrion.viewableVoices.length).to.equal(3)
            constructorLoop(tyrion.viewableVoices, 'Voice')
            propertyLoop(tyrion.viewableVoices, 'ownerId', 1)

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('organizations', function () {

      it('Should return an empty array for Tyrion', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('organizations')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.organizations).to.be.an('array')
            expect(tyrion.organizations.length).to.equal(0)

            return doneTest()
          })
          .catch(doneTest)
      })

      it('Should return an array with proper Organizations for Cersei', function (doneTest) {
        K.Entity.query()
          .where('id', 3)
          .include('organizations')
          .then(function (result) {
            var cersei = result[0]

            expect(cersei.organizations).to.be.an('array')
            expect(cersei.organizations.length).to.equal(1)
            constructorLoop(cersei.organizations, 'Entity')
            propertyLoop(cersei.organizations, 'type', 'organization')
            expect(cersei.organizations[0].name).to.equal('House Lannister')

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('contributedVoices', function () {

      it('Should return an empty array for Tyrion', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('contributedVoices')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.contributedVoices).to.be.an('array')
            expect(tyrion.contributedVoices.length).to.equal(0)

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('memberOrganizations', function () {

      it('Should return an array with proper Organizations', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('memberOrganizations')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.memberOrganizations).to.be.an('array')
            expect(tyrion.memberOrganizations.length).to.equal(1)
            constructorLoop(tyrion.memberOrganizations, 'Entity')
            propertyLoop(tyrion.memberOrganizations, 'type', 'organization')
            expect(tyrion.memberOrganizations[0].name).to.equal('House Lannister')

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('followedVoices', function () {

      it('Should return an array with proper Voices', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('followedVoices')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.followedVoices).to.be.an('array')
            expect(tyrion.followedVoices.length).to.equal(11)
            constructorLoop(tyrion.followedVoices, 'Voice')

            return doneTest()
          })
          .catch(doneTest)
      })

    })

    describe('followedEntities', function () {

      it('Should return an array with proper Entities', function (doneTest) {
        K.Entity.query()
          .where('id', 1)
          .include('followedEntities')
          .then(function (result) {
            var tyrion = result[0]

            expect(tyrion.followedEntities).to.be.an('array')
            expect(tyrion.followedEntities.length).to.equal(3)
            constructorLoop(tyrion.followedEntities, 'Entity')

            return doneTest()
          })
          .catch(doneTest)
      })

    })

  })

  describe('#getAnonymousEntity', function () {

    it('Should...', function (doneTest) {
      return doneTest()
    })

  })

  describe('#getOwner & #getRealEntity', function () {

    it('Should...', function (doneTest) {
      return doneTest()
    })

  })

  describe('#isOwnerOfEntity', function () {

    it('Should...', function (doneTest) {
      return doneTest()
    })

  })

  describe('#isOwnedBy', function () {

    it('Should...', function (doneTest) {
      return doneTest()
    })

  })

  describe('#isOwnerOfVoice', function () {

    it('Should...', function (doneTest) {
      return doneTest()
    })

  })

  describe('#hasAccessToVoice', function () {

    it('Should...', function (doneTest) {
      return doneTest()
    })

  })

  describe('#isFollowedBy', function () {

    it('Should...', function (doneTest) {
      return doneTest()
    })

  })

})
