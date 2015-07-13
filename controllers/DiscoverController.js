var dbLimit = 50 // how many posts we can ask for at a time

var findTrending = function (resultFromKnex, name) {
  var amounts = {}, // what we're returning
    result = []

  // get all the voice IDs
  var followed = resultFromKnex.map(function (val) {
    return val[name]
  })

  // find out how many times each number repeats
  followed.forEach(function (followedId) {
    if (amounts[followedId]) {
      amounts[followedId] += 1
    } else {
      amounts[followedId] = 1
    }
  })

  // convert to array
  for (var followedId in followed) {
    result.push({ id: followedId, followersCount: followed[followedId] })
  }

  // sort
  result.sort(function (a, b) {
    return b - a
  })

  return result.slice(0, dbLimit - 1)
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

        var trendingVoiceIds = findTrending(result, 'voiceId').map(function (val) {
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
      // TODO: Use Knex (db) directly for performance reasons
      Entity.find(['type = ? LIMIT ?', ['person', dbLimit]], function (err, result) {
        if (err) { return next(err) }

        var people = result.map(function (val) {
          return val.id
        })

        EntityFollower.whereIn('followed_id', people, function (err, result) {
          var trendingPeopleIds = findTrending(result, 'followedId').map(function (val) {
            return val.id
          })

          Entity.whereIn('id', trendingPeopleIds, function (err, result) {
            if (err) { return next(err) }

            VoicesPresenter.build(result, req.currentPerson, function (err, result) {
              if (err) { return next(err) }

              res.format({
                html: function () {
                  res.locals.people = result
                  req.people = result
                  res.render('discover/trending/people')
                },
                json: function () {
                  res.json(result)
                },
              })
            })
          })
        })
      })
    },

    trendingOrganizations: function (req, res, next) {
      //
    },
  },
})

module.exports = new DiscoverController()
