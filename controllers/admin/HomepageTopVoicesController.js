Admin.HomepageTopVoicesController = Class(Admin, 'HomepageTopVoicesController')({

  prototype: {

    index: function (req, res, next) {
      ACL.isAllowed('index', 'admin.homepageTopVoice', req.role, {}, function (err, isAllowed) {
      })
    },

    show: function (req, res, next) {
      return next(new NotFoundError())
    },

    new: function (req, res, next) {
      return next(new NotFoundError())
    },

    create: function (req, res, next) {
      ACL.isAllowed('create', 'admin.homepageTopVoice', req.role, {}, function (err, isAllowed) {
      })
    },

    edit: function (req, res, next) {
      return next(new NotFoundError())
    },

    update: function (req, res, next) {
      ACL.isAllowed('update', 'admin.homepageTopVoice', req.role, {}, function (err, isAllowed) {
      })
    },

    destroy: function (req, res, next) {
      ACL.isAllowed('destroy', 'admin.homepageTopVoice', req.role, {}, function (err, isAllowed) {
      })
    },

  },

})

module.exports = new Admin.HomepageTopVoicesController()
