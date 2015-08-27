'use strict'

require('neonode-core')

global.test = require('tape-catch')

// assuming you already ran `knex migrate:latest` (ran by test command in package.json)
// ATM we only need in the DB the entity followers and the voice followers, since
// these are the ones that are required (because _createEntity looks for followers that way)

var entityFollowers = [
    {
      followerId: 2,
      followedId: 1,
    },
    {
      followerId: 3,
      followedId: 1,
    },
  ],
  entityFollower,
  voiceFollowers = [
    {
      entityId: 1,
      voiceId: 1,
    },
    {
      entityId: 2,
      voiceId: 1,
    },
  ],
  voiceFollower

async.series([
  function (next) {
    async.eachLimit(entityFollowers, 1, function (recordInfo, next) {
      console.log('follower_id: ' + recordInfo.followerId)
      entityFollower = new EntityFollower(recordInfo)
      entityFollower.save(next)
    }, next)
  },

  function (next) {
    async.eachLimit(voiceFollowers, 1, function (recordInfo, next) {
      console.log('entity_id: ' + recordInfo.entityId)
      voiceFollower = new VoiceFollower(recordInfo)
      voiceFollower.save(next)
    }, next)
  },
])
