var dbLimit = 50

var DiscoverController = Class('DiscoverController')({
  prototype: {
    newVoices: function(req, res, next) {
      Voice.find(['status = ? ORDER BY created_at DESC LIMIT ?', [Voice.STATUS_PUBLISHED, dbLimit]], function (err, result) {
        if (err) { return next(err) }

        res.json(result)
      })
    },

    newPeople: function(req, res, next) {
      Entity.find({
        type: 'person'
      })
    },

    newOrganizations: function(req, res, next) {
      Entity.find({
        type: 'organization'
      })
    },
  },
})

module.exports = new DiscoverController()
