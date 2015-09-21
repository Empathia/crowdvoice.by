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

        Notification.find({
          follower_id: hashids.decode(req.currentPerson.id)[0],
          read: false,
        }, function (err, notifications) {
          if (err) { return next(err) }

          var actionIds = notifications.map(function (val) { return val.actionId })

          db('FeedActions')
            .whereIn('id', actionIds)
            .exec(function (err, result) {
              if (err) { return next(err) }

              var actions = Argon.Storage.Knex.processors[0](result)

              FeedPresenter.build(actions, req.currentPerson, function (err, presentedNotifications) {
                if (err) { return next(err) }

                res.json(presentedNotifications)
              })
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

    markAllAsRead: function (req, res, next) {
      FeedAction.find({  })
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
