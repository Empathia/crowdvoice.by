var NotificationSetting = Class('NotificationSetting').inherits(Argon.KnexModel)({
  validations: {
    entityId: ['required'],
    settings: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'NotificationSettings',
  })),

  prototype: {
    entityId: null,
    settings: null,
  },
})

module.exports = new NotificationSetting()
