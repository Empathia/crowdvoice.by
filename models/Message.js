var Message = Class('Message').inherits(Argon.KnexModel)({

  validations : {
    type : [
      'required',
      {
        rule :function(val) {
          if (!val.match(/(message|request_(voice|organization)|invitation_(voice|organization))/)) {
            throw new Checkit.FieldError("Message type is invalid")
          }
        },
        message : "Message type is invalid"
      }
    ],

    threadId : [
      'required',
      {
        rule : function(val) {
          return db('MessageThreads').where({id : val}).then(function(thread){
            if (thread.length === 0) {
              throw new Checkit.FieldError("Thread doesn't exists")
            }
          })
        },
        message : "Thread doesn't exists"
      },
      {
        rule : function(val) {
          var rule = this;

          return db('MessageThreads').where({id : val}).then(function(thread) {
            if (thread.length === 0) {
              throw new Checkit.FieldError("Thread doesn't exists")
            }

            thread = thread[0];

            var isSenderThreadParticipant   = (thread['sender_person_id']   === rule.target.senderPersonId) || (thread['sender_person_id'] === rule.target.receiverEntityId) ? true : false;
            var isReceiverThreadParticipant = (thread['receiver_entity_id'] === rule.target.senderPersonId) || (thread['receiver_entity_id'] === rule.target.receiverEntityId) ? true : false;

            if (!isSenderThreadParticipant || !isReceiverThreadParticipant) {
              throw new Checkit.FieldError("Message participants are not part of the thread")
            }
          });
        },
        message : "Message participants are not part of the thread"
      }
    ],

    senderPersonId : [
      'required',
      {
        rule : function(val) {
          return db('Entities').where({id : val}).then(function(senderPerson) {
            if (senderPerson.length === 0) {
              throw new Checkit.FieldError("senderPerson doesn't exist")
            }
          })
        },

        message : "senderPerson doesn't exist"
      },
      {
        rule : function(val) {
          return db('Entities').where({id : val}).then(function(senderPerson) {
            if (senderPerson.length === 0) {
              throw new Checkit.FieldError("senderPerson doesn't exist")
            }

            senderPerson =  senderPerson[0];

            if (senderPerson.type !== 'person') {
              throw new Checkit.FieldError("senderPerson is not of type person");
            }
          })
        },

        message : "senderPerson is not of type person"
      },
      {
        rule : function(val) {
          return db('Users').where({'entity_id' : val}).then(function(senderUser) {
            if (senderUser.length === 0) {
              throw new Checkit.FieldError("senderPerson user doesn't exist")
            }

            senderUser = senderUser[0];

            if (senderUser.deleted) {
              throw new Checkit.FieldError("senderPerson's user has been deleted")
            }
          })
        },

        message : "senderPerson's user has been deleted"
      }
    ],

    senderEntityId : [
      'required',
      {
        rule : function(val) {
          return db('Entities').where({id : val}).then(function(senderEntity) {
            if (senderEntity.length === 0) {
              throw new Checkit.FieldError("senderEntity doesn't exist")
            }
          })
        },
        message : "senderEntity doesn't exist"
      },
      {
        rule : function(val) {
          return db('Entities').where({id : val}).then(function(senderEntity) {
            if (senderEntity.length === 0) {
              throw new Checkit.FieldError("senderEntity doesn't exist")
            }

            senderEntity = senderEntity[0];

            if (senderEntity.type === 'person') {
              return db('Users').where({'entity_id' : val}).then(function(senderEntityUser) {
                if (senderEntityUser.length === 0) {
                  throw new Checkit.FieldError("senderEntity's user doesn't exist")
                }
                senderEntityUser = senderEntityUser[0];

                if (senderEntityUser.deleted) {
                  throw new Checkit.FieldError("senderEntity's user has been deleted")
                }
              })
            }
          })
        },
        message : "senderEntity's user has been deleted"
      },
      {
        rule : function(val) {
          var rule = this;

          return db('Entities').where({id : val}).then(function(senderEntity) {

            if (senderEntity.length === 0) {
              throw new Checkit.FieldError("senderEntity doesn't exist")
            }

            senderEntity = senderEntity[0];

            if (senderEntity.type === 'person') {
              if (senderEntity.id !== rule.target.senderPersonId) {
                throw new Checkit.FieldError("senderEntity is of type person and is not = to senderPerson")
              }
            }
          });
        },
        message : "senderEntity is of type person and is not = to senderPerson"
      },
      {
        rule : function(val) {
          var rule = this;

          return db('Entities').where({id : val}).then(function(senderEntity) {

            if (senderEntity.length === 0) {
              throw new Checkit.FieldError("senderEntity doesn't exist")
            }

            senderEntity = senderEntity[0];

            if (senderEntity.type === 'organization') {
              return db('Entities').where({id : rule.target.senderPersonId}).then(function(senderPerson) {

                if (senderPerson.length === 0) {
                  throw new Checkit.FieldError("senderPerson doesn't exist")
                }

                senderPerson = senderPerson[0];

                return db('EntityOwner').where({'owner_id' : senderPerson.id, 'owned_id' : senderEntity.id}).then(function(owner) {
                  return db('EntityMembership').where({'entity_id' : senderEntity.id, 'member_id' : senderPerson.id}).then(function(member) {
                    var isOwner  = false;
                    var isMember = false;

                    if (owner.length !== 0) {
                      isOwner = true;
                    }

                    if (member.length !== 0) {
                      isMember = true;
                    }

                    if (!isOwner && !isMember) {
                      throw new Checkit.FieldError("The sender Person is not owner or member of the sender Organization");
                    }
                  });

                });
              })
            }
          });
        },
        message : "The sender Person is not owner or member of the sender Organization"
      },
      {
        rule : function(val) {
          var rule = this;

          return db('Entities').where({id : val}).then(function(senderEntity) {

            if (senderEntity.length === 0) {
              throw new Checkit.FieldError("senderEntity doesn't exist")
            }

            senderEntity = senderEntity[0];

            if (senderEntity.type === 'organization') {
              return db('MessageThreads').where({id : rule.target.threadId}).then(function(thread) {
                if (senderEntity.id !== thread.senderEntityId) {
                  throw new Checkit.FieldError("senderEntity is an organization and is not the same as thread.senderEntity")
                }
              })
            }
          })
        },
        message : "senderEntity is an organization and is not the same as thread.senderEntity"
      }
    ],

    receiverEntityId : [
      'required',
      {
        rule : function(val) {
          return db('Entities').where({id : val}).then(function(receiverEntity) {
            if (receiverEntity.length === 0) {
              throw new Checkit.FieldError("receiverEntity doesn't exist")
            }
          })
        },
        message : "receiverEntity doesn't exist"
      },
      {
        rule : function(val) {
          return db('Entities').where({id : val}).then(function(receiverEntity) {

            if (receiverEntity.length === 0) {
              throw new Checkit.FieldError("receiverEntity doesn't exist")
            }

            receiverEntity = receiverEntity[0]

            if (receiverEntity.type === 'person') {
              return db('Users').where({'entity_id' : val}).then(function(receiverUser) {
                if (receiverUser.length === 0) {
                  throw new Checkit.FieldError("receiverEntity's user doesn't exist")
                }

                receiverUser = receiverUser[0];

                if (receiverUser.deleted) {
                  throw new Checkit.FieldError("receiverEntity's user has been deleted")
                }
              })
            }
          })

        },
        message : "receiverEntity's user has been deleted"
      },
      {
        rule : function(val) {
          return db('Entities').where({id : val}).then(function(receiverEntity) {

            if (receiverEntity.length === 0) {
              throw new Checkit.FieldError("receiverEntity doesn't exist")
            }

            receiverEntity = receiverEntity[0];

            if (receiverEntity.type !== 'person') {
              throw new Checkit.FieldError("receiverEntity can't be an organization")
            }
          })
        },
        message : "receiverEntity can't be an organization"
      }
    ],

    invitationRequestId : [
      {
        rule : function(val) {
          var rule = this;

          if (rule.target.type.match(/(invitation_(voice|organization))/)) {
            if (!val) {
              throw new Checkit.FieldError("invitationRequestId is requiered for message of type invitation_(voice|organization)")
            }
          }
        },
        message : "invitationRequestId is requiered for message of type invitation_(voice|organization)"
      },
      {
        rule : function(val) {
          var rule = this;

          return db('InvitationRequest').where({
            id : val,
            'invitator_entity_id' : rule.target.senderEntityId,
            'invited_entity_id' : rule.target.receiverEntityId
          }).then(function(invitationRequest) {
            if (invitationRequest.length === 0) {
              throw new Checkit.FieldError("invitationRequest doesn't exists")
            }
          })
        },
        message : "invitationRequest doesn't exists"
      }
    ],

    voiceId : [
      {
        rule : function(val) {
          var rule = this;

          if (rule.target.type.match(/((request|invitation)_voice)/)) {
            if (!val) {
              throw new Checkit.FieldError("voiceId is requiered for message of type (request|invitation)_voice")
            }
          }
        },
        message : "voiceId is requiered for messages of type (request|invitation)_voice"
      },
      {
        rule : function(val) {
          var rule = this;

          return db('Voices').where({id : val}).then(function(voice) {
            if (voice.length === 0) {
              throw new Checkit.FieldError("This message.voiceId doesn't exists")
            }
          })
        },
        message : "This message.voiceId doesn't exists"
      }
    ],

    organizationId : [
      {
        rule : function(val) {
          var rule = this;

          if (rule.target.type.match(/((request|invitation)_organization)/)) {
            if (!val) {
              throw new Checkit.FieldError("organizationId is required for mesagges of type (request|invitation)_organization")
            }
          }
        },
        message : "organizationId is required for mesagges of type (request|invitation)_organization"
      },
      {
        rule : function(val) {
          var rule = this;

          return db('Entities').where({id : val, type : 'organization'}).then(function(organization) {
            if (organization.length === 0) {
              throw new Checkit.FieldError("This message.organizationId doesn't exists")
            }
          })
        },
        message : "This message.organizationId doesn't exists"
      }
    ],

    message : [
      'required'
    ],
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'Messages'
  })),

  TYPE_MESSAGE                  : 'message',
  TYPE_REQUEST_VOICE            : 'request_voice',
  TYPE_REQUEST_ORGANIZATION     : 'request_organization',
  TYPE_INVITATION_VOICE         : 'invitation_voice',
  TYPE_INVITATION_ORGANIZATION  : 'invitation_organization',

  prototype : {
    type : 'message',
    senderPersonId : null,
    senderEntityId : null,
    receiverEntityId : null,
    threadId : null,
    invitationRequestId : null,
    voiceId : false,
    organizationId : false,
    message : null,
    hiddenForSender : false,
    hiddenForReceiver : false,

    isPersonSender : function isPersonSender(personId) {
      return personId === this.senderPersonId ? true : false;
    }
  }
});

module.exports = Message;
