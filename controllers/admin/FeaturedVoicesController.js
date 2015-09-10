Admin.FeaturedVoicesController = Class(Admin, 'FeaturedVoicesController')({

  presenter: function (featuredVoicesIdsArray, currentPerson, callback) {
    var featuredVoicesResult = [],
      toAddToArray

    async.eachLimit(featuredVoicesIdsArray, 1, function (voiceId, next) {
      FeaturedVoices.find({ voice_id: hashids.decode(voiceId)[0] }, function (err, featuredVoice) {
        if (err) { return next(err) }

        toAddToArray = {} // reset

        toAddToArray = featuredVoice[0]
        toAddToArray.id = hashids.encode(toAddToArray.id)
        toAddToArray.voiceId = hashids.encode(toAddToArray.voiceId)

        VoicesPresenter.build([featuredVoice[0].id], currentPerson, function (err, presented) {
          if (err) { return next(err) }

          toAddtoArray.entity = presented[0]

          featuredVoicesResult.push(toAddToArray)

          return next()
        })
      })
    }, function (err) {
      if (err) { return callback(err) }

      return callback(null, featuredVoicesResult)
    })
  },

  prototype: {

    // GET /admin/featured/voices/:voiceId*
    // get entity and populate req.featuredVoice and res.locals.featuredVoice
    getVoice: function (req, res, next) {
      Admin.FeaturedEntitiesController.presenter([req.params.voiceId], req.currentPerson, function (err, presented) {
        req.featuredVoice = presented[0]
        res.locals.featuredVoice = presented[0]

        return res.render('admin/featured/voices/show.html', { layout: 'admin' })
      })
    },

    // GET /admin/featured/voices
    // get all featured people and render index view
    index: function (req, res, next) {
      ACL.isAllowed('index', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        FeaturedPeople.all(function (err, result) {
          if (err) { return next(err) }

          Admin.FeaturedVoicesController.presenter(result, req.currentPerson, function (err, presented) {
            if (err) { return next(err) }

            res.locals.featuredEntities = presented

            return res.render('admin/featured/voices/index.html', { layout: 'admin' })
          })
        })
      })
    },

    // GET /admin/featured/voices/:voiceId
    // render view for viewing a featured person
    show: function (req, res, next) {
      ACL.isAllowed('show', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featured/voices/show.html', { layout: 'admin' })
      })
    },

    // GET /admin/featured/voices/new
    // render view for new entity
    new: function (req, res, next) {
      ACL.isAllowed('new', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featured/voices/new.html', { layout: 'admin' })
      })
    },

    // POST /admin/featured/voices/new
    // create new featured entity from input
    create: function (req, res, next) {
      /*
       * req.body = {
       *   voiceId: Hashids.encode result,
       * }
       */

      ACL.isAllowed('create', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        var featured = new FeaturedPerson({
          voiceId: hashids.decode(req.body.voiceId)[0],
          position: 0,
        })

        featured.save(function (err) {
          if (err) { return next(err) }

          // frontend should redirect to /admin/featured/voices/:voiceId (req.body.voiceId)
          return res.json({ status: 'created' })
        })
      })
    },

    // GET /admin/featured/voices/:voiceId/edit
    // render view for editing entity
    edit: function (req, res, next) {
      ACL.isAllowed('edit', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        return res.render('admin/featured/voices/edit.html', { layout: 'admin' })
      })
    },

    // PUT /admin/featured/voices/:voiceId/edit
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

        FeaturedVoice.findById(hashids.decode(req.featuredVoice.id)[0], function (err, entity) {
          var featured = new FeaturedEntity(entity[0])

          featured.voiceId = hashids.decode(req.body.newEntityId)[0]

          featured.save(function (err) {
            if (err) { return next(err) }

            return res.json({ status: 'updated' })
          })
        })
      })
    },

    // DELETE /admin/featured/voices/:voiceId
    // delete req.featuredVoice entity
    destroy: function (req, res, next) {
      /*
       * req.body = {}
       */

      ACL.isAllowed('destroy', 'admin.featuredEntities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new ForbiddenError('not an admin'))
        }

        FeaturedVoice.findById(hashids.decode(req.featuredVoice.id)[0], function (err, entity) {
          var featured = new FeaturedEntity(entity[0])

          featured.destroy(function (err) {
            if (err) { return next(err) }

            return res.json({ status: 'deleted' })
          })
        })
      })
    },

    // POST /admin/featured/voices/updatePositions
    // update the positions of all the entities with input
    updatePositions: function (req, res, next) {
      /*
       * req.body = {
       *   voiceIds: [
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

        var realIds = req.body.voiceIds.map(function (id) {
          return hashids.decode(id)[0]
        })

        db('FeaturedVoices')
          .whereIn('voice_id', realIds)
          .exec(function (err, result) {
            if (err) { return next(err) }

            var featuredVoices = Argon.Storage.Knex.processors[0](result),
              featuredVoice

            async.async(featuredVoices, function (val, next) {
              featuredVoice = new FeaturedVoice(val)
              featuredVoice.position = realIds.indexOf(val)

              featuredVoice.save(next)
            }, function (err) {
              if (err) { return next(err) }

              return res.json({ status: 'updated positions' })
            })
          })
      })
    },

  },

})

module.exports = new Admin.FeaturedVoicesController()
