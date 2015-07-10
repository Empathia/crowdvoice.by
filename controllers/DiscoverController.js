var BlackListFilter = require(__dirname + '/BlackListFilter.js')

var dbLimit = 50

var DiscoverController = Class('DiscoverController').includes(BlackListFilter)({
  prototype: {
    newVoices: function (req, res, next) {
      Voice.find(['SELECT * FROM "Voices" ORDER BY created_at DESC LIMIT ?', dbLimit], function (err, result) {
        if (err) { return next(err) }

        res.json(result)
      })
    },

    newPeople: function (req, res, next) {
      Entity.find({
        type: 'person'
      })
    },

    newOrganizations: function (req, res, next) {
      Entity.find({
        type: 'organization'
      })
    },
  },
})

module.exports = new DiscoverController()
