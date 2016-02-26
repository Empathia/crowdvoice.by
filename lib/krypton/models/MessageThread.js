/**
 * THIS MODEL IS NOT COMPLETE.  DO NOT USE IT TO CREATE RECORDS.  JUST USE IT
 * FOR FETCHING RELATIONS.
 *
 * NO TESTS HAVE BEEN WRITTEN EITHER.
 */

'use strict'

K.MessageThread = Class(K, 'MessageThread').inherits(Krypton.Model)({
  tableName: 'MessageThreads',

  attributes: [
    'id',
    'senderPersonId',
    'senderEntityId',
    'receiverEntityId',
    'hiddenForSender',
    'hiddenForReceiver',
    'lastSeenSender',
    'lastSeenReceiver',
    'messageCountSender',
    'messageCountReceiver',
    'createdAt',
    'updatedAt',
  ],

  validations: {
    senderPersonId: [
      'required',
      {
        rule: function (val) {
          return K.Entity.query()
            .where('id', val)
            .andWhere('is_anonymous', false)
            .then(function (resp) {
              if (resp.length < 1) {
                throw new Checkit.FieldError('This senderPersonId doesn\'t exist!')
              }
            })
        },
        message: 'This senderPersonId doesn\'t exist!'
      },
      {
        rule: function (val) {
          return K.Entity.query()
            .where('id', val)
            .then(function (resp) {
              if (respo[0].type !== 'person') {
                throw new Checkit.FieldError('The senderPerson is not of type person')
              }
            })
        },
        message: 'The senderPerson is not of type person'
      },
      {
        rule: function(val) {
          return K.User.query()
            .where('entity_id', val)
            .andWhere('deleted', true)
            .then(function (user) {
              if (user.length > 0) {
                throw new Checkit.FieldError('This senderPerson\'s user has been deactivated')
              }
            })
        }
      }
    ],

    senderEntityId: [
      'required',
      {
        rule: function(val) {
          return K.Entity.query()
            .where('id', val)
            .andWhere('is_anonymous', false)
            .then(function (resp) {
              if (resp.length === 0) {
                throw new Checkit.FieldError('This senderEntityId doesn\'t exist!')
              }
            })
        }
      },
      {
        rule: function(val) {
          var rule = this

          return K.Entity.query()
            .where('id', val)
            .then(function (senderEntity) {
              if (rule.target.senderEntityId && rule.target.senderPersonId) {
                senderEntity = senderEntity[0]

                if (senderEntity.type === 'person') {
                  if (senderEntity.id !== rule.target.senderPersonId) {
                    throw new Checkit.FieldError('senderEntity is not equal to senderPerson')
                  }
                }
              }
            })
        },
        message: 'senderEntity is not equal to senderPerson'
      },
      {
        rule: function (val) {
          return K.User.query()
            .where('entity_id', val)
            .andWhere('deleted', true)
            .then(function (user) {
              if (user.length > 0) {
                throw new Error('senderEntity user has been deactivated!')
              }
            })
        }
      },
      {
        rule: function (val) {
          var rule = this

          return K.Entity.query()
            .where('id', val)
            .then(function (senderEntity) {
              senderEntity = senderEntity[0]

              if (senderEntity.type !== 'person') {
                return K.Entity.query()
                  .where('id', rule.target.senderPersonId)
                  .then(function (senderPerson) {
                    senderPerson = senderPerson[0]

                    return K.EntityOwner.query()
                      .where('owner_id', senderPerson.id)
                      .andWhere('owned_id', senderEntity.id)
                      .then(function (owner) {
                        var isOwner = false

                        if (owner.length < 1) {
                          isOwner = true
                        }

                        if (!isOwner) {
                          throw new Checkit.FieldError('The sender Person is not owner of the sender Organization')
                        }
                      })
                  })
              }
            })
        },
        message: 'The sender Person is not owner of the sender Organization'
      }
    ],

    receiverEntityId: [
      'required',
      {
        rule: function (val) {
          return K.Entity.query()
            .where('id', val)
            .andWhere('is_anonymous', false)
            .then(function(receiverEntity) {
              if (receiverEntity.length < 1) {
                throw new Checkit.FieldError('receiverEntity doesn\'t exist!')
              }
            })
        }
      }
    ]
  },

  prototype: {
    hiddenForSender: false,
    hiddenForReceiver: false,
    messageCountSender: 0,
    messageCountReceiver: 0,

    // createMessage: function (params) {}
  }
})

module.exports = new K.MessageThread()
