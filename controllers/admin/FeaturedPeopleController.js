Admin.FeaturedPeopleController = Class(Admin, 'FeaturedPeopleController')({

  prototype: {

    // GET
    // get entity and populate req.featuredPerson and res.locals.featuredPerson
    getEntity: function (req, res, next) {
      Entity.findById(hashids.decode(req.params.entityId)[0], function (err, result) {
        if (err) { return next(err) }

        req.featuredPerson = result[0]

        EntitiesPresenter.build(result, req.currentPerson, function (err, entities) {
          if (err) { return next(err) }

          res.locals.featuredPerson = entities[0]

          res.render('admin/featuredPeople/show.html', { layout: 'admin' })

          return next()
        })
      })
    },

    // GET
    // get all featured people and render index view
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

    // GET
    // render view for viewing a featured person
    show: function (req, res, next) {
      ACL.isAllowed('show', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        res.render('admin/featuredPeople/show.html', { layout: 'admin' })
      })
    },

    // GET
    // render view for new entity
    new: function (req, res, next) {
      ACL.isAllowed('new', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

    // POST
    // create new entity from input
    create: function (req, res, next) {
      ACL.isAllowed('create', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

    // GET
    // render view for editing entity
    edit: function (req, res, next) {
      ACL.isAllowed('edit', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

    // POST
    // update entity from input
    update: function (req, res, next) {
      ACL.isAllowed('update', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }
      })
    },

    // DELETE
    // delete req.featuredPerson entity
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
