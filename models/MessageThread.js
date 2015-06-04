var MessageThread = Class('MessageThread').inherits(Argon.KnexModel)({

  validations : {
    senderPersonId    : [
      'required',
      {
        rule: function (val) {
          return db('Entities').where('id', '=', val).then(function(resp) {
            if (resp.length === 0) throw new Checkit.FieldError("This senderPersonId doesn't exists!.")
         });
        },
        message: "This senderPersonId doesn't exists!."
      },
      {
        rule : function(val) {
          var rule = this;

          return db('Entities').where({'id' : val}).then(function(response) {
            if (response[0].type !== 'person') {
              throw new Checkit.FieldError('The senderPerson is not of type person');
            };
          })
        }
      },
      {
        rule : function(val) {
          var rule = this;

          return db('Users').where({'entity_id' : val}).then(function(user) {
            user = user[0];

            if (user.deleted) {
              throw new Checkit.FieldError("This senderPerson's user has been deactivated");
            }
          })
        }
      }
    ],

    senderEntityId    : ['required',
      {
        rule: function (val) {
          return db('Entities').where('id', '=', val).then(function(resp) {
            if (resp.length === 0) throw new Checkit.FieldError("This senderEntityId doesn't exists!.")
          });
        }
      },
      {
        rule: function(val) {
          var rule = this;

          return db('Entities').where({id : val}).then(function(senderEntity) {
            if (rule.target.senderEntityId && rule.target.senderPersonId) {

              var senderEntity = senderEntity[0];

              if (senderEntity.type === 'person') {
                if (senderEntity.id !== rule.target.senderPersonId) {
                  throw new Checkit.FieldError("senderEntity is not equal to senderPerson");
                }
              }
            }
          })
        },
        message: "senderEntity is not equal to senderPerson."
      },
      {
        rule : function(val) {
          var rule = this;

          db('Users').where({'entity_id' : val}).then(function(user) {
            user = user;

            if (user.deleted) {
              throw new Error('senderEntity user has been deactivated!')
            }
          })
        }
      },
      {
        rule: function (val) {
          var rule = this;

          return db('Entities').where({id : val}).then(function(senderEntity) {
            senderEntity = senderEntity[0];

            if (senderEntity.type !== 'person') {
              return db('Entities').where({id : rule.target.senderPersonId}).then(function(senderPerson) {
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
        message: "The sender Person is not owner or member of the sender Organization"
      }
    ],
    receiverEntityId  : [
      'required',
      {
        rule : function(val) {
          var rule = this;

          return db('Entities').where({id : val}).then(function(receiverEntity) {
            if (receiverEntity.length === 0) {
              throw new Checkit.FieldError("receiverEntity doesn't exists!")
            }
          })
        }
      },
      {
        rule : function(val) {
          var rule = this;

          return db('Entities').where({id : val}).then(function(receiverEntity) {
            if (receiverEntity[0].type === 'organization') {
              throw new Checkit.FieldError("receiverEntity is an organization!")
            }
          })
        }
      }
    ]
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'MessageThreads'
  })),

  findByPerson : function findByPerson(person, callback) {
    var Model, request;

    Model = this;

    request = {
      action : 'findByPerson',
      model : Model,
      params : ['WHERE sender_person_id = ? OR receiver_entity_id = ?', [hashids.decode(person.id)[0], hashids.decode(person.id)[0]]],
      clauseType : 'whereRaw'
    };

    this.dispatch('beforeFindByPerson');

    this.storage.find(request, function(err, data) {
      callback(err, data);
      Model.dispatch('afterFindByPerson');
    });
  },

  prototype : {
    senderPersonId : null,
    senderEntityId : null,
    receiverEntityId : null,
    hiddenForSender : false,
    hiddenForReceiver : false,
    lastSeenSender : null,
    lastSeenReceiver : null,
    messageCountSender : 0,
    messageCountReceiver : 0,

    init : function init(config) {
      Argon.KnexModel.prototype.init.call(this, config);

      var thread = this;

      this.bind('afterCreateMessage', function(data) {
        thread.messageCountSender++;
        thread.messageCountReceiver++;
        thread.save(function(err, data){
          logger.log('afterCreateMessage');
          logger.log('Thread ' + thread.id + ' updated');
          logger.log(thread);
        });
      });

      this.bind('afterDestroyMessage', function(data) {
        if (thread.isPersonSender(data.personId)) {
          thread.messageCountSender--;
        } else {
          thread.messageCountReceiver--;
        }

        thread.save(function(){
          logger.log('afterDestroyMessage');
          logger.log('Thread ' + thread.id + ' updated');
          logger.log(thread);
        });
      });
    },

    isPersonSender : function isPersonSender(personId) {
      return personId === this.senderPersonId ? true : false;
    },

    getMessageCount : function getMessageCount(personId) {
      var count = 0;

      if (this.isPersonSender(personId)) {
        count = this.messageCountSender;
      } else {
        count = this.messageCountReceiver;
      }

      return count;
    },

    isHidden : function isHidden(personId) {
      var hidden = false;

      if (this.isPersonSender(personId)) {
        hidden = this.hiddenForSender;
      } else {
        hidden = this.hiddenForReceiver;
      }

      return hidden;
    },

    isActive : function isActive(callback) {
      var thread = this;

      User.find({'entity_id': this.senderPersonId}, function(err, senderUser){
        if (err) {
          return callback(err, null);
        }

        User.find({'entity_id' : thread.receiverEntityId}, function(err, receiverUser) {
          if (err) {
            return callback(err, null);
          }

          var active = (!senderUser[0].deleted && !receiverUser[0].deleted);

          return callback(null, active)
        });
      });
    },

    /* Message Factory.
     * @method createMessage
     * @property params <Object>
     *  {
     *    senderPersonId,
     *    type : //
     *    invitationRequestId,
     *    voiceId,
     *    organizationId,
     *    message
     *  }
     * @return null
     */
    createMessage : function createMessage(params, callback) {
      if (!params || !(params instanceof Object)) {
        return callback('params is undefined!');
      }

      if (!this.id) {
        return callback("Can't create a message without a thread ID!");
      }

      params.threadId = this.id;

      if (this.isPersonSender(params.senderPersonId)) {
        params.senderEntityId = this.senderEntityId;
        params.receiverEntityId = this.receiverEntityId;
      } else {
        params.senderEntityId = this.receiverEntityId;
        params.receiverEntityId = this.senderEntityId;
      }

      var message = new Message(params);

      message.save(function(err, result) {
        callback(err, message);
      });
    },

    /* Has Many Messages Relationship
    */
    messages : function messages(whereClause, callback) {
      if (!this.id) {
        return callback(null, []);
      }

      whereClause = whereClause || {};

      whereClause['thread_id'] = this.id;

      Messages.find(whereClause, callback);
    }
  }
});

module.exports = MessageThread;
