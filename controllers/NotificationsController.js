'use strict'

var NotificationsPresenter = require(__dirname + '/../presenters/NotificationsPresenter.js')

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

        Notification.find({
          follower_id: hashids.decode(req.currentPerson.id)[0],
          read: false,
        }, function (err, notifications) {
          if (err) { return next(err) }

          NotificationsPresenter.build(notifications, req.currentPerson, function (err, presentedNotifications) {
            if (err) { return next(err) }

            res.json(presentedNotifications)
          })
        })
      })
    },

    markAsRead: function (req, res, next) {
      /* DELETE
       * req.body = {
       *   notificationId: Hashids.encode result,
       * }
       */

      ACL.isAllowed('markAsRead', 'entities', req.role, {
        currentEntity: req.entity,
        currentPerson: req.currentPerson,
      }, function (err, response) {
        if (err) { return next(err) }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'))
        }

        Notification.find({ id: hashids.decode(req.body.notificationId)[0] }, function (err, notification) {
          if (err) { return next(err) }

          var notif = new Notification(action[0])
          notif.read = true
          notif.save(function (err) {
            if (err) { return next(err) }

            return res.json({ status: 'ok' })
          })
        })
      })
    },

    markAllAsRead: function (req, res, next) {
      /* DELETE
       * req.body = {}
       */

      ACL.isAllowed('markAllAsRead', 'entities', req.role, {
        currentEntity: req.entity,
        currentPerson: req.currentPerson,
      }, function (err, response) {
        if (err) { return next(err) }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'))
        }

        Notification.find({
          follower_id: response.follower.id,
          read: false,
        }, function (err, notifications) {
          if (err) { return next(err) }

          async.each(notifications, function (notification, next) {
            notification.read = true
            notification.save(next)
          }, function (err) {
            if (err) { return next(err) }

            return res.json({ status: 'ok' })
          })
        })
      })
    },

    updateNotificationSettings: function (req, res, next) {
      /* PUT
       * req.body = {
       *   webSettings: {
       *     ...
       *   },
       *   emailSettings: {
       *     ...
       *   },
       * }
       */

      ACL.isAllowed('updateNotificationSettings', 'entities', req.role, {
        entity: req.entity,
        currentPerson: req.currentPerson,
      }, function (err, response) {
        if (err) { return next(err) }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'))
        }

        Entity.find({ profile_name: req.entity.profileName }, function (err, entity) {
          if (err) { return next(err) }

          NotificationSetting.find({ entity_id: entity[0].id }, function (err, setting) {
            if (err) { return next(err) }

            var newSetting = new NotificationSetting(setting[0])
            newSetting.webSettings = _.extend(setting[0].webSettings, req.body.webSettings)
            newSetting.emailSettings = _.extend(setting[0].emailSettings, req.body.emailSettings)

            newSetting.save(function (err) {
              if (err) { return next(err) }

              return res.json({ status: 'updated settings' })
            })
          })
        })
      })
    },
  },
})

module.exports = new NotificationsController()
