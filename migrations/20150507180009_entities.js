'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Entities', function (t) {
      t.increments('id').primary();

      t.string('type', 32).defaultTo("person");
      t.string('name', 512).defaultTo(null);
      t.string('lastname', 512).defaultTo(null);
      t.string('profile_name', 512).defaultTo(null);
      t.boolean('is_anonymous').defaultTo(false);

      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Entities')
  ]);
};
