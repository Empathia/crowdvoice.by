var dbLimit = 50 // how many posts we can ask for at a time

var DiscoverController = Class('DiscoverController')({
  prototype: {
    newVoices: function(req, res, next) {
      Voice.find(['status = ? ORDER BY created_at DESC LIMIT ?', [Voice.STATUS_PUBLISHED, dbLimit]], function (err, result) {
        if (err) { return next(err) }

        // TODO: answer HTML
        res.json(result)
      })
    },

    newPeople: function(req, res, next) {
      Entity.find(['type = ? AND NOT is_anonymous = ? ORDER BY created_at DESC LIMIT ?', ['person', 't', dbLimit]], function (err, result) {
        if (err) { return next(err) }

        // TODO: answer HTML
        res.json(result)
      })
    },

    newOrganizations: function(req, res, next) {
      Entity.find(['type = ? ORDER BY created_at DESC LIMIT ?', ['organization', dbLimit]], function (err, result) {
        if (err) { return next(err) }

        // TODO: answer HTML
        res.json(result)
      })
    },
  },
})

module.exports = new DiscoverController()
