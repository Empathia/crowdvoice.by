var Vote = Class('Vote').inherits(Argon.KnexModel)({
  validations: {
    value: ['required'],
    postId: ['required'],
    entityId: ['required'],
    ip: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'Votes',
  })),

  prototype: {
    value: null,
    postId: null,
    entityId: null,
    ip: null,
  },
})

module.exports = new Vote()
