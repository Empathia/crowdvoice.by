Admin.FeaturedPeopleController = Class(Admin, 'FeaturedPeopleController')({

  prototype: {

    // get all featured people
    index: function (req, res, next) {
      ACL.isAllowed('index', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        FeaturedPeople.all(function (err, result) {
          if (err) { return next(err) }

          EntitiesPresenter.build(result, req.currentPerson, function (err, entities) {
            if (err) { return next(err) }

            res.locals.featuredPeople = entities

            res.render('admin/featuredPeople/index.html', { layout: 'admin' })
          })
        })
      })
    },

    // get featured person by :entityId
    show: function (req, res, next) {
      ACL.isAllowed('show', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        Entity.findById(hashids.decode(req.params.entityId)[0], function (err, result) {
          if (err) { return next(err) }

          EntitiesPresenter.build(result, req.currentPerson, function (err, entities) {
            if (err) { return next(err) }

            res.locals.person = entities[0]

            res.render('admin/featuredPeople/show.html', { layout: 'admin' })
          })
        })
      })
    },

    new: function (req, res, next) {
      ACL.isAllowed('new', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

    create: function (req, res, next) {
      ACL.isAllowed('create', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

    edit: function (req, res, next) {
      ACL.isAllowed('edit', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

    update: function (req, res, next) {
      ACL.isAllowed('update', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

    destroy: function (req, res, next) {
      ACL.isAllowed('destroy', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

  },

})

module.exports = new Admin.FeaturedPeopleController()
