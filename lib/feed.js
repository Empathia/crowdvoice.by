var feed = {
  // created

  voiceCreated: function (req, res, next, model) {
    EntityFollower.find({ followed_id: req.currentPerson.id }, function (err, result) {
      if (err) { return next(err) }

      var ids = result.map(function (val) { return val.followerId }),
        action

      ids.forEach(function (val) {
        action = new FeedAction({
          itemId: model.id,
          itemType: 'voice',
          actionDoer: req.currentPerson.id,
          action: 'created',
          followerId: val,
          read: false,
        })
        action.save(function (err) {
          if (err) { return next(err) }
        })
      })
    })
  },

  entityCreated: function (req, res, next, model) {},

  // updated

  voiceUpdated: function (req, res, next, model) {},

  entityUpdated: function (req, res, next, model) {
  },

  // deleted

  voiceDeleted: function (req, res, next, model) {},

  entityDeleted: function (req, res, next, model) {},
}

module.exports = feed
