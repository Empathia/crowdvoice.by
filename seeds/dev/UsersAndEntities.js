var Hashids  = require('hashids');
var hashids  = new Hashids(12345678, 12);

exports.seed = function(knex, Promise) {
  return Promise.join(

    knex('Users').del(),
    knex('Entities').del(),
    knex('EntityOwner').del(),

    knex('Users').insert({
      id: 1,
      username: 'jack',
      email : 'jack@test.com',
      'encrypted_password' : '$2a$10$C/CHyuMOxT4i/byo6haLcu06duVduNWHtMvWfMQUP/1OHKDPW/nS6', // 12345678
      deleted : false,
      'entity_id' : 1,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Person entity for user.id 1
    knex('Entities').insert({
      id : 1,
      'type' : 'person',
      'name' : 'Jack',
      'lastname' : 'Johnson',
      'profile_name' : 'jack_johnson',
      'is_anonymous' : false,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Shadow entity for user.id 1
    knex('Entities').insert({
      id : 2,
      'type' : 'person',
      'name' : 'Anonymous',
      'lastname' : '',
      'profile_name' : 'anonymous_' + hashids.encode(1),
      'is_anonymous' : true,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    knex('EntityOwner').insert({
      id : 1,
      'owner_id' : 1,
      'owned_id' : 2,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Organization entity for user.id 1
    knex('Entities').insert({
      id : 9,
      'type' : 'organization',
      'name' : 'The Johnsons',
      'lastname' : '',
      'profile_name' : 'the_johnsons',
      'is_anonymous' : false,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    knex('EntityOwner').insert({
      id : 5,
      'owner_id' : 1,
      'owned_id' : 9,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),


    knex('Users').insert({
      id: 2,
      username: 'john',
      email : 'john@test.com',
      'encrypted_password' : '$2a$10$C/CHyuMOxT4i/byo6haLcu06duVduNWHtMvWfMQUP/1OHKDPW/nS6', // 12345678
      deleted : false,
      'entity_id' : 3,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Person entity for user.id 2
    knex('Entities').insert({
      id : 3,
      'type' : 'person',
      'name' : 'John',
      'lastname' : 'Jackson',
      'profile_name' : 'john_jackson',
      'is_anonymous' : false,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Shadow entity for user.id 1
    knex('Entities').insert({
      id : 4,
      'type' : 'person',
      'name' : 'Anonymous',
      'lastname' : '',
      'profile_name' : 'anonymous_' + hashids.encode(2),
      'is_anonymous' : true,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    knex('EntityOwner').insert({
      id : 2,
      'owner_id' : 3,
      'owned_id' : 4,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),


    // User 3
    knex('Users').insert({
      id: 3,
      username: 'peter',
      email : 'peter@test.com',
      'encrypted_password' : '$2a$10$C/CHyuMOxT4i/byo6haLcu06duVduNWHtMvWfMQUP/1OHKDPW/nS6', // 12345678
      deleted : false,
      'entity_id' : 5,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Person entity for user.id 2
    knex('Entities').insert({
      id : 5,
      'type' : 'person',
      'name' : 'Peter',
      'lastname' : 'Jackson',
      'profile_name' : 'peter_jackson',
      'is_anonymous' : false,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Shadow entity for user.id 1
    knex('Entities').insert({
      id : 6,
      'type' : 'person',
      'name' : 'Anonymous',
      'lastname' : '',
      'profile_name' : 'anonymous_' + hashids.encode(3),
      'is_anonymous' : true,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    knex('EntityOwner').insert({
      id : 3,
      'owner_id' : 5,
      'owned_id' : 6,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // User 4
    knex('Users').insert({
      id: 4,
      username: 'steve',
      email : 'steve@test.com',
      'encrypted_password' : '$2a$10$C/CHyuMOxT4i/byo6haLcu06duVduNWHtMvWfMQUP/1OHKDPW/nS6', // 12345678
      deleted : false,
      'entity_id' : 7,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Person entity for user.id 2
    knex('Entities').insert({
      id : 7,
      'type' : 'person',
      'name' : 'Steve',
      'lastname' : 'Stevenson',
      'profile_name' : 'steve_stevenson',
      'is_anonymous' : false,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    // Shadow entity for user.id 1
    knex('Entities').insert({
      id : 8,
      'type' : 'person',
      'name' : 'Anonymous',
      'lastname' : '',
      'profile_name' : 'anonymous_' + hashids.encode(4),
      'is_anonymous' : true,
      'created_at' : new Date(),
      'updated_at' : new Date()
    }),

    knex('EntityOwner').insert({
      id : 4,
      'owner_id' : 7,
      'owned_id' : 8,
      'created_at' : new Date(),
      'updated_at' : new Date()
    })
  );
};
