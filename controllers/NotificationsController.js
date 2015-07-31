'use strict'

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

          FeedPresenter.build(notifications, req.currentPerson, function (err, presentedNotifications) {
            if (err) { return next(err) }

            res.json(presentedNotifications)
          })
        })
      })
    },

    markAsRead: function (req, res, next) {},
  },
})

module.exports = new NotificationsController()
