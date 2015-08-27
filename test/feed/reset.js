'use strict'

// this is very not ideal. any change in the migrations and I gotta change it here.

db.schema.dropTable('FeedActions')

db.schema.createTable('FeedActions', function (t) {
  t.increments('id').primary();
  t.string('item_type').index();
  t.integer('item_id').index();
  t.string('action').index();
  t.integer('who').index(); // entity ID
  t.timestamps();
})

db.schema.dropTable('Notifications')

db.schema.createTable('Notifications', function (t) {
  t.increments('id').primary();
  t.integer('action_id').index();
  t.integer('follower_id').index();
  t.boolean('read').index();
  t.timestamps();
})
