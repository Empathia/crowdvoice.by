var BlackListFilter = require(__dirname + '/BlackListFilter');

var VotesController = Class('VotesController').includes(BlackListFilter)({
  prototype: {
    vote: function (req, res, next) {
      var entityId, upOrDown

      if (req.currentPerson) {
        if (req.currentPerson.isAnonymous) {
          entityId = 0
        } else {
          entityId = hashids.decode(req.currentPerson.id)[0]
        }
      } else {
        entityId = null
      }

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

      var vote = new Vote({
        value: upOrDown,
        postId: req.params.postId,
        entityId: entityId,
        ip: req.headers['x-real-ip'] || req.ip,
      })

      vote.save(function (err) {
        if (err) { return next(err) }
        res.json({ status: req.params.upOrDown + 'voted'})
      })
    },
  },
})

module.exports = new VotesController()
