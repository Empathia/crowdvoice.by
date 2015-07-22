var createActions = function (req, funcData, modelInst) {
  var action

  // loop over users following
  EntityFollower.find({ followed_id: req.currentPerson.id }, function (err, result) {
    var ids = result.map(function (val) {
      return val.followerId
    })

    ids.forEach(function (val) {
      action = new FeedAction({
        itemId: modelInst.id,
        itemType: funcData.itemType,
        actionDoer: req.currentPerson.id,
        action: funcData.action,
        followerId: followerId,
        read: false,
      })
      action.save()
    })
  })
}

var feed = {
  // created

  voiceCreated: function (req, res, next, model) {
    createActions(req, { action: 'created', itemType: 'voice' }, model)
  },

  entityCreated: function (req, res, next, model) {},

  // updated

  voiceUpdated: function (req, res, next, model) {},

  entityUpdated: function (req, res, next, model) {},

  // deleted

  voiceDeleted: function (req, res, next, model) {},

  entityDeleted: function (req, res, next, model) {},
}

module.exports = feed
