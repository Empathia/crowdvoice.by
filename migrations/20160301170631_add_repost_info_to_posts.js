
exports.up = function(knex, Promise) {
  return knex.schema.table('Posts', function (table) {
    table.json('repost_info');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Posts', function (table) {
    table.dropColumn('repost_info');
  });
};
