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
    // who did the action
    actionDoer: null,
    // string of action done, 'created', 'deleted' etc.
    action: null,
    // who is following it, defined by loop
    followerId: null,
    // read it or not? (for notifications)
    read: null,
  }
})

module.exports = new FeedAction()
