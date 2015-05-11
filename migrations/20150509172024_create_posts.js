'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Posts', function(t) {
      t.increments('id').primary();
      t.boolean('approved').index();
      t.string('image', 512);
      t.integer('image_width');
      t.integer('image_height');
      t.string('source_type').index();
      t.string('source_url', 512);
      t.string('source_service').index();
      t.string('title');
      t.text('description');
      t.integer('voice_id');
      t.dateTime('published_at');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Posts')
  ]);
};
