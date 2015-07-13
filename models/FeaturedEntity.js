var FeaturedVoice = Class('FeaturedEntity').inherits(Argon.KnexModel)({
  validations: {
    entityId: ['required'],
    position: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'FeaturedEntities',
  })),

  prototype: {
    entityId: null,
    position: null,
  },
})

module.exports = FeaturedVoice
