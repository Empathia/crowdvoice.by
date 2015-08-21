'use strict'

var instance

var FeedInjector = Class('FeedInjector')({

  getInstance: function () {
    if (instance instanceof FeedInjector) {
      return instance
    } else {
      instance = new FeedInjector()
      return instance
    }
  },

  prototype: {

    inject: function (whoId, action, itemModel, callback) {
      this._findAction(whoId, action, itemModel, callback)
    },

    _findAction: function (whoId, action, itemModel, callback) {
      var string = actionString.split(' '),
        followersOf = string[0],
        command = string[1]

      // make sure it's a valid action
      if (followersOf !== 'who' || followersOf !== 'item' || followersOf !== 'both') {
        return callback(new Error('followers of \'' + followersOf + '\' is not a valid string'))
      }

      if (!this.hasOwnProperty(command)) {
        return callback(new Error('invalid provided commmand \'' + command + '\''))
      }

      this.prototype[command].call(this, itemModel, whoId, followersOf, callback)
    },

    _createEntry: function (actionObj, followersOf, callback) {
      FeedAction.find({
        item_type: actionObj.itemtype,
        item_id: actionObj.itemId,
        action: actionObj.action,
        who: actionObj.who,
      }, function (err, duplicateActions) {
        if (err) { return callback(err) }

        async.each(duplicateActions, function (duplicateAction, next) {
          // delete related notifications
          Notification.find({ action_id: duplicateAction.id }, function (err, notifiations) {
            if (err) { return next(err) }

            var notification

            async.each(notifications, function (notif, next) {
              notification = new Notification(notif)
              notification.destroy(next)
            }, function (err) {
              if (err) { return next(err) }

              var action = new FeedAction(duplicateAction)

              // now we can destroy the feed action
              action.destroy(next)
            })
          })
        }, function (err) {
          if (err) { return callback(err) }

          var action,
            itemFollowers = [],
            whoFollowers = [],
            followerIds

          async.series([
            // save record instance
            function (next) {
              action = new FeedAction(actionObj)
              action.save(next)
            },

            // followersOf
            function (next) {
              async.series([
                // who
                function (next) {
                  if (followersOf === 'who' || followersOf === 'both') {
                    EntityFollower.find({ followed_id: actionObj.who }, function (err, followers) {
                      if (err) { return next(err) }

                      whoFollowers = followers.map(function (follower) {
                        return follower.followerId
                      })

                      return next()
                    })
                  } else {
                    return next()
                  }
                },

                // item
                function (next) {
                  if (followersOf === 'item' || followersOf === 'both') {
                    if (actionObj.itemType === 'voice') {
                      VoiceFollower.find({ voice_id: actionObj.itemId }, function (err, followers) {
                        if (err) { return next(err) }

                        itemFollowers = followers.map(function (follower) {
                          return follower.entityId
                        })

                        return next()
                      })
                    } else if (actionObj.itemType === 'entity') {
                      EntityFollower.find({ followed_id: actionObj.itemId }, function (err, followers) {
                        if (err) { return next(err) }

                        itemFollowers = followers.map(function (follower) {
                          return follower.followerId
                        })

                        return next()
                      })
                    } else {
                      return next()
                    }
                  }
                },
              ], function (err) {
                if (err) { return next(err) }

                // followerIds = merge itemFollowers and whoFollowers
                // followerIds = remove duplicates

                return next();
              })
            },
          ], function (err) {
            if (err) { return callback(err) }

            var notification

            async.each(followerIds, function (followerId, next) {
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
    },

  },

})

module.exports = FeedInjector.getInstance
