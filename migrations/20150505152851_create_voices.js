'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Voices', function(t) {
      t.increments('id').primary();
      t.string('title', 512).defaultTo(null);
      t.text('description').defaultTo(null);
      t.string('latitude').defaultTo(null);
      t.string('longitude').defaultTo(null);
      t.integer('ownerId').defaultTo(0);
      t.string('status').notNullable();
      t.string('type').notNullable();
      t.string('twitter_search', 512).defaultTo(null);
      t.dateTime('tweet_last_fetch_at').defaultTo(null);
      t.string('rss_url', 512).defaultTo(null);
      t.dateTime('rss_last_fetch_at').defaultTo(null);
      t.dateTime('first_post_date').defaultTo(null);
      t.dateTime('last_post_date').defaultTo(null);
      t.integer('post_count').defaultTo(0);
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Voices')
  ]);
};
