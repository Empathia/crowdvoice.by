
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Reports', function (t) {
      t.integer('message_id').index();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Reports', function (t) {
      t.dropColumn('message_id');
    })
  ]);
  knex.schema
};
