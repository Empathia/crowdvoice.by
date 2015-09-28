'use strict'

var FeedPresenter = require('./FeedPresenter.js')

var NotificationsPresenter = Module('NotificationsPresenter')({
  build: function (notifications, currentPerson, callback) {
    var result = [],
      actionIds = notifications.map(function (notif) { return notif.actionId }),
      itemToAdd = {}

    FeedAction.whereIn('id', actionIds, function (err, actions) {
      if (err) { return callback(err) }

      FeedPresenter.build(actions, currentPerson, function (err, presentedActions) {
        if (err) { return callback(err) }

        notifications.forEach(function (notification, index) {
          itemToAdd = {} // reset

          itemToAdd.notificationId = hashids.encode(notification.id)
          itemToAdd.action = presentedActions[index]

          result.push(itemToAdd)
        })

        return callback(null, result)
      })
    })

  },
})

module.exports = NotificationsPresenter
