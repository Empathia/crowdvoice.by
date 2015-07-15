var dbLimit = 50 // how many posts we can ask for at a time

// counts up how many times it finds a number (ID according to
// `name`) so that we can tell which are trending.
var findTrending = function (resultFromKnex, name) {
  var amounts = {},
    result = []

  // get all the IDs
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
  for (var followedId in amounts) {
    result.push({
      id: followedId,
      followersCount: amounts[followedId]
    })
  }

  // sort
  result.sort(function (a, b) {
    return b.followersCount - a.followersCount
  })

  return result.slice(0, dbLimit - 1)
}

var DiscoverController = Class('DiscoverController')({
  prototype: {
    newIndex: function (req, res, next) {
      res.render('discover/new')
    },

    newVoices: function(req, res, next) {
      async.waterfall([
        function (callback) {
          Voice.find(['status = ? ORDER BY created_at DESC LIMIT ?', [Voice.STATUS_PUBLISHED, dbLimit]],
            callback)
        },

        function (voices, callback) {
          VoicesPresenter.build(voices, req.currentPerson, callback)
        },
      ], function (err, result) {
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
    },

    newPeople: function(req, res, next) {
      async.waterfall([
        function (callback) {
          Entity.find(['type = ? AND is_anonymous = ? ORDER BY created_at DESC LIMIT ?', ['person', false, dbLimit]],
            callback)
        },

        function (people, callback) {
          EntitiesPresenter.build(people, req.currentPerson, callback)
        },
      ], function (err, result) {
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
    },

    newOrganizations: function(req, res, next) {
      async.waterfall([
        function (callback) {
          Entity.find(['type = ? ORDER BY created_at DESC LIMIT ?', ['organization', dbLimit]],
            callback)
        },

        function (orgs, callback) {
          EntitiesPresenter.build(orgs, req.currentPerson, callback)
        },
      ], function (err, result) {
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
    },

    trendingIndex : function(req, res, next){
      res.render('discover/trending');
    },

    trendingVoices: function (req, res, next) {
      async.waterfall([
        function (callback) {
          VoiceFollower.all(callback)
        },

        function (allVoices, callback) {
          var trendingVoiceIds = findTrending(allVoices, 'voiceId').map(function (val) {
            return val.id
          })
          Voice.whereIn('id', trendingVoiceIds, callback)
        },

        function (trendingVoices, callback) {
          VoicesPresenter.build(trendingVoices, req.currentPerson, callback)
        },
      ], function (err, result) {
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
    },

    trendingPeople: function (req, res, next) {
      async.waterfall([
        function (callback) {
          Entity.find(['type = ? AND is_anonymous = ? LIMIT ?', ['person', false, dbLimit]],
            callback)
        },

        function (allPeople, callback) {
          var allPeopleIds = allPeople.map(function (val) {
            return val.id
          })
          EntityFollower.whereIn('followed_id', allPeopleIds, callback)
        },

        function (followedIds, callback) {
          var trendingPeopleIds = findTrending(followedIds, 'followedId').map(function (val) {
            return val.id
          })
          Entity.whereIn('id', trendingPeopleIds, callback)
        },

        function (trendingPeople, callback) {
          EntitiesPresenter.build(trendingPeople, req.currentPerson, callback)
        },
      ], function (err, result) {
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
    },

    trendingOrganizations: function (req, res, next) {
      async.waterfall([
        function (callback) {
          Entity.find(['type = ? LIMIT ?', ['organization', dbLimit]], callback)
        },

        function (allOrgs, callback) {
          var orgsIds = allOrgs.map(function (val) {
            return val.id
          })
          EntityFollower.whereIn('followed_id', orgsIds, callback)
        },

        function (followedIds, callback) {
          var trendingOrgsIds = findTrending(followedIds, 'followedId').map(function (val) {
            return val.id
          })
          Entity.whereIn('id', trendingOrgsIds, callback)
        },

        function (trendingOrgs, callback) {
          EntitiesPresenter.build(trendingOrgs, req.currentPerson, callback)
        },
      ], function (err, result) {
        if (err) { return next(err) }

        res.format({
          html: function () {
            res.locals.organizations = result
            req.organizations = result
            res.render('discover/trending/organizations')
          },
          json: function () {
            res.json(result)
          },
        })
      })
    },

    recommendedIndex: function (req, res, next) {
      res.render('discover/recommended')
    },

    updatedVoices: function (req, res, next) {
      async.waterfall([
        function (callback) {
          Voice.all(callback)
        },

        function (allVoices, callback) {
          var voicesIds = allVoices.map(function (val) {
            return val.id
          })
          Post.whereIn('voice_id', voicesIds, callback)
        },

        function (posts, callback) {
          var mostVoices = findTrending(posts, 'voice_id').map(function (val) {
            return val.id
          })
          Voice.whereIn('id', mostVoices, callback)
        },

        function (voices, callback) {
          VoicesPresenter.build(voices, req.currentPerson, callback)
        }
      ], function (err, result) {
        if (err) { return next(err) }

        res.format({
          html: function () {
            res.locals.updatedVoices = result
            req.updatedVoices = result
            res.render('discover/trending/updatedVoices')
          },
          json: function () {
            res.json(result)
          },
        })
      })
    },
  },
})

module.exports = new DiscoverController()
