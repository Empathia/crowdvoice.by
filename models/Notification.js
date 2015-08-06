var Notification = Class('Notification').inherits(Argon.KnexModel)({
  validations: {
    actionId: ['required'],
    followerId: ['required'],
    read: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'Notifications'
  })),

  prototype: {
    // ID of action so we may make a relation
    actionId: null,
    // who is following
    followerId: null,
    // whether the followerId has read the notification or not
    read: null,
  },
})

module.exports = new Notification()
