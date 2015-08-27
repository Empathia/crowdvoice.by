require(__dirname + '/setup.js')
var FeedInjector = require(__dirname + '/../../lib/FeedInjector.js')

// NOTE: These tests are meant to be run with data from the data_generator.js
//       script.  Each voice only having 2 posts.

//test('', function (t) {
//})

test('entityFollowsEntity', function (t) {
  t.plan(4)

  FeedInjector().inject(1, 'who entityFollowsEntity', { followedId: 4 }, function (err) {
    if (err) {
      t.fail()
      return console.log(err)
    }

    FeedAction.findById(1, function (err, feedAction) {
      if (err) {
        t.fail()
        return console.log(err)
      }

      t.deepEqual(feedAction[0], {
        id: feedAction[0].id,
        itemType: 'entity',
        itemId: 4,
        action: 'followed',
        who: 1,
        createdAt: feedAction[0].createdAt,
        updatedAt: feedAction[0].updatedAt,
      }, 'The FeedAction entry is correct')

      Notification.find(['action_id = ? ORDER BY follower_id ASC', [feedAction[0].id]], function (err, notifs) {
        if (err) {
          t.fail()
          return console.log(err)
        }

        t.deepEqual(notifs.length, 2, 'There is the correct amount of notifications')

        t.deepEqual(notifs[0].followerId, 2, 'Notification entry #1 is correct')
        t.deepEqual(notifs[1].followerId, 3, 'Notification entry #2 is correct')
      })
    })
  })
})

test('entityFollowsVoice', function (t) {
  t.plan(4)

  FeedInjector().inject(1, 'who entityFollowsVoice', { voiceId: 1 }, function (err) {
    if (err) {
      t.fail()
      return console.log(err)
    }

    FeedAction.findById(2, function (err, feedAction) {
      if (err) {
        t.fail()
        return console.log(err)
      }

      t.deepEqual(feedAction[0], {
        id: feedAction[0].id,
        itemType: 'voice',
        itemId: 1,
        action: 'followed',
        who: 1,
        createdAt: feedAction[0].createdAt,
        updatedAt: feedAction[0].updatedAt,
      }, 'The FeedAction entry is correct')

      Notification.find(['action_id = ? ORDER BY follower_id ASC', [feedAction[0].id]], function (err, notifs) {
        if (err) {
          t.fail()
          return console.log(err)
        }

        t.deepEqual(notifs.length, 2, 'There is the correct amount of notifications')

        t.deepEqual(notifs[0].followerId, 2, 'Notification entry #1 is correct')
        t.deepEqual(notifs[1].followerId, 3, 'Notification entry #2 is correct')
      })
    })
  })
})
