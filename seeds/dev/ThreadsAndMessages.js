
exports.seed = function(knex, Promise) {
  return Promise.join(

    knex('MessageThreads').del(),
    knex('Messages').del(),
    knex('InvitationRequest').del(),

    // Message Threads
    //
    // Between Jack and John
    //
    knex('MessageThreads').insert({
      'id' : 1,
      'sender_person_id'       : 1,
      'sender_entity_id'       : 1,
      'receiver_entity_id'     : 3,
      'hidden_for_sender'      : false,
      'hidden_for_receiver'    : false,
      'last_seen_sender'       : null,
      'last_seen_receiver'     : null,
      'message_count_sender'   : 6,
      'message_count_receiver' : 6,
      'created_at' : new Date(Date.now()),
      'updated_at' : new Date(Date.now())
    }),
    // Messages of thread 1
    //
    // Between Jack and John

    // Jack
    knex('Messages').insert({
      'id'                    : 1,
      'type'                  : 'message',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 3,
      'thread_id'             : 1,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : 'Que pedo John, como estas?',
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(),
      'updated_at'            : new Date()
    }),

    // John
    knex('Messages').insert({
      'id'                    : 2,
      'type'                  : 'message',
      'sender_person_id'      : 3,
      'sender_entity_id'      : 3,
      'receiver_entity_id'    : 1,
      'thread_id'             : 1,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : 'Que pedo Jack, bien y tu?',
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(),
      'updated_at'            : new Date()
    }),

    // Jack
    knex('Messages').insert({
      'id'                    : 3,
      'type'                  : 'message',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 3,
      'thread_id'             : 1,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : 'Pues aqui haciendo un sistema de mensajes, como esta todo por alla?',
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(),
      'updated_at'            : new Date()
    }),

    // John
    knex('Messages').insert({
      'id'                    : 4,
      'type'                  : 'message',
      'sender_person_id'      : 3,
      'sender_entity_id'      : 3,
      'receiver_entity_id'    : 1,
      'thread_id'             : 1,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : 'Ohh y como vas?, aqui todo bien...',
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(),
      'updated_at'            : new Date()
    }),

    // Jack
    knex('Messages').insert({
      'id'                    : 5,
      'type'                  : 'message',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 3,
      'thread_id'             : 1,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : 'Atrazado 1 semana =/?',
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(),
      'updated_at'            : new Date()
    }),

    // Jack
    knex('Messages').insert({
      'id'                    : 6,
      'type'                  : 'message',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 3,
      'thread_id'             : 1,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : 'Diseño cambio los mockups y hubo que volver a hacer la arquitectura, pero ahi va quedando.',
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(),
      'updated_at'            : new Date()
    }),

    knex('InvitationRequest').insert({
      'id'                  : 1,
      'invitator_entity_id' : 1,
      'invited_entity_id'   : 3,
      'created_at'          : new Date(),
      'updated_at'          : new Date()
    }),

    // Jack
    knex('Messages').insert({
      'id'                    : 15,
      'type'                  : 'invitation_voice',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 3,
      'thread_id'             : 1,
      'invitation_request_id' : 1,
      'voice_id'              : 1,
      'organization_id'       : null,
      'message'               : 'Oye John, te invito a contribuir a mi voice',
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(),
      'updated_at'            : new Date()
    }),

    knex('InvitationRequest').insert({
      'id'                  : 2,
      'invitator_entity_id' : 1,
      'invited_entity_id'   : 3,
      'created_at'          : new Date(),
      'updated_at'          : new Date()
    }),

    // Jack
    knex('Messages').insert({
      'id'                    : 16,
      'type'                  : 'invitation_organization',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 3,
      'thread_id'             : 1,
      'invitation_request_id' : 2,
      'voice_id'              : null,
      'organization_id'       : 9,
      'message'               : 'Tambien te invito a ser miembro de mi organizacion',
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(),
      'updated_at'            : new Date()
    }),
    // Message Threads
    //
    // Between Jack and Peter
    //
    knex('MessageThreads').insert({
      'id' : 2,
      'sender_person_id'       : 1,
      'sender_entity_id'       : 1,
      'receiver_entity_id'     : 5,
      'hidden_for_sender'      : false,
      'hidden_for_receiver'    : false,
      'last_seen_sender'       : null,
      'last_seen_receiver'     : null,
      'message_count_sender'   : 3,
      'message_count_receiver' : 3,
      'created_at' : new Date(Date.now() - 1000),
      'updated_at' : new Date(Date.now() - 1000)
    }),

    // Jack
    knex('Messages').insert({
      'id'                    : 7,
      'type'                  : 'message',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 5,
      'thread_id'             : 2,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : "Sup Peter, I've heard Brian is dead.",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 1000),
      'updated_at'            : new Date(Date.now() - 1000)
    }),

    // Peter
    knex('Messages').insert({
      'id'                    : 8,
      'type'                  : 'message',
      'sender_person_id'      : 5,
      'sender_entity_id'      : 5,
      'receiver_entity_id'    : 1,
      'thread_id'             : 2,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : "man!!! fucking car accident =/",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 1000),
      'updated_at'            : new Date(Date.now() - 1000)
    }),

    // Peter
    knex('Messages').insert({
      'id'                    : 9,
      'type'                  : 'message',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 5,
      'thread_id'             : 2,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : "Poor dog.",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 1000),
      'updated_at'            : new Date(Date.now() - 1000)
    }),

    // Peter
    knex('Messages').insert({
      'id'                    : 17,
      'type'                  : 'request_voice',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 5,
      'thread_id'             : 2,
      'invitation_request_id' : null,
      'voice_id'              : 1,
      'organization_id'       : null,
      'message'               : "I want to become contributor of your voice because...",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 1000),
      'updated_at'            : new Date(Date.now() - 1000)
    }),

    // Peter
    knex('Messages').insert({
      'id'                    : 18,
      'type'                  : 'request_organization',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 5,
      'thread_id'             : 2,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : 9,
      'message'               : "And also I wish to becombe member of your organization, because...",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 1000),
      'updated_at'            : new Date(Date.now() - 1000)
    }),


    // Message Threads
    //
    // Between Jack and Steve
    //
    knex('MessageThreads').insert({
      'id' : 3,
      'sender_person_id'       : 1,
      'sender_entity_id'       : 1,
      'receiver_entity_id'     : 7,
      'hidden_for_sender'      : false,
      'hidden_for_receiver'    : false,
      'last_seen_sender'       : null,
      'last_seen_receiver'     : null,
      'message_count_sender'   : 3,
      'message_count_receiver' : 3,
      'created_at' : new Date(Date.now() - 2000),
      'updated_at' : new Date(Date.now() - 2000)
    }),

    // Jack
    knex('Messages').insert({
      'id'                    : 10,
      'type'                  : 'message',
      'sender_person_id'      : 1,
      'sender_entity_id'      : 1,
      'receiver_entity_id'    : 7,
      'thread_id'             : 3,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : "Hey Steve!",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 2000),
      'updated_at'            : new Date(Date.now() - 2000)
    }),

    // Steve
    knex('Messages').insert({
      'id'                    : 11,
      'type'                  : 'message',
      'sender_person_id'      : 7,
      'sender_entity_id'      : 7,
      'receiver_entity_id'    : 1,
      'thread_id'             : 3,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : "Did you hear about Peter's dog?",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 2000),
      'updated_at'            : new Date(Date.now() - 2000)
    }),

    // Steve
    knex('Messages').insert({
      'id'                    : 12,
      'type'                  : 'message',
      'sender_person_id'      : 7,
      'sender_entity_id'      : 7,
      'receiver_entity_id'    : 1,
      'thread_id'             : 3,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : "Jack!!!",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 2000),
      'updated_at'            : new Date(Date.now() - 2000)
    }),
    // Message Threads
    //
    // Between John and Peter
    //
    knex('MessageThreads').insert({
      'id' : 4,
      'sender_person_id'       : 3,
      'sender_entity_id'       : 3,
      'receiver_entity_id'     : 5,
      'hidden_for_sender'      : false,
      'hidden_for_receiver'    : false,
      'last_seen_sender'       : null,
      'last_seen_receiver'     : null,
      'message_count_sender'   : 2,
      'message_count_receiver' : 2,
      'created_at' : new Date(Date.now() - 3000),
      'updated_at' : new Date(Date.now() - 3000)
    }),

    // Jack
    knex('Messages').insert({
      'id'                    : 13,
      'type'                  : 'message',
      'sender_person_id'      : 3,
      'sender_entity_id'      : 3,
      'receiver_entity_id'    : 5,
      'thread_id'             : 4,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : "Sorry about your dog man!",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 3000),
      'updated_at'            : new Date(Date.now() - 3000)
    }),

    // Steve
    knex('Messages').insert({
      'id'                    : 14,
      'type'                  : 'message',
      'sender_person_id'      : 5,
      'sender_entity_id'      : 5,
      'receiver_entity_id'    : 3,
      'thread_id'             : 4,
      'invitation_request_id' : null,
      'voice_id'              : null,
      'organization_id'       : null,
      'message'               : "Don't worry, Stewie has a time machine and will fix everything :)",
      'hidden_for_sender'     : false,
      'hidden_for_receiver'   : false,
      'created_at'            : new Date(Date.now() - 3000),
      'updated_at'            : new Date(Date.now() - 3000)
    }),

    knex.raw('SELECT setval(\'"Messages_id_seq"\'::regclass, 15);'),
    knex.raw('SELECT setval(\'"MessageThreads_id_seq"\'::regclass, 5);')
  );
};
