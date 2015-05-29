'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Slugs', function (t) {
      t.increments('id').primary();
      t.integer('voice_id').defaultTo(0);
      t.string('url', 512).defaultTo(null);
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Slugs')
  ]);
};
