var BrowseController = Class('BrowseController')({
  prototype: {
    featuredVoices: function (req, res, next) {
      FeaturedVoice.all(function (err, allFeaturedVoices) {
        if (err) { return next(err) }

        EntitiesPresenter.build(allFeaturedVoices, req.currentPerson, function (err, presenterVoices) {
          if (err) { return next(err) }

          res.format({
            html: function () {
              res.locals.featuredVoices = presenterVoices
              req.featuredVoices = presenterVoices
              res.render('browse/featured/voices')
            },
            json: function () {
              res.json(presenterVoices)
            },
          })
        })
      })
    },

    featuredPeople: function (req, res, next) {
      async.waterfall([
        function (callback) {
          FeaturedPerson.all(callback)
        },

        function (allFeaturedPeople, callback) {
          var featuredPeopleIds = allFeaturedPeople.map(function (val) {
            return val.entityId
          })
          Entity.whereIn('id', featuredPeopleIds, callback)
        },

        function (featuredPeopleEntities, callback) {
          EntitiesPresenter.build(featuredPeopleEntities, req.currentPerson, callback)
        },
      ], function (err, result) {
        if (err) { return next(err) }

        res.format({
          json: function () {
            res.json(result)
          },
        })
      })
    },

    featuredOrganizations: function (req, res, next) {
      FeaturedOrganization.all(function (err, allFeaturedOrgs) {
        if (err) { return next(err) }

        EntitiesPresenter.build(allFeaturedOrgs, req.currentPerson, function (err, presenterOrgs) {
          if (err) { return next(err) }

          res.format({
            html: function () {
              res.locals.featuredOrganizations = presenterOrgs
              req.featuredOrganizations = presenterOrgs
              res.render('browse/featured/organizations')
            },
            json: function () {
              res.json(presenterOrgs)
            },
          })
        })
      })
    },
  },
})

module.exports = new BrowseController()
