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

  entityFollowsEntity: function (req, next, followEntityResult) {
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

  entityFollowsVoice: function (req, next, followVoiceResult) {
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

  // postponed
  entityArchivesVoice: function (req, res, next, model) {},

  entityUpdateAvatar: function (req, next) {
    EntityFollower.find({ followed_id: req.currentPerson.id }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: req.currentPerson.id,
          itemType: 'entity',
          actionDoer: req.currentPerson.id,
          action: 'changed avatar',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  entityUpdateBackground: function (req, next, model) {
    EntityFollower.find({ followed_id: req.currentPerson.id }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: req.currentPerson.id,
          itemType: 'entity',
          actionDoer: req.currentPerson.id,
          action: 'changed background',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  orgNewPublicMember: function (req, res, next, model) {},

  voiceNewPosts: function (req, res, next, model) {},
  voiceUpdateTitle: function (req, res, next, model) {},
  voiceUpdateDesc: function (req, res, next, model) {},
  voiceArchived: function (req, res, next, model) {},
  voiceNewPublicContributor: function (req, res, next, model) {},
}

module.exports = feed
