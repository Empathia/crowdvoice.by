var dbLimit = 50 // how many posts we can ask for at a time

var findTrending = function (resultFromKnex) {
  var amounts = {}, // what we're returning
    result = []

  // get all the voice IDs
  var followedVoices = resultFromKnex.map(function (val) {
    return val.voiceId
  })

  // find out how many times each number repeats
  followedVoices.forEach(function (voiceId) {
    if (amounts[voiceId]) {
      amounts[voiceId] += 1
    } else {
      amounts[voiceId] = 1
    }
  })

  // convert to array
  for (var voiceId in followedVoices) {
    result.push({ id: voiceId, followersCount: followedVoices[voiceId] })
  }

  // sort
  result.sort(function (a, b) {
    return b - a
  })

  return result
}

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
      VoiceFollower.all(function (err, result) {
        if (err) { return next(err) }

        var trendingVoiceIds = findTrending(result).map(function (val) {
          return val.id
        })

        Voice.whereIn('id', trendingVoiceIds, function (err, result) {
          if (err) { return next(err) }

          VoicesPresenter.build(result, req.currentPerson, function (err, result) {
            if (err) { return next(err) }

            res.format({
              html: function () {
                res.locals.voices = result
                req.voices = result
                res.render('discover/trending/voices')
              },
              json: function () {
                res.json(result)
              },
            })
          })
        })
      })
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
