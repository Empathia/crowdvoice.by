
exports.up = function(knex, Promise) {
  return knex.schema.table('Posts', function (table) {
    table.integer('repost_of_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Posts', function (table) {
    table.dropColumn('repost_of_id');
  });
};
