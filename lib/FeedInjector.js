'use strict'

var FeedInjector = Class('FeedInjector')({

  _instance: null,

  getInstance: function () {
    if (FeedInjector._instance) {
      return FeedInjector._instance
    } else {
      FeedInjector._instance = new FeedInjector()
      return FeedInjector._instance
    }
  },

  prototype: {

    inject: function (whoId, action, itemModel, callback) {
      this._findAction(whoId, action, itemModel, callback)
    },

    _findAction: function (whoId, actionString, itemModel, callback) {
      var string = actionString.split(' '),
        followersOf = string[0],
        command = string[1]

      // make sure it's a valid action
      if (followersOf.search(/(who|item|both)/) === -1) {
        return callback(new Error('followers of \'' + followersOf + '\' is not a valid string'))
      }

      if (!this['_' + command]) {
        return callback(new Error('invalid provided commmand \'' + command + '\''))
      }

      this['_' + command].call(this, itemModel, whoId, followersOf, callback)
    },

    _createEntry: function (actionObj, followersOf, callback) {
      FeedAction.find({
        item_type: actionObj.itemType,
        item_id: actionObj.itemId,
        action: actionObj.action,
        who: actionObj.who,
      }, function (err, duplicateActions) {
        if (err) { return callback(err) }

        async.each(duplicateActions, function (duplicateAction, next) {
          // delete related notifications
          Notification.find({ action_id: duplicateAction.id }, function (err, notifications) {
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
            followerIds = []

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
                  } else {
                    return next()
                  }
                },
              ], function (err) {
                if (err) { return next(err) }

                followerIds = followerIds.concat(itemFollowers, whoFollowers)
                followerIds = _.uniq(followerIds)

                return next();
              })
            },
          ], function (err) {
            if (err) {
              logger.error(err)
              logger.error(err.stat)

              return action.destroy(function () {
                return callback(err)
              })
            }

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

    /*
     * ACTION FUNCTIONS
     */

    _entityFollowsEntity: function (entityFollowerModel, whoId, followersOf, callback) {
      this._createEntry({
        itemType: 'entity',
        itemId: entityFollowerModel.followedId,
        action: 'followed',
        who: whoId,
      }, followersOf, callback)
    },

    _entityFollowsVoice: function (voiceFollowerModel, whoId, followersOf, callback) {
      Voice.findById(voiceFollowerModel.voiceId, function (err, voice) {
        if (err) { return callback(err) }

        if (voice[0].status !== Voice.STATUS_PUBLISHED) {
          return callback(null)
        }

        this._createEntry({
          itemType: 'voice',
          itemId: voiceFollowerModel.voiceId,
          action: 'followed',
          who: whoId,
        }, followersOf, callback)
      })
    },

    _entityArchivesVoice: function (voiceModel, whoId, followersOf, callback) {
      if (voiceModel.status !== Voice.STATUS_ARCHIVED) {
        return callback(null)
      }

      this._createEntry({
        itemType: 'voice',
        itemId: voiceModel.id,
        action: 'archived',
        who: whoId,
      }, followersOf, callback)
    },

    _entityUpdatesAvatar: function (entityModel, whoId, followersOf, callback) {
      if (entityModel.isAnonymous) {
        return callback(null)
      }

      this._createEntry({
        itemType: 'entity',
        itemId: entityModel.id,
        action: 'changed avatar',
        who: whoId,
      }, followersOf, callback)
    },

    _entityUpdatesBackground: function (entityModel, whoId, followersOf, callback) {
      if (entityModel.isAnonymous) {
        return callback(null)
      }

      this._createEntry({
        itemType: 'entity',
        itemId: entityModel.id,
        action: 'changed background',
        who: whoId,
      }, followersOf, callback)
    },

    _entityBecomesOrgPublicMember: function (entityMembershipModel, whoId, followersOf, callback) {
      if (entityMembershipModel.isAnonymous) {
        return callback(null)
      }

      this._createEntry({
        itemType: 'entity',
        itemId: entityMembershipModel.entityId,
        action: 'became public member',
        who: whoId,
      }, followersOf, callback)
    },

    _voiceIsPublished: function (voiceModel, whoId, followersOf, callback) {
      if (voiceModel.status !== Voice.STATUS_PUBLISHED) {
        return callback(null)
      }

      this._createEntry({
        itemType: 'voice',
        itemId: voiceModel.id,
        action: 'published',
        who: whoId,
      }, followersOf, callback)
    },

    _voiceNewPosts: function (voiceModel, whoId, followersOf, callback) {
      if (voiceModel.status !== Voice.STATUS_PUBLISHED) {
        return callback(null)
      }

      this._createEntry({
        itemType: 'voice',
        itemId: voiceModel.id,
        action: 'new posts',
        who: whoId,
      }, followersOf, callback)
    },

    _voiceNewTitle: function (voiceModel, whoId, followersOf, callback) {
      if (voiceModel.status !== Voice.STATUS_PUBLISHED) {
        return callback(null)
      }

      this._createEntry({
        itemType: 'voice',
        itemId: voiceModel.id,
        action: 'new title',
        who: whoId,
      }, followersOf, callback)
    },

    _voiceNewDescription: function (voiceModel, whoId, followersOf, callback) {
      if (voiceModel.status !== Voice.STATUS_PUBLISHED) {
        return callback(null)
      }

      this._createEntry({
        itemType: 'voice',
        itemId: voiceModel.id,
        action: 'new description',
        who: whoId,
      }, followersOf, callback)
    },

    _voiceNewPublicContributor: function (voiceCollaboratorModel, whoId, followersOf, callback) {
      if (voiceCollaboratorModel.isAnonymous) {
        return callback(null)
      }

      Voice.findById(voiceCollaboratorModel.voiceId, function (err, voice) {
        if (err) { return callback(err) }

        if (voice[0].status !== Voice.STATUS_PUBLISHED) {
          return callback(null)
        }

        this._createEntry({
          itemType: 'voice',
          itemId: voiceCollaboratorModel.voiceId,
          action: 'became public contributor',
          who: whoId,
        }, followersOf, callback)
      })
    },

  },

})

module.exports = FeedInjector.getInstance
