require('neonode-core')

// assuming you already ran `knex migrate:latest` (ran by test command in package.json)
// ATM we only need in the DB the entity followers and the voice followers, since
// these are the ones that are required (because _createRecord looks for followers that way)

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
  entityFollower

var voices = [
    {
      title: 'Counter Strike: Global Offensive',
      description: 'Tactical team-based FPS',
      locationName: 'Everywhere',
      ownerId: 1,
      status: Voice.STATUS_PUBLISHED,
      type: Voice.TYPE_PUBLIC,
    },
    {
      title: 'Counter Strike 1.6',
      description: 'Tactical team-based FPS',
      locationName: 'Everywhere',
      ownerId: 1,
      status: Voice.STATUS_ARCHIVED,
      type: Voice.TYPE_PUBLIC,
    },
    {
      title: 'Portal 2',
      description: 'Puzzle 3D game',
      locationName: 'Everywhere',
      ownerId: 1,
      status: Voice.STATUS_PUBLISHED,
      type: Voice.TYPE_PUBLIC,
    },
  ],
  voice

var voiceFollowers = [
    {
      entityId: 1,
      voiceId: 1,
    },
    {
      entityId: 2,
      voiceId: 1,
    },
    {
      entityId: 1,
      voiceId: 2,
    },
    {
      entityId: 2,
      voiceId: 2,
    },
    {
      entityId: 1,
      voiceId: 3,
    },
    {
      entityId: 2,
      voiceId: 3,
    },
  ],
  voiceFollower

async.series([
  // make voices
  function (next) {
    async.eachLimit(voices, 1, function (recordInfo, next) {
      voice = new Voice(recordInfo)
      voice.save(next)
    }, next)
  },

  // make voice followers
  function (next) {
    async.eachLimit(voiceFollowers, 1, function (recordInfo, next) {
      voiceFollower = new VoiceFollower(recordInfo)
      voiceFollower.save(next)
    }, next)
  },

  // make entity followers
  function (next) {
    async.eachLimit(entityFollowers, 1, function (recordInfo, next) {
      entityFollower = new EntityFollower(recordInfo)
      entityFollower.save(next)
    }, next)
  },
], function (err) {
  if (err) { console.log(err) }

  process.exit()
})
