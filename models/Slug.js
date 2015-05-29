var Slug = Class('Slug').inherits(Argon.KnexModel)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'Slugs'
  })),

  prototype : {
    voice : function voice (done) {
      Voice.find({id: this.voiceId}, function (err, voices) {
        if (voices.length === 0) { done(new Error('Orphan Slug')); }
        done(null, voices[0]);
      });
    }
  }
});

module.exports = Slug;
