var FeedActionsController = Class('FeedActionsController')({
  prototype: {
    // created

    voiceCreated: function (data) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', data)
      var action = new FeedAction({
        itemId: data.model.id,
        itemType: 'voice',
        actionDoer: data.model.ownerId,
        action: 'created',
        followerId: null,
        read: false,
      })
    },

    entityCreated: function (data) {},

    // updated

    voiceUpdated: function (data) {},

    entityUpdated: function (data) {},

    // deleted

    voiceDeleted: function (data) {},

    entityDeleted: function (data) {},
  },
})

module.exports = new FeedActionsController()
