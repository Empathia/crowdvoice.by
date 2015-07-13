var dbLimit = 50 // how many posts we can ask for at a time

var DiscoverController = Class('DiscoverController')({
  prototype: {
    newVoices: function(req, res, next) {
      Voice.find(['status = ? ORDER BY created_at DESC LIMIT ?', [Voice.STATUS_PUBLISHED, dbLimit]], function (err, result) {
        if (err) { return next(err) }

        VoicesPresenter(result, req.currentPerson, function (err, result) {
          if (err) { return next(err) }

          res.format({
            html: function () {
              res.locals.voices = result
              req.voices = result
              res.render('discover/new/voices')
            },
            json: function () {
              res.json(result)
            },
          })
        })
      })
    },

    newPeople: function(req, res, next) {
      Entity.find(['type = ? AND NOT is_anonymous = ? ORDER BY created_at DESC LIMIT ?', ['person', true, dbLimit]], function (err, result) {
        if (err) { return next(err) }

        EntitiesPresenter.build(result, req.currentPerson, function (err, result) {
          if (err) { return next(err) }

          res.format({
            html: function () {
              res.locals.people = result
              req.people = result
              res.render('discover/new/people')
            },
            json: function () {
              res.json(result)
            },
          })
        })
      })
    },

    newOrganizations: function(req, res, next) {
      Entity.find(['type = ? ORDER BY created_at DESC LIMIT ?', ['organization', dbLimit]], function (err, result) {
        if (err) { return next(err) }

        EntitiesPresenter.build(result, req.currentPerson, function (err, result) {
          if (err) { return next(err) }

          res.format({
            html: function () {
              res.locals.organizations = result
              req.organizations = result
              res.render('discover/new/organizations')
            },
            json: function () {
              res.json(result)
            },
          })
        })
      })
    },

    trendingVoices: function (req, res, next) {
      //
    },

    trendingPeople: function (req, res, next) {
      //
    },

    trendingOrganizations: function (req, res, next) {
      //
    },
  },
})

module.exports = new DiscoverController()
