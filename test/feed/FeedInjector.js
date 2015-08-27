require(__dirname + '/setup.js')
var FeedInjector = require(__dirname + '/../../lib/FeedInjector.js')

// NOTE: These tests are meant to be run with data from the data_generator.js
//       script.  Each voice only having 2 posts.

//test('', function (t) {
//})

require(__dirname + '/reset.js')

test('entityFollowsEntity', function (t) {
  t.plan(4)

  FeedInjector().inject(1, 'who entityFollowsEntity', { followedId: 2 }, function (err) {
    if (err) {
      t.fail()
      return console.log(err)
    }

    FeedAction.findById(1, function (err, feedAction) {
      if (err) {
        t.fail()
        return console.log(err)
      }

      t.equal(feedAction[0], {
        id: feedAction[0].id,
        itemType: 'entity',
        itemId: 2,
        action: 'followed',
        who: 1,
        createdAt: feedAction[0].createdAt,
        updatedAt: feedAction[0].updatedAt,
      }, 'The FeedAction entry is correct')

      Notification.find({ action_id: feedAction[0].id }, function (err, notifications) {
        if (err) {
          t.fail()
          return console.log(err)
        }

        // sort so there is a predictable order
        var notifs = notifications.sort(function (a, b) { return a.followerId - b.followerId })

        // Tyrion has 2 followers
        t.equal(notifications.length, 2, 'There is the correct amount of notifications')

        t.equal(notifs[0], {
          id: notifs[0].id,
          actionId: notifs[0].actionId,
          followerId: 5,
          read: false,
          createdAd: notifs[0].createdAt,
          updatedAt: notifs[0].updatedAt,
        }, 'Notification entry #1 is correct')

        t.equal(notifs[1], {
          id: notifs[1].id,
          actionId: notifs[1].actionId,
          followerId: 7,
          read: false,
          createdAd: notifs[1].createdAt,
          updatedAt: notifs[1].updatedAt,
        }, 'Notification entry #2 is correct')
      })
    })
  })
})
