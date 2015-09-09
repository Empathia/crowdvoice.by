Admin.FeaturedPeopleController = Class(Admin, 'FeaturedPeopleController')({

  featuredPeoplePresenter: function (featuredPeopleIdsArray, currentPerson, callback) {
    var featuredPeopleResult = [],
      toAddToArray

    async.eachLimit(featuredPeopleIdsArray, 1, function (entityId, next) {
      FeaturedPerson.find({ entity_id: hashids.decode(entityId)[0] }, function (err, featuredPerson) {
        if (err) { return next(err) }

        toAddToArray = {} // reset

        toAddToArray = featuredPerson[0]
        toAddToArray.id = hashids.encode(toAddToArray.id)
        toAddToArray.entityId = hashids.encode(toAddToArray.entityId)

        EntitiesPresenter.build([featuredPerson[0].id], currentPerson, function (err, presented) {
          if (err) { return next(err) }

          toAddtoArray.entity = presented[0]

          featuredPeopleResult.push(toAddToArray)

          return next()
        })
      })
    }, function (err) {
      if (err) { return callback(err) }

      return callback(null, featuredPeopleResult)
    })
  },

  prototype: {

    // GET /admin/featuredPeople/:entityId*
    // get entity and populate req.featuredPerson and res.locals.featuredPerson
    getEntity: function (req, res, next) {
      Admin.FeaturedPeopleController.featuredPeoplePresenter([req.params.entityId], req.currentPerson, function (err, presented) {
        req.featuredPerson = presented[0]
        res.locals.featuredPerson = presented[0]

        return res.render('admin/featuredPeople/show.html', { layout: 'admin' })
      })
    },

    // GET /admin/featuredPeople
    // get all featured people and render index view
    index: function (req, res, next) {
      ACL.isAllowed('index', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        FeaturedPeople.all(function (err, result) {
          if (err) { return next(err) }

          Admin.FeaturedPeopleController.featuredPeoplePresenter(result, req.currentPerson, function (err, presented) {
            if (err) { return next(err) }

            res.locals.featuredPeople = presented

            return res.render('admin/featuredPeople/index.html', { layout: 'admin' })
          })
        })
      })
    },

    // GET /admin/featuredPeople/:entityId
    // render view for viewing a featured person
    show: function (req, res, next) {
      ACL.isAllowed('show', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featuredPeople/show.html', { layout: 'admin' })
      })
    },

    // GET /admin/featuredPeople/new
    // render view for new entity
    new: function (req, res, next) {
      ACL.isAllowed('new', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featuredPeople/new.html', { layout: 'admin' })
      })
    },

    // POST /admin/featuredPeople/new
    // create new featured entity from input
    create: function (req, res, next) {
      /*
       * req.body = {
       *   entityId: Hashids.encode result,
       * }
       */

      // TODO: check entityId doesn't already exist

      ACL.isAllowed('create', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        var featured = new FeaturedPerson({
          entityId: hashids.decode(req.body.entityId)[0],
          position: 0,
        })

        featured.save(function (err) {
          if (err) { return next(err) }

          // frontend should redirect to /admin/featuredPeople/:entityId (req.body.entityId)
          res.json({ status: 'created' })
        })
      })
    },

    // GET /admin/featuredPeople/:entityId/edit
    // render view for editing entity
    edit: function (req, res, next) {
      ACL.isAllowed('edit', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featuredPeople/edit.html', { layout: 'admin' })
      })
    },

    // PUT /admin/featuredPeople/:entityId/edit
    // update entity from input
    update: function (req, res, next) {
      /*
       * req.body = {
       *   newEntityId: Hashids.encode result,
       * }
       */

      // TODO: check newEntityId doesn't already exist

      ACL.isAllowed('update', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        FeaturedEntity.findById(hashids.decode(req.featuredPerson.id)[0], function (err, entity) {
          var featured = new FeaturedEntity(entity[0])

          featured.entityId = hashids.decode(req.body.newEntityId)[0]

          featured.save(function (err) {
            if (err) { return next(err) }

            res.json({ status: 'updated' })
          })
        })
      })
    },

    // DELETE /admin/featuredPeople/:entityId
    // delete req.featuredPerson entity
    destroy: function (req, res, next) {
      /*
       * req.body = {}
       */

      ACL.isAllowed('destroy', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        FeaturedEntity.findById(hashids.decode(req.featuredPerson.id)[0], function (err, entity) {
          var featured = new FeaturedEntity(entity[0])

          featured.destroy(function (err) {
            if (err) { return next(err) }

            res.json({ status: 'deleted' })
          })
        })
      })
    },

    // POST /admin/featuredPeople/updatePositions
    // update the positions of all the entities with input
    updatePositions: function (req, res, next) {
      /*
       * req.body = {
       *   entityIds: [
       *     Hashids.encode result,
       *     Hashids.encode result,
       *     ...
       *   ]
       * }
       */

      ACL.isAllowed('updatePositions', 'admin.featuredPeople', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        var realIds = req.body.entityIds.map(function (id) {
          return hashids.decode(id)[0]
        })

        db('FeaturedPeople')
          .whereIn('id', realIds)
          .exec(function (err, result) {
            if (err) { return next(err) }

            var featuredPeople = Argon.Storage.Knex.processors[0](result),
              featuredPerson

            async.async(featuredPeople, function (val, next) {
              featuredPerson = FeaturedPerson(val)
              featuredPerson.position = realIds.indexOf(val)

              featuredPerson.save(next)
            }, function (err) {
              if (err) { return next(err) }

              return res.json({ status: 'updated positions' })
            })
          })
      })
    },

  },

})

module.exports = new Admin.FeaturedPeopleController()
