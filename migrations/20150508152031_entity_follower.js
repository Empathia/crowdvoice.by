'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('EntityFollower', function (t) {
      t.increments('id').primary();

      t.integer('follower_id').defaultTo(0);
      t.integer('followed_id').defaultTo(0);

      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('EntityFollower')
  ]);
};
