var ReadablePost = Class('ReadablePost').inherits(Argon.KnexModel)({
  validations: {
    post_id: ['required'],
    data: ['required'],
    // readable: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'ReadablePosts',
  })),

  prototype: {
    post_id: null,
    data: null,
    // readable: null,
  },
})

module.exports = new ReadablePost()
