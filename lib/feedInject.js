/*
 * This file merely contains an object with a set of functions that are to be
 * injected wherever the events they describe happen.
 */

/*
 * Utility function which provides a unified interface to creating new feed
 * actions and the related notifications for all involved users.
 */
var create = function (actionObj, followersOf, callback) {
  var action = new FeedAction(actionObj),
    ids,
    notification

  FeedAction.find({
    item_type: actionObj.itemType,
    item_id: actionObj.itemId,
    action: actionObj.action,
    who: actionObj.who,
  }, function (err, result) {
    if (err) { return callback(err) }

    // delete any (possible) duplicate actions and associated notifications
    async.each(result, function (duplicateAction, next) {
      var action = new FeedAction(duplicateAction)
      action.destroy(function (err) {
        if (err) { return callback(err) }

        Notification.find({ action_id: duplicateAction.id }, function (err, notifications) {
          if (err) { return callback(err) }

          var notification

          async.each(notifications, function (notif, next) {
            notification = new Notification(notif)
            notification.destroy(next)
          }, next)
        })
      })
    }, function (err) {
      if (err) { return callback(err) }

      // save the action so we have its record ID
      action.save(function (err) {
        if (err) { return callback(err) }

        async.series([
          function (next) {
            // notify all the followers of the voice
            if (followersOf === 'voice') {
              VoiceFollower.find({ voice_id: actionObj.itemId }, function (err, result) {
                if (err) { return callback(err) }

                ids = result.map(function (val) { return val.entityId })

                return next()
              })
            // notify all the followers of the entity
            } else if (followersOf === 'entity') {
              EntityFollower.find({ followed_id: actionObj.who }, function (err, result) {
                if (err) { return callback(err) }

                ids = result.map(function (val) { return val.followerId })

                return next()
              })
            }
          },
        ], function (err) {
          if (err) { return callback(err) }

          // make notification for each user
          async.each(ids, function (followerId, next) {
            notification = new Notification({
              actionId: action.id,
              followerId: followerId,
              read: false,
            })
            notification.save(next)
          }, callback)
        })
      })
    })
  })
}

var feedInject = Module('feedInject')({
  // a Voice is created
  voiceCreated: function (req, model, callback) {
    create({
      itemType: 'voice',
      itemId: model.id,
      action: 'created',
      who: hashids.decode(req.currentPerson.id)[0],
    }, 'voice', callback)
  },

  // an Entity follows another Entity
  entityFollowsEntity: function (req, followEntityResult, callback) {
    var recordId = followEntityResult[0]

    EntityFollower.find({ id: recordId }, function (err, record) {
      if (err) { return callback(err) }

      create({
        itemType: 'entity',
        itemId: record[0].followedId,
        action: 'followed',
        who: record[0].followerId,
      }, 'entity', callback)
    })
  },

  // an Entity follows a Voice
  entityFollowsVoice: function (req, followVoiceResult, callback) {
    var recordId = followVoiceResult[0]

    VoiceFollower.find({ id: recordId }, function (err, record) {
      if (err) { return callback(err) }

      create({
        itemType: 'voice',
        itemId: record[0].voiceId,
        action: 'followed',
        who: record[0].entityId,
      }, 'entity', callback)
    })
  },

  // postponed
  // an Entity archives a Voice
  entityArchivesVoice: function () {},

  // an Entity updates its avatar
  entityUpdateAvatar: function (req, callback) {
    var personId = hashids.decode(req.currentPerson.id)[0]

    create({
      itemType: 'entity',
      itemId: personId,
      action: 'changed avatar',
      who: personId,
    }, 'entity', callback)
  },

  // an Entity updates its background image
  entityUpdateBackground: function (req, callback) {
    var personId = hashids.decode(req.currentPerson.id)[0]

    create({
      itemType: 'entity',
      itemId: personId,
      action: 'changed background',
      who: personId,
    }, 'entity', callback)
  },

  // postponed
  // an Entity (Organization) has a new public member
  orgNewPublicMember: function () {},

  // a Voice has new posts
  voiceNewPosts: function (req, callback) {
    callback()
  },

  // a Voice has an update to its title
  voiceUpdateTitle: function (req, callback) {
    callback()
  },

  // a Voice has an update to its description
  voiceUpdateDescription: function (req, callback) {
    callback()
  },

  // postponed
  // a Voice is archived
  voiceArchived: function () {},

  // a Voice has a new public contributor
  voiceNewPublicContributor: function () {},
})

module.exports = feedInject
