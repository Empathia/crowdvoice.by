var feed = {
  voiceCreated: function (req, next, model) {
    EntityFollower.find({ followed_id: req.currentPerson.id }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: model.id,
          itemType: 'voice',
          actionDoer: req.currentPerson.id,
          action: 'created',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  entityFollowsEntity: function (req, next, model, followEntityResult) {
    EntityFollower.find({ followed_id: req.currentPerson.id }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: followEntityResult.id,
          itemType: 'entity',
          actionDoer: req.currentPerson.id,
          action: 'followed',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  entityFollowsVoice: function (req, next, model, followVoiceResult) {
    EntityFollower.find({ followed_id: req.currentPerson.id }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: followVoiceResult.id,
          itemType: 'voice',
          actionDoer: req.currentPerson.id,
          action: 'followed',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  entityArchivesVoice: function (req, res, next, model) {},
  entityUpdateAvatar: function (req, res, next, model) {},
  entityUpdateBack: function (req, res, next, model) {},
  orgNewPublicMember: function (req, res, next, model) {},

  voiceNewPosts: function (req, res, next, model) {},
  voiceUpdateTitle: function (req, res, next, model) {},
  voiceUpdateDesc: function (req, res, next, model) {},
  voiceArchived: function (req, res, next, model) {},
  voiceNewPublicContributor: function (req, res, next, model) {},
}

module.exports = feed
