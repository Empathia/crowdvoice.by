'use strict'

var NotificationSettingsController = Class('NotificationSettingsController').includes(BlackListFilter)({

  prototype: {

    deactivateEmailSetting: function (req, res, next) {
      /**
       * query string = {
       *   s = settingName (hashids),
       *   r = emailUuid,
       * }
       */

      ACL.isAllowed('deactivateEmailSetting', 'notificationSettings', req.role, {
        currentPerson: req.currentPerson,
        queryString: req.query,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError())
        }
      })
    },

  },

})

module.exports = new NotificationSettingsController()
