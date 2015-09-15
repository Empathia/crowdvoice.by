Admin.FeaturedEntitiesController = Class(Admin, 'FeaturedEntitiesController')({

  presenter: function (featuredEntitiesIdsArray, entityType, currentPerson, callback) {
    var featuredEntitiesResult = [],
      toAddToArray

    async.eachLimit(featuredEntitiesIdsArray, 1, function (entityId, next) {
      global['Featured' + inflection.capitalize(entityType)].find({ entity_id: hashids.decode(entityId)[0] }, function (err, featuredEntity) {
        if (err) { return next(err) }

        toAddToArray = {} // reset

        toAddToArray = featuredEntity[0]
        toAddToArray.id = hashids.encode(toAddToArray.id)
        toAddToArray.entityId = hashids.encode(toAddToArray.entityId)

        EntitiesPresenter.build([featuredEntity[0].entityId], currentPerson, function (err, presented) {
          if (err) { return next(err) }

          toAddtoArray.entity = presented[0]

          featuredEntitiesResult.push(toAddToArray)

          return next()
        })
      })
    }, function (err) {
      if (err) { return callback(err) }

      return callback(null, featuredEntitiesResult)
    })
  },

  prototype: {

    // GET /admin/featured/:entityType/:entityId*
    // get entity and populate req.featuredEntity and res.locals.featuredEntity
    getEntity: function (req, res, next) {
      Admin.FeaturedEntitiesController.presenter([req.params.entityId], req.currentPerson, req.params.entityType, function (err, presented) {
        if (err) { return next(err) }

        req.featuredEntity = presented[0]
        res.locals.featuredEntity = presented[0]

        return next()
      })
    },

    // GET /admin/featured/:entityType
    // get all featured people and render index view
    index: function (req, res, next) {
      ACL.isAllowed('index', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        FeaturedPeople.all(function (err, allFeatured) {
          if (err) { return next(err) }

          Admin.FeaturedEntitiesController.presenter(allFeatured, req.currentPerson, req.params.entityType, function (err, presented) {
            if (err) { return next(err) }

            res.locals.featuredEntities = presented

            return res.render('admin/featured/entities/index.html', { layout: 'admin' })
          })
        })
      })
    },

    // GET /admin/featured/:entityType/:entityId
    // render view for viewing a featured person
    show: function (req, res, next) {
      ACL.isAllowed('show', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featured/entities/show.html', { layout: 'admin' })
      })
    },

    // GET /admin/featured/:entityType/new
    // render view for new entity
    new: function (req, res, next) {
      ACL.isAllowed('new', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featured/entities/new.html', { layout: 'admin' })
      })
    },

    // POST /admin/featured/:entityType/new
    // create new featured entity from input
    create: function (req, res, next) {
      /*
       * req.body = {
       *   entityId: Hashids.encode result,
       * }
       */

      ACL.isAllowed('create', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        var featured = new FeaturedPerson({
          entityId: hashids.decode(req.body.entityId)[0],
          position: 0,
        })

        featured.save(function (err) {
          if (err) {
            res.locals.errors = err
            req.errors = err
            logger.log(err)
            logger.log(err.stack)
            return res.render('admin/featured/entities/new.html', { layout: 'admin' })
          }

          req.flash('success', 'Featured ' + req.entityType + ' created')
          return res.redirect('/admin/featured/' + req.params.entityType)
        })
      })
    },

    // GET /admin/featured/:entityType/:entityId/edit
    // render view for editing entity
    edit: function (req, res, next) {
      ACL.isAllowed('edit', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featured/entities/edit.html', { layout: 'admin' })
      })
    },

    // PUT /admin/featured/:entityType/:entityId/edit
    // update entity from input
    update: function (req, res, next) {
      /*
       * req.body = {
       *   newEntityId: Hashids.encode result,
       * }
       */

      ACL.isAllowed('update', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        global['Featured' + inflection.capitalize(req.params.entityType)].findById(hashids.decode(req.featuredEntity.id)[0], function (err, entity) {
          var featured = new FeaturedEntity(entity[0])

          featured.entityId = hashids.decode(req.body.newEntityId)[0]

          featured.save(function (err) {
            if (err) {
              res.locals.errors = err
              req.errors = err
              logger.log(err)
              logger.log(err.stack)
              return res.render('admin/featured/entities/edit.html', { layout: 'admin' })
            }

            req.flash('success', 'Featured ' + req.entityType + ' updated')
            return res.redirect('/admin/featured/' + req.params.entityType)
          })
        })
      })
    },

    // DELETE /admin/featured/:entityType/:entityId
    // delete req.featuredEntity entity
    destroy: function (req, res, next) {
      /*
       * req.body = {}
       */

      ACL.isAllowed('destroy', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        global['Featured' + inflection.capitalize(req.params.entityType)].findById(hashids.decode(req.featuredEntity.id)[0], function (err, entity) {
          var featured = new FeaturedEntity(entity[0])

          featured.destroy(function (err) {
            if (err) {
              res.locals.errors = err
              req.errors = err
              logger.log(err)
              logger.log(err.stack)
              return res.render('admin/featured/entities/index.html', { layout: 'admin' })
            }

            req.flash('success', 'Featured ' + req.entityType + ' deleted')
            return res.redirect('/admin/featured/' + req.params.entityType)
          })
        })
      })
    },

    // POST /admin/featured/:entityType/updatePositions
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

      ACL.isAllowed('updatePositions', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        var realIds = req.body.entityIds.map(function (id) {
          return hashids.decode(id)[0]
        })

        db('Featured' + inflection.capitalize(req.params.entityType))
          .whereIn('entity_id', realIds)
          .exec(function (err, result) {
            if (err) { return next(err) }

            var featuredEntities = Argon.Storage.Knex.processors[0](result),
              featuredEntity

            async.async(featuredEntities, function (val, next) {
              featuredEntity = new global['Featured' + inflection.capitalize(req.params.entityType)](val)
              featuredEntity.position = realIds.indexOf(val)

              featuredEntity.save(next)
            }, function (err) {
              if (err) { return next(err) }

              return res.json({ status: 'updated positions' })
            })
          })
      })
    },

    searchEntities: function (req, res, next) {
      return SearchController.prototype['search' + inflection.transform(req.params.entityType, ['capitalize', 'pluralize'])](req, res, next)
    },

  },

})

module.exports = new Admin.FeaturedEntitiesController()
