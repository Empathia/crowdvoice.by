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
    itemId: null,
    itemType: null,
    actionDoer: null,
    action: null,
    followerId: null,
    read: null,
  }
})

module.exports = new FeedAction()
