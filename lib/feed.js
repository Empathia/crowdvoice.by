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

  // postponed
  orgNewPublicMember: function (req, res, next, model) {},

  voiceNewPosts: function (req, next) {
    // determine if there's been a notification of this in the last 24 hours
    FeedAction.find(['action = ? ORDER BY created_at DESC LIMIT ?', ['new posts', 1]], function (err, result) {
      if (err) { return next(err) }

      var time = moment().diff(moment(result[0].createdAt), 'hours')

      // within 24 hours
      if (time <= 24) {
        // just go on
        next()
      } else {
        // make vote
        VoiceFollower.find({ voice_id: req.activeVoice.id }, function (err, result) {
          if (err) { return next(err) }

          var ids = result.map(function (val) { return val.entityId }),
            action

          async.each(ids, function (val, callback) {
            action = new FeedAction({
              itemId: result.voiceId,
              itemType: 'voice',
              actionDoer: req.currentPerson.id,
              action: 'new posts',
              followerId: val,
              read: false,
            })
            action.save(callback)
          }, next)
        })
      }
    })
  },

  voiceUpdateTitle: function (req, next) {
    VoiceFollower.find({ voice_id: req.activeVoice.id }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.entityId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: result.voiceId,
          itemType: 'voice',
          actionDoer: req.currentPerson.id,
          action: 'changed title',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  voiceUpdateDescription: function (req, next) {
    VoiceFollower.find({ voice_id: req.activeVoice.id }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.entityId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: result.voiceId,
          itemType: 'voice',
          actionDoer: req.currentPerson.id,
          action: 'changed description',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  // postponed
  voiceArchived: function (req, res, next, model) {},
  voiceNewPublicContributor: function (req, res, next, model) {},
}

module.exports = feed
