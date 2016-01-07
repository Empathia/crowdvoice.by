var EmailLink = Class('EmailLink').inherits(Argon.KnexModel)({

  validations: {
    emailUuid: ['required'],
    entityId: ['required'],
    uses: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'EmailLinks',
  })),

  prototype: {
    emailUuid: null,
    entityId: null,
    uses: null,
  },

})

module.exports = EmailLink
