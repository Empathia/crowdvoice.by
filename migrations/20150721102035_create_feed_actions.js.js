
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('FeedActions', function (t) {
      t.increments('id').primary();
      t.integer('item_id').index();
      t.string('item_type').index();
      t.integer('action_doer').index(); // entity ID
      t.string('action');
      t.integer('follower_id').index();
      t.boolean('read');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('FeedActions')
  ]);
};
