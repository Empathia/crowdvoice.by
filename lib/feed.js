var feed = {
  voiceCreated: function (req, model, next) {
    var personId = hashids.decode(req.currentPerson.id)[0]

    EntityFollower.find({ followed_id: personId }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: model.id,
          itemType: 'voice',
          actionDoer: personId,
          action: 'created',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  entityFollowsEntity: function (req, followEntityResult, next) {
    var recordId = followEntityResult[0]

    // find the record
    EntityFollower.find({ id: recordId }, function (err, firstResult) {
      if (err) { return next(err) }

      // find all the followers of follwed entity
      EntityFollower.find({ followed_id: firstResult[0].followedId }, function (err, secondResult) {
        var ids = secondResult.map(function (val) { return val.followerId }),
          action,
          personId = secondResult[0].followedId

        // make a record for each follower
        async.each(ids, function (val, callback) {
          action = new FeedAction({
            itemId: personId,
            itemType: 'entity',
            actionDoer: firstResult[0].followerId,
            action: 'followed',
            followerId: val,
            read: false,
          })
          action.save(callback)
        }, next)
      })
    })
  },

  entityFollowsVoice: function (req, followVoiceResult, next) {
    var personId = hashids.decode(req.currentPerson.id)[0]

    EntityFollower.find({ followed_id: personId }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: followVoiceResult.id,
          itemType: 'voice',
          actionDoer: personId,
          action: 'followed',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  // postponed
  entityArchivesVoice: function (req, res, model, next) {},

  entityUpdateAvatar: function (req, next) {
    var personId = hashids.decode(req.currentPerson.id)[0]

    EntityFollower.find({ followed_id: personId }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: personId,
          itemType: 'entity',
          actionDoer: personId,
          action: 'changed avatar',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  entityUpdateBackground: function (req, next) {
    var personId = hashids.decode(req.currentPerson.id)[0]

    EntityFollower.find({ followed_id: personId }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: personId,
          itemType: 'entity',
          actionDoer: personId,
          action: 'changed background',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  // postponed
  orgNewPublicMember: function (req, res, model, next) {},

  voiceNewPosts: function (req, next) {
    var voiceId = hashids.decode(req.activeVoice.id)[0]

    // determine if there's been a notification of this in the last 24 hours
    FeedAction.find(['action = ? ORDER BY created_at DESC LIMIT ?', ['new posts', 1]], function (err, result) {
      if (err) { return next(err) }

      // no results, i.e. first record
      if (result.length <= 0) {
        return next()
      }

      var time = moment().diff(moment(result[0].createdAt), 'hours')

      // within 24 hours
      if (time <= 24) {
        // just go on
        return next()
      } else {
        // make vote
        VoiceFollower.find({ voice_id: voiceId }, function (err, followers) {
          if (err) { return next(err) }

          var ids = followers.map(function (val) { return val.entityId }),
            action

          async.each(ids, function (val, callback) {
            action = new FeedAction({
              itemId: voiceId,
              itemType: 'voice',
              actionDoer: hashids.decode(req.activeVoice.ownerId)[0],
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
    var personId = hashids.decode(req.currentPerson.id)[0]

    VoiceFollower.find({ voice_id: personId }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.entityId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: result.voiceId,
          itemType: 'voice',
          actionDoer: personId,
          action: 'changed title',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  voiceUpdateDescription: function (req, next) {
    var personId = hashids.decode(req.currentPerson.id)[0]

    VoiceFollower.find({ voice_id: personId }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.entityId }),
        action

      async.each(ids, function (val, callback) {
        action = new FeedAction({
          itemId: result.voiceId,
          itemType: 'voice',
          actionDoer: personId,
          action: 'changed description',
          followerId: val,
          read: false,
        })
        action.save(callback)
      }, next)
    })
  },

  // postponed
  voiceArchived: function (req, res, model, next) {},

  voiceNewPublicContributor: function (req, res, model, next) {},
}

module.exports = feed
