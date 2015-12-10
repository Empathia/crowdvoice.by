'use strict'

require(path.join(__dirname, '../mailers/NotificationMailer.js'))

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

    inject: this.injectFeed,

    injectFeed: function (whoId, actionString, itemModel, callback) {
      var splitString = actionString.split(' ')

      if (splitString.length !== 2) {
        return callback(new Error("Invalid 'actionString' argument"))
      }

      var followersOf = splitString[0],
        actionFunction = splitString[1]

      if (followersOf.match(/^(who|item|both)$/) === null) {
        return callback(new Error("Invalid 'followersOf' string"))
      }

      if (actionFunction.match(/^notif/) !== null) {
        return callback(new Error("Action function cannot have 'notif' prefix"))
      }

      if (!this['_' + actionFunction]) {
        return callback(new Error("Action function '" + actionFunction + "' does not exist"))
      }

      this['_' + actionFunction].call(this, itemModel, whoId, followersOf, callback)
    },

    injectNotification: function () {},

    _deleteDuplicates: function () {},

    _createFeedEntry: function () {},

    _createNotificationEntry: function () {},

    /**
     * FEED ACTION FUNCTIONS
     */

    // {{{
    _entityFollowsEntity: function (entityFollowerModel, whoId, followersOf, callback) {
      this._createEntry('entityFollowsEntity', {
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

        this._createEntry('entityFollowsVoice', {
          itemType: 'voice',
          itemId: voiceFollowerModel.voiceId,
          action: 'followed',
          who: whoId,
        }, followersOf, callback)
      }.bind(this))
    },

    _entityArchivesVoice: function (voiceModel, whoId, followersOf, callback) {
      if (voiceModel.status !== Voice.STATUS_ARCHIVED) {
        return callback(null)
      }

      this._createEntry('entityArchivesVoice', {
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

      this._createEntry('entityUpdatesAvatar', {
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

      this._createEntry('entityUpdatesBackground', {
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

      this._createEntry('entityBecomesOrgPublicMember', {
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

      this._createEntry('voiceIsPublished', {
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

      FeedAction.find(['action = ? AND item_type = ? AND item_id = ? ORDER BY created_at DESC LIMIT ?', ['new posts', 'voice', voiceModel.id, 1]], function (err, result) {
        if (err) { return callback(err) }

        var isAllowed = false,
          time = 0;

        // no results, first record of this, is allowed
        if (result.length === 0) {
          isAllowed = true;
        }

        if (!isAllowed) {
          time = moment().diff(moment(result[0].createdAt), 'hours')

          if (time <= 24) {
            isAllowed = false;
          } else {
            isAllowed = true;
          }
        }

        if (!isAllowed) {
          return callback();
        } else {
          this._createEntry('voiceNewPosts', {
            itemType: 'voice',
            itemId: voiceModel.id,
            action: 'new posts',
            who: whoId,
          }, followersOf, callback)
        }
      }.bind(this))
    },

    _voiceNewTitle: function (voiceModel, whoId, followersOf, callback) {
      if (voiceModel.status !== Voice.STATUS_PUBLISHED) {
        return callback(null)
      }

      this._createEntry('voiceNewTitle', {
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

      this._createEntry('voiceNewDescription', {
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

        this._createEntry('voiceNewPublicContributor', {
          itemType: 'voice',
          itemId: voiceCollaboratorModel.voiceId,
          action: 'became public contributor',
          who: whoId,
        }, followersOf, callback)
      }.bind(this))
    },
    // }}}

    /**
     * NOTIFICATION ACTION FUNCTIONS
     */

    // {{{
    _notifNewMessage: function (messageModel, whoId, callback) {
      this._createNotificationEntry('notifNewMessage', {
        itemType: 'message',
        itemId: messageModel.id,
        action: 'sent a new message',
        who: whoId, // or messageModel.senderEntityId
      }, messageModel.receiverEntityId, callback)
    },

    _notifNewRequest: function (messageModel, whoId, callback) {
      if messageModel.voice
        itemType = 'voice'
        itemId = messageModel.voice
        action = 'a contributor'
      if messageModel.organization
        itemType = 'entity'
        itemId = messageModel.organization
        action = 'a member'

      this._createNotificationEntry('notifNewRequest', {
        itemType: itemType,
        itemId: itemId,
        action: 'requested to become ' + action,
        who: whoId, // or voiceCollaboratorModel.collaboratorId
      }, messageModel.receiverEntityId, callback)
    },

    _notifNewInvitation: function (model, whoId, callback) {
      if messageModel.voice
        itemType = 'voice'
        itemId = messageModel.voice
        action = 'a contributor'
      if messageModel.organization
        itemType = 'entity'
        itemId = messageModel.organization
        action = 'a member'

      this._createNotificationEntry('notifNewRequest', {
        itemType: itemType,
        itemId: itemId,
        action: 'has invited to become ' + action,
        who: whoId, // or messageModel.senderEntityId
      }, messageModel.receiverEntityId, callback)
    },

    _notifNewVoiceFollower: function (voiceFollowerModel, whoId, callback) {
      if voice.status !== Voice.STATUS_PUBLISHED
        return callback

      define voice instance voiceFollowerModel.voiceId

      this._createNotificationEntry('notifNewVoiceFollower', {
        itemType: 'voice',
        itemId: voiceFollowerModel.voiceId,
        action: 'followed your voice',
        who: whoId, // or voiceFollowerModel.voiceId
      }, voice.ownerId, callback)
    },

    _notif: function (entityFollowerModel, whoId, callback) {
      this._createNotificationEntry('notifNewEntityFollower', {
        itemType: 'entity',
        itemId: entityFollowerModel.followedId,
        action: 'followed you',
        who: whoId, // or entityFollowerModel.followerId
      }, entityFollowerModel.followedId, callback)
    },
    // }}}

  },

})

module.exports = FeedInjector.getInstance
