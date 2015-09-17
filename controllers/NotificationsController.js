'use strict'

var FeedPresenter = require(__dirname + '/../presenters/FeedPresenter.js')

var NotificationsController = Class('NotificationsController')({
  prototype: {
    getNotifications: function (req, res, next) {
      ACL.isAllowed('getNotifications', 'entities', req.role, {
        currentEntity: req.entity,
        currentPerson: req.currentPerson,
      }, function (err, response) {
        if (err) { return next(err) }

        if (!response.isAllowed) {
          return next(new ForbiddenError())
        }

        FeedAction.find({ follower_id: hashids.decode(req.currentPerson.id)[0], read: false }, function (err, notifications) {
          if (err) { return next(err) }

          FeedPresenter.build(notifications, req.currentPerson, true, function (err, presentedNotifications) {
            if (err) { return next(err) }

            res.json(presentedNotifications)
          })
        })
      })
    },

    markAsRead: function (req, res, next) {
      FeedAction.find({ id: hashids.decode(req.body.notificationId)[0] }, function (err, action) {
        if (err) { return next(err) }

        var notif = new FeedAction(action[0])
        notif.read = true
        notif.save(function (err) {
          if (err) { return next(err) }

          res.json({ status: 'ok' })
        })
      })
    },

    updateNotificationSettings: function (req, res, next) {
      /* PUT
       * req.body = {
       *   settings: {
       *     ...
       *   }
       * }
       */

      return res.json({ status: 'updated settings' })
    },
  },
})

module.exports = new NotificationsController()
