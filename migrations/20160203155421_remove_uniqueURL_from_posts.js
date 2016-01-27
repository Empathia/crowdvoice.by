
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Posts', function(t) {
      t.dropUnique('source_url');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Posts', function(t) {
      t.string('source_url', 1024).defaultTo(null).unique();
    })
  ]);
};
