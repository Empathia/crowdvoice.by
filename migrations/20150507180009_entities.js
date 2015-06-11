'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Entities', function (t) {
      t.increments('id').primary();

      t.string('type', 32).defaultTo("person").index();
      t.string('name', 512).defaultTo(null);
      t.string('lastname', 512).defaultTo(null);
      t.string('profile_name', 512).unique().defaultTo(null);
      t.boolean('is_anonymous').defaultTo(false);

      // Image attachment
      t.string('photo_base_url', 512).defaultTo('');

      t.index(['name', 'lastname', 'profile_name'], 'search_index');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Entities')
  ]);
};
