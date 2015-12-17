var ffmpeg = require('fluent-ffmpeg')

Admin.HomepageTopVoicesController = Class(Admin, 'HomepageTopVoicesController')({

  prototype: {

    // GET /admin/topVoices
    index: function (req, res, next) {
      ACL.isAllowed('index', 'admin.homepageTopVoice', req.role, {
        currentPerson: req.currentPerson,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new NotFoundError())
        }

        return res.render('admin/topVoices/index.html', { layout: 'admin' })
      })
    },

    show: function (req, res, next) {
      return next(new NotFoundError())
    },

    new: function (req, res, next) {
      return next(new NotFoundError())
    },

    // POST /admin/topVoices
    create: function (req, res, next) {
      /** POST
       * req.body = {}
       * req.files = {
       *  video,
       * }
       */

      ACL.isAllowed('create', 'admin.homepageTopVoice', req.role, {
        currentPerson: req.currentPerson,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new NotFoundError())
        }

        var command = new ffmpeg()
      })
    },

    edit: function (req, res, next) {
      return next(new NotFoundError())
    },

    // PUT /admin/topVoices/:voiceId
    update: function (req, res, next) {
      ACL.isAllowed('update', 'admin.homepageTopVoice', req.role, {
        currentPerson: req.currentPerson,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new NotFoundError())
        }
      })
    },

    // DELETE /admin/topVoices/:voiceId
    destroy: function (req, res, next) {
      ACL.isAllowed('destroy', 'admin.homepageTopVoice', req.role, {
        currentPerson: req.currentPerson,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new NotFoundError())
        }
      })
    },

  },

})

module.exports = new Admin.HomepageTopVoicesController()
