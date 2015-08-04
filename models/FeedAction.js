var FeedAction = Class('FeedAction').inherits(Argon.KnexModel)({
  validations: {
    itemType: ['required'],
    itemId: ['required'],
    action: ['required'],
    who: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'FeedActions'
  })),

  prototype: {
    // type of action, so we can find it with ID
    itemType: null,
    // ID of action
    itemId: null,
    // string of action done, 'created', 'deleted' etc.
    action: null,
    // who did the action (usually currentPerson)
    who: null,
  },
})

module.exports = new FeedAction()
