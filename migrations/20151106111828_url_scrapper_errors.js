
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('UrlScrapperErrors', function (t) {
      t.increments('id').primary();
      t.string('url').index();
      t.json('error');
      t.string('error_stack');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('UrlScrapperErrors')
  ]);
};
