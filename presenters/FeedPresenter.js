'use strict'

var EntitiesPresenter = require('./EntitiesPresenter.js')
var VoicesPresenter = require('./VoicesPresenter.js')

var FeedPresenter = Module('FeedPresenter')({
  build: function (feedActions, currentPerson, forNotifications, callback) {
    var result = []

    var realCurrentPerson

    async.series([
      // safety if currentPerson.isAnonymous is true
      function (next) {
        var person = new Entity(currentPerson)
        person.id = hashids.decode(person.id)[0]

        person.owner(function (err, result) {
          if (err) { return next(err) }

          if (currentPerson.isAnonymous) {
            realCurrentPerson = new Entity(result)
          } else {
            realCurrentPerson = new Entity(person)
          }

          return next();
        })
      },

      // check if it's for notifications
      // if it is then we'll replace feedActions (which is what the presenter
      // works on) with a new feedActions that only has actions the user hasn't
      // read
      function (next) {
        if (forNotifications) {
          Notification.find({
            follower_id: realCurrentPerson.id,
            read: false,
          }, function (err, notifications) {
            if (err) { return next(err) }

            var actionIds = notifications.map(function (val) { return val.actionId })

            FeedAction.whereIn('id', actionIds, function (err, actions) {
              if (err) { return next(err) }

              feedActions = actions

              return next()
            })
          })
        } else {
          return next()
        }
      },
    ], function (err) {
      if (err) { return callback(err) }

      async.eachLimit(feedActions, 1, function (action, next) {
        var actionInst = new FeedAction(action)

        async.series([
          // feed action ID
          function (next) {
            actionInst.id = hashids.encode(action.id)[0]

            return next()
          },

          // itemType
          function (next) {
            if (action.itemType === 'voice') {
              Voice.findById(action.itemId, function (err, voice) {
                if (err) { return next(err) }

                VoicesPresenter.build(voice, currentPerson, function (err, presentedVoice) {
                  if (err) { return next(err) }

                  actionInst.voice = presentedVoice[0]

                  return next()
                })
              })
            } else if (action.itemType === 'entity') {
              Entity.findById(action.itemId, function (err, entity) {
                if (err) { return next(err) }

                EntitiesPresenter.build(entity, currentPerson, function (err, presentedEntity) {
                  if (err) { return next(err) }

                  actionInst.entity = presentedEntity[0]

                  return next()
                })
              })
            }
          },

          // itemId
          function (next) {
            actionInst.itemId = hashids.encode(action.itemId)[0]

            return next()
          },

          // actionDoer
          function (next) {
            Entity.findById(action.who, function (err, entity) {
              if (err) { return next(err) }

              EntitiesPresenter.build(entity, currentPerson, function (err, presentedEntity) {
                if (err) { return next(err) }

                // it is `actionDoer` and not `who` because the frontend already
                // implemented functionality for this using `actionDoer`
                actionInst.actionDoer = presentedEntity[0]

                return next()
              })
            })
          },
        ], function (err) {
          if (err) { return callback(err) }

          result.push(actionInst)

          return next()
        })
      }, function (err) {
        if (err) { return callback(err) }

        return callback(null, result)
      })
    })
  },
})

module.exports = FeedPresenter
