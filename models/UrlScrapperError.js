var UrlScrapperError = Class('UrlScrapperError').inherits(Argon.KnexModel)({

  validations: {
    url: ['required'],
    error: ['required'],
    errorStack: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'UrlScrapperErrors',
  })),

  prototype: {
    url: null,
    error: null,
    errorStack: null,
  },

})

module.exports = UrlScrapperError
