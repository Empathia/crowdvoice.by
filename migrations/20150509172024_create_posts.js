'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Posts', function(t) {
      t.increments('id').primary();
      t.integer('owner_id').index().notNullable();
      t.integer('voice_id').index().notNullable();
      t.boolean('approved').index();
      t.string('image', 1024);
      t.integer('image_height').defaultTo(0);
      t.integer('image_width').defaultTo(0);
      t.string('source_service').notNullable();
      t.string('source_type').notNullable();
      t.string('source_url', 1024).defaultTo(null);
      t.string('title', 512).defaultTo(null);
      t.text('description').defaultTo(null);
      t.dateTime('published_at').index();
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Posts')
  ]);
};
