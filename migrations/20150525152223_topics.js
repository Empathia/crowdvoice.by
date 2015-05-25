'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Topics', function(t) {
      t.increments('id').primary();
      t.string('name', 512).unique().defaultTo(null);
      t.string('image', 512).index().unique();
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Topics')
  ]); 
};
