var FeedAction = Class('FeedAction').inherits(Argon.KnexModel)({
  validations: {
    itemId: ['required'],
    itemType: ['required'],
    actionDoer: ['required'],
    action: ['required'],
    followerId: ['required'],
    read: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'FeedActions'
  })),

  prototype: {
    // ID of action
    itemId: null,
    // type of action, so we can find it with ID
    itemType: null,
    // who did the action (usually currentPerson)
    actionDoer: null,
    // string of action done, 'created', 'deleted' etc.
    action: null,
    // who is following it, defined by loop
    followerId: null,
    // read it or not? (for notifications)
    read: null,

    save: function (callback) {
      var model = this,
        date = new Date(),
        request

      this.isValid(function (isValid) {
        model.constructor.dispatch('beforeSave', { data: { model: model } })
        model.dispatch('beforeSave')

        if (isValid) {
          model.updatedAt = model.updatedAt || date

          // can we find a duplicate?
          FeedAction.find({
            item_id: model.itemId,
            item_type: model.itemType,
            action_doer: model.actionDoer,
            action: model.action,
          }, function (err, result) {
            if (err) { return callback(err) }

            // delete duplicates, if any
            async.each(result, function (val, next) {
              var action = new FeedAction(val)
              action.destroy(next)
            }, function (err) {
              if (err) { return callback(err) }

              // write new record
              model.createdAt = model.createdAt || date

              model.dispatch('beforeCreate')

              model.constructor.storage.create({
                action: 'create',
                data: model,
                model: model.constructor,
              }, function (err, data) {
                if (data) {
                  model.setProperty('id', data[0])
                }

                model.constructor.dispatch('afterSave', { data: { model: model } })
                model.dispatch('afterSave')
                model.dispatch('afterCreate')

                callback(err, data)
              })
            })
          })
        } else {
          return callback(model.errors)
        }
      })
    },
  }
})

module.exports = new FeedAction()
