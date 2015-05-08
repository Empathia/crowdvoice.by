'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('VoiceFollowers', function (t) {
      t.integer('entity_id').defaultTo(0);
      t.integer('voice_id').defaultTo(0);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('VoiceFollowers')
  ]);
};
