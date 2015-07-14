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
      //
    },

    featuredOrganizations: function (req, res, next) {
      //
    },
  },
})

module.exports = new BrowseController()
