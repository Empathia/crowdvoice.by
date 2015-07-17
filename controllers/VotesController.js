var BlackListFilter = require(__dirname + '/BlackListFilter');

var canTheyVote = function () {

}

var VotesController = Class('VotesController').includes(BlackListFilter)({
  prototype: {
    vote: function (req, res, next) {
      var entityId,
        isLoggedIn = false,
        upOrDown,
        ip = req.headers['x-real-ip'] || req.ip

      var makeVote = function () {
        // create vote
        var vote = new Vote({
          value: upOrDown,
          postId: req.params.postId,
          entityId: entityId,
          ip: ip,
        })

        // put that vote in
        vote.save(function (err) {
          if (err) { return next(err) }

          res.json({ status: req.params.upOrDown + 'voted'})
        })
      }

      // define variables according to role
      switch (req.role) {
        case 'Visitor':
          entityId = null
          break
        case 'Anonymous':
          entityId = 0
          break
        case 'Person':
          entityId = hashids.decode(req.currentPerson.id)[0]
          isLoggedIn = true
          break
      }

      // figure out the action
      switch (req.params.upOrDown) {
        case 'up':
          upOrDown = +1
          break
        case 'down':
          upOrDown = -1
          break
        default:
          return next(new Error('Invalid vote operation'))
          break
      }

      // figure out if the user has went over his vote quota
      if (isLoggedIn) {
        // the user is logged in, if we find a vote from him for the post just
        // forbid the new vote
        Vote.find({ postId: req.params.postId, entityId: entityId }, function (err, result) {
          if (err) { return next(err) }

          if (result.length >= 1) {
            return next(new ForbiddenError())
          } else {
            makeVote()
          }
        })
      } else {
        // get the latest 3, find out if they're all in the same day
        Vote.find(['post_id = ? AND ip = ? ORDER BY created_at DESC LIMIT ?', [req.params.postId, ip, 3]], function (err, result) {
          if (err) { return next(err) }

          if (result.length > 2) {
            var then = moment(result[2].createdAt),
              now = new Date(),
              diff = then.diff(now, 'hours')

            if (diff < -24) {
              return next(new ForbiddenError())
            } else {
              makeVote()
            }
          }
        })
      }

    },
  },
})

module.exports = new VotesController()
