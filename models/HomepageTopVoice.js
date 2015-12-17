var HomepageTopVoice = Class('HomepageTopVoice').inherits(Argon.KnexModel)({
  validations: {
    voiceId: ['required'],
    videoPath: ['required'],
    sourceText: ['required'],
    sourceUrl: ['required'],
    posterPath: ['required'],
    description: [],
    active: ['required'],
  },

  storage: (new Argon.Storage.Knex({
    tableName: 'HomepageTopVoices',
  })),

  prototype: {
    voiceId: null,
    videoPath: null,
    sourceText: null,
    sourceUrl: null,
    posterPath: null,
    description: null,
    active: null,
  },
})

module.exports = new HomepageTopVoice()
