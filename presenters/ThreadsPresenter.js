var EntitiesPresenter = require('./EntitiesPresenter.js');

Module('ThreadsPresenter')({
  build : function build(req, threads, callback) {
    async.eachLimit(threads, 1, function(thread, next) {
      var threadInstance = new MessageThread(thread);

      var senderOrReceiver = threadInstance.isPersonSender(hashids.decode(req.currentPerson.id)[0]) ? 'Sender' : 'Receiver';

      thread.lastSeen     = thread['lastSeen' + senderOrReceiver]
      thread.messageCount = thread['messageCount' + senderOrReceiver];
      thread.hidden       = thread['hiddenFor' + senderOrReceiver];
      thread.id           = hashids.encode(thread.id);

      delete thread.lastSeenSender;
      delete thread.lastSeenReceiver;
      delete thread.messageCountSender;
      delete thread.messageCountReceiver;
      delete thread.hiddenForSender;
      delete thread.hiddenForReceiver;
      delete thread.eventListeners;

      async.series([function(done){
        if (hashids.decode(req.currentPerson.id)[0] !== thread.senderPersonId) {
          thread.senderPerson = null;
          delete thread.senderPersonId;
          return done();
        }

        Entity.find({id : thread.senderPersonId}, function(err, result) {
          if (err) {
            return done(err);
          }

          EntitiesPresenter.build(result, null, function(err, entities) {
            if (err) {
              return done(err);
            }

            thread.senderPerson = new Entity(entities[0]);
            done();
          });
        });
      }, function(done) {
        Entity.findById(thread.senderEntityId, function(err, result) {
          if (err) {
            return done(err);
          }

          EntitiesPresenter.build(result, null, function(err, entities) {
            if (err) {
              return done(err);
            }

            thread.senderEntity = new Entity(entities[0]);
            done();
          });
        })
      }, function(done) {
        Entity.findById(thread.receiverEntityId, function(err, result) {
          if (err) {
            return done(err);
          }

          EntitiesPresenter.build(result, null, function(err, entities) {
            if (err) {
              return done(err);
            }

            thread.receiverEntity = new Entity(entities[0]);

            done();
          });
        });
      }, function(done) {
        Message.find(['thread_id = ? ORDER BY created_at ASC', [threadInstance.id]], function(err, messages) {
          if (err) {
            return done(err);
          }
          var unreadCount = 0;

          async.eachLimit(messages, 1, function(message, nextMessage) {
            var messageInstance = new Message(message);

            var messageSenderOrReceiver;

            if (message.senderEntityId === hashids.decode(thread.senderEntity.id)[0]) {
              messageSenderOrReceiver = 'Sender'
            } else {
              messageSenderOrReceiver = 'Receiver'
            }

            if (messageSenderOrReceiver === 'Receiver') {
              if ((new Date(messageInstance.createdAt)) > (new Date(thread.lastSeen))) {
                unreadCount++;
              };
            }

            message.hidden = message['hiddenFor' + messageSenderOrReceiver];

            if (messageSenderOrReceiver === 'Sender') {
              message.senderEntity = thread.senderEntity;
            } else {
              message.senderEntity = thread.receiverEntity;
            }

            async.series([function(doneMessageInfo){
              if (!message.invitationRequestId) {
                return doneMessageInfo();
              }

              InvitationRequest.find({id : message.invitationRequestId}, function(err, result) {
                if (err) {
                  return doneMessageInfo();
                }

                if (result.length === 0) {
                  return doneMessageInfo();
                }

                message.invitationRequest = result[0];

                message.invitationRequest.id = hashids.encode(message.invitationRequest.id);
                message.invitationRequest.invitatorEntityId = hashids.encode(message.invitationRequest.invitatorEntityId)
                message.invitationRequest.invitedEntityId = hashids.encode(message.invitationRequest.invitedEntityId);

                doneMessageInfo();
              })
            }, function(doneMessageInfo) {
              if (!message.voiceId) {
                return doneMessageInfo();
              }

              Voice.find({id : message.voiceId}, function(err, result) {
                if (err) {
                  return doneMessageInfo(err);
                }

                result = result[0];

                result.ownerId = hashids.encode(result.ownerId);

                message.voice = result;

                Slug.find(["voice_id = ? ORDER BY created_at DESC", [result.id]], function(err, slug) {
                  if (err) {
                    return doneMessageInfo(err);
                  }

                  if (slug.length === 0) {
                    return doneMessageInfo(new NotFoundError('Voice Slug not found'));
                  }

                  delete message.voiceId;
                  message.voice.id = hashids.encode(message.voice.id);

                  message.voice.slug = slug[0].url;
                  doneMessageInfo();
                })
              })
            }, function(doneMessageInfo) {
              if (!message.organizationId) {
                return doneMessageInfo();
              }

              Entity.find({id : message.organizationId}, function(err, result) {
                if (err) {
                  return doneMessageInfo(err);
                }

                result = result[0];

                result.id = hashids.encode(result.id);
                message.organization = result;

                delete message.organizationId;

                doneMessageInfo();
              })
            }], function(err) {
              if (err) {
                return nextMessage(err)
              }

              message.threadId = hashids.encode(message.threadId);
              message.invitationRequestId = hashids.encode(message.invitationRequestId);

              delete message.senderPersonId;
              delete message.senderEntityId;
              delete message.receiverEntityId;
              delete message.hiddenForSender;
              delete message.hiddenForReceiver;
              delete message.eventListeners;

              message.id = hashids.encode(message.id);

              nextMessage();
            })

          }, function(err) {
            if (err) {
              return done(err)
            };
            thread.unreadCount = unreadCount;

            messages = messages.filter(function(message) {
              if (!message.hidden) {
                delete message.hidden;
                return message;
              }
            });

            thread.messages = messages;

            done();
          })
        });
      }], function(err) {
        next(err);
      })
    }, function(err) {
      threads =  threads.filter(function(thread) {
        if (!thread.hidden) {
          delete thread.hidden;
          return thread;
        }
      });

      // Order from newest updated to oldest
      threads = threads.sort(function(a,b){
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      });

      callback(err, threads);
    });
  }
});
