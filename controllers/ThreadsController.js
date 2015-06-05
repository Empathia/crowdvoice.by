require('./../presenters/ThreadsPresenter');

var ThreadsController = Class('ThreadsController').includes(BlackListFilter)({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      return this;
    },

    index : function index(req, res, next) {
      MessageThread.find(['sender_person_id = ? OR receiver_entity_id = ?', [hashids.decode(req.currentPerson.id)[0], hashids.decode(req.currentPerson.id)[0]]], function(err, threads) {
        if (err) {
          return next(err);
        }

        ThreadsPresenter.build(req, threads, function(err, result) {
          if (err) {
            return next(err);
          }

          res.format({

            html : function() {

              return res.render('threads/index.html', {layout : 'application', threads : result});
            },
            json : function() {
              return res.json(result);
            }
          });

        });
      });
    },

    create : function create(req, res, next) {
      res.format({
        json : function() {
          var payload = req.body;

          payload.type = payload.type || 'message';

          // Decode HashIds data
          payload.senderEntityId = hashids.decode(payload.senderEntityId)[0];
          payload.receiverEntityId = hashids.decode(payload.receiverEntityId)[0];

          if (payload.invitationRequestId) {
            payload.invitationRequestId = hashids.decode(payload.invitationRequestId)[0];
          }

          if (payload.voiceId) {
            payload.voiceId = hashids.decode(payload.voiceId)[0];
          }

          if (payload.organizationId) {
            payload.organizationId = hashids.decode(payload.organizationId)[0];
          }

          async.waterfall([function(done) {
            // Get the entity to know if its a person or organization
            Entity.findById(payload.senderEntityId, function(err, senderEntity) {
              done(err, senderEntity[0].type);
            });
          }, function(senderEntityType, done) {
            // Build a query depending if entity is person or organization
            var whereClause;

            if (senderEntityType === 'organization') {
              whereClause = [
                'sender_person_id = ? AND sender_entity_id = ? AND receiver_entity_id = ?',
                [hashids.decode(req.currentPerson.id)[0], payload.senderEntityId, payload.receiverEntityId]
              ];
            } else {
              whereClause = [
                '(sender_entity_id = ? AND receiver_entity_id = ?) OR (sender_entity_id = ? AND receiver_entity_id = ?)',
                [payload.senderEntityId, payload.receiverEntityId, payload.receiverEntity, payload.senderEntityId]
              ];
            }

            // Try to get the MessageThread
            MessageThread.find(whereClause, done);
          }, function(messageThread, done) {
            var thread;

            if (messageThread.length === 0) {
              // If there is no existing MessageThread create a new one
              thread = new MessageThread({
                senderPersonId : hashids.decode(req.currentPerson.id)[0],
                senderEntityId : payload.senderEntityId,
                receiverEntityId : payload.receiverEntityId
              });
            } else {
              // Use the existing MessageThread
              thread = new MessageThread(messageThread[0]);
            }

            // Unhide the Thread for both users
            thread.hiddenForSender = false;
            thread.hiddenForReceiver = false;

            // Save the thread
            thread.save(function(err, result) {
              if (err) {
                return done(err);
              }

              // Append the new message
              thread.createMessage({
                senderPersonId : hashids.decode(req.currentPerson.id)[0],
                type : payload.type,
                invitationRequestId : payload.invitationRequestId,
                voiceId : payload.voiceId,
                organizationId : payload.organizationId,
                message : payload.message,
              }, function(err, result) {
                if (err) {
                  return done(err);
                }

                done(err, thread);
              })
            })
          }], function(err, thread) {
            // Build the result

            ThreadsPresenter.build(req, [thread], function(err, result) {
              if (err) {
                return next(err);
              }

              res.json(result[0]);
            });
          });
        }
      })
    },

    update : function update(req, res, next) {
      MessageThread.findById(hashids.decode(req.params.threadId)[0], function(err, thread) {
        if (err) {
          return next(err);
        }

        if (thread.length === 0) {
          return next(new NotFoundError('Thread Not Found'));
        }

        thread = new MessageThread(thread[0]);

        var senderOrReceiver = thread.isPersonSender(hashids.decode(req.currentPerson.id)[0]) ? 'Sender' : 'Receiver';

        thread['lastSeen' + senderOrReceiver] = new Date(Date.now());

        thread.save(function(err, result) {
          if (err) {
            return next(err);
          }

          res.json({status : 'ok', data : result});
        })
      })
    },

    destroy : function destroy(req, res, next) {
      return res.format({
        json : function() {
          var id = hashids.decode(req.params.threadId)[0];

          MessageThread.findById(id, function(err, thread) {
            if (err) {
              return next(err);
            }

            if (thread.length === 0) {
              return next(new NotFoundError('Thread Not Found'));
            }

            thread = thread[0];

            thread = new MessageThread(thread);

            var senderOrReceiver = thread.isPersonSender(hashids.decode(req.currentPerson.id)[0]) ? 'Sender' : 'Receiver';

            thread['hiddenFor' + senderOrReceiver] = true;

            thread.save(function(err, result) {
              if (err) {
                return next(err);
              }

              Message.find({'thread_id' : thread.id}, function(err, messages) {
                async.each(messages, function(message, done) {
                  message = new Message(message);

                  var senderOrReceiver = message.isPersonSender(hashids.decode(req.currentPerson.id)[0]) ? 'Sender' : 'Receiver';

                  message['hiddenFor' + senderOrReceiver] = true;

                  message.save(function(err, messageSaveResult) {
                    if (err) {
                      return done(err);
                    }

                    done();
                  });
                }, function(err) {
                  if (err) {
                    return next(err);
                  }

                  res.status(200).json({status : 'ok'});
                })
              })
            })
          })
        }
      });
    }
  }
});

module.exports = new ThreadsController();
