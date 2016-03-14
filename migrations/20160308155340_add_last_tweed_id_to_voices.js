
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Voices', function(t) {
      t.string('last_tweet_id').defaultTo(null);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Voices', function (t) {
      t.dropColumn('last_tweet_id');
    })
  ]);
};
