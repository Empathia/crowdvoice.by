var async = require('async');

var ThreadsController = Class('ThreadsController').inherits(RestfulController)({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      this._initRouter();

      return this;
    },

    _initRouter : function() {
      application.router.route('/:profileName/messages')
        .get(this.index);

      application.router.route('/:profileName/messages')
        .post(this.create);

      application.router.route('/:profileName/messages/:threadId')
        .get(this.index)
        .put(this.update);

      application.router.route('/:profileName/messages/:threadId')
        .delete(this.destroy);
    },

    index : function index(req, res) {

      res.format({
        html : function() {
          res.render('threads/index.html', {layout : 'application'});
        },
        json : function() {
          MessageThread.find(['sender_person_id = ? OR receiver_entity_id = ?', [req.currentPerson.id, req.currentPerson.id]], function(err, threads) {
            if (err) {
              throw new Error(err)
            }

            var results = [];

            threads.forEach(function(thread) {
              thread = new MessageThread(thread);

              var result = {
                id : thread.id,
                senderEntityId : thread.senderEntityId,
                receiverEntityId : thread.receiverEntityId
              }

              var senderOrReceiver = thread.isPersonSender(req.currentPerson.id) ? 'Sender' : 'Receiver';


              result.lastSeen     = thread['lastSeen' + senderOrReceiver]
              result.messageCount = thread['messageCount' + senderOrReceiver];
              result.hidden       = thread['hiddenFor' + senderOrReceiver];
              result.createdAt    = thread.createdAt;
              result.updatedAt    = thread.updatedAt;

              results.push(result);
            });

            async.each(results, function(item, callback) {
              Message.find(["thread_id = ? AND (created_at > DATE '" + new Date(item.lastSeen).toISOString() + "')", [item.id]], function(err, messages) {
                if (err) {
                  throw new Error(err)
                }

                delete item.lastSeen;

                item.unreadCount = messages.length;

                async.series([
                  function(done) {
                    Entity.findById(item.senderEntityId, function(err, result) {
                      if (err) {
                        throw new Error(err)
                      }

                      item.senderEntity = result[0];
                      delete item.senderEntityId;
                      done()
                    })
                  },

                  function(done) {
                    Entity.findById(item.receiverEntityId, function(err, result) {
                      if (err) {
                        throw new Error(err)
                      }

                      item.receiverEntity = result[0];
                      delete item.receiverEntityId;
                      done()
                    })
                  },
                  function(done) {
                    Message.find({'thread_id' : item.id}, function(err, messages) {

                      async.each(messages, function(message, doneMessage) {


                        message = new Message(message);

                        var senderOrReceiver = message.isPersonSender(req.currentPerson.id) ? 'Sender' : 'Receiver';


                        message.hidden = message['hiddenFor' + senderOrReceiver];
                        delete message.senderPersonId;
                        delete message.hiddenForSender;
                        delete message.hiddenForReceiver;

                        doneMessage();
                      }, function(err) {
                        if (err) {
                          throw new Error(err)
                        }

                        messages = messages.filter(function(item) {
                          if (!item.hidden) {
                            delete item.hidden;
                            return item;
                          }
                        });

                        item.messages = messages;

                        done();
                      });
                    });
                  }
                ], function(err) {
                  if (err) {
                    throw new Error(err)
                  }

                  callback();
                })
              })
            }, function(err) {
              if (err) {
                return res.status(500).json({error : err});
              }

              results = results.filter(function(item) {
                if (!item.hidden) {
                  delete item.hidden;
                  return item;
                }
              });

             res.json(results);
            });

          });
        }
      });
    },

    create : function create(req, res) {

      res.format({
        json : function() {
          var payload = req.body;

          payload.type = payload.type || 'message';

          async.waterfall([function(done) {
            Entity.findById(payload.senderEntityId, function(err, senderEntity) {
              done(err, senderEntity[0].type);
            });
          }, function(senderEntityType, done) {
            var whereClause;

            if (senderEntityType === 'organization') {
              whereClause = ['sender_person_id = ? AND sender_entity_id = ? AND receiver_entity_id = ?', [payload.senderPersonId, payload.senderEntityId, payload.receiverEntityId]];
            } else {
              whereClause = ['(sender_entity_id = ? AND receiver_entity_id = ?) OR (sender_entity_id = ? AND receiver_entity_id = ?)', [payload.senderEntityId, payload.receiverEntityId, payload.receiverEntity, payload.senderEntityId]];
            }

            MessageThread.find(whereClause, done);
          }, function(messageThread, done) {
            var thread;

            if (messageThread.length === 0) {
              thread = new MessageThread({
                senderPersonId : payload.senderPersonId,
                senderEntityId : payload.senderEntityId,
                receiverEntityId : payload.receiverEntityId
              });
            } else {
              thread = new MessageThread(messageThread[0]);
            }

            thread.hiddenForSender = false;
            thread.hiddenForReceiver = false;

            thread.save(function(err, result) {
              if (err) {
                return done(err);
              }

              var message = new Message({
                senderPersonId : payload.senderPersonId,
                senderEntityId : payload.senderEntityId,
                receiverEntityId : payload.receiverEntityId,
                type : payload.type,
                threadId : thread.id,
                invitationRequestId : payload.invitationRequestId,
                voiceId : payload.voiceId,
                organizationId : payload.organizationId,
                message : payload.message,
              });

              thread.messageCount = 0;
              thread.unreadCount = 0;

              Message.find({'thread_id': thread.id}, function(err, messages) {
                if (err) {
                  done(err);
                }

                messages.forEach(function(message) {
                  message = new Message(message);

                  var senderOrReceiver = message.isPersonSender(req.currentPerson.id) ? 'Sender' : 'Receiver';

                  message.hidden = message['hiddenFor' + senderOrReceiver];

                  delete message.hiddenForSender;
                  delete message.hiddenForReceiver;
                  delete message.senderPersonId;
                });

                messages = messages.filter(function(item) {
                  if (!item.hidden) {
                    delete item.hidden;
                    return item;
                  };
                })

                thread.messages = messages;
                thread.messageCount = messages.length;

                delete thread.hiddenForSender;
                delete thread.hiddenForReceiver;
                delete thread.lastSeenSender;
                delete thread.lastSeenReceiver;

                message.save(function(err, messageResult) {
                  if (err) {
                    return done(err);
                  }

                  delete messageThread.senderPersonId;
                  delete messageThread.hiddenForSender;
                  delete messageThread.hiddenForReceiver;

                  thread.messages.push(messageResult);

                  done(err, thread);
                })
              });
            })
          }, function(thread, done) {

            async.series([
              function(callback) {
                Entity.findById(thread.senderEntityId, function(err, result) {
                  if (err) {
                    return callback(err)
                  }

                  thread.senderEntity = result[0];
                  delete thread.senderEntityId;
                  callback()
                })
              },

              function(callback) {
                Entity.findById(thread.receiverEntityId, function(err, result) {
                  if (err) {
                    return callback(err)
                  }

                  thread.receiverEntity = result[0];
                  delete thread.receiverEntityId;
                  callback()
                })
              }

            ], function(err) {
              done(err, thread)
            })
          }], function(err, result) {
            if (err) {
              console.log(err)
              return res.status(500).json({'error' : err});
            }

            res.json(result);
          });
        }
      })
    },

    update : function update(req, res) {
      MessageThread.findById(req.params.threadId, function(err, thread) {
        if (err) {
          return res.status(500).json({'error' : err})
        }

        var senderOrReceiver = thread.isPersonSender(req.currentPerson.id) ? 'Sender' : 'Receiver';

        thread['lastSeen' + senderOrReceiver] = new Date(Date.now());

        thread.save(function(err, result) {
          if (err) {
            return res.status(500).json({'error' : err})
          }

          res.json({'status' : 'ok', data : result});
        })
      })
    },

    destroy : function destroy(req, res) {
      MessageThread.findById(req.params.threadId, function(err, thread) {
        if (err) {
          return res.status(500).json({error : err});
        }

        if (thread.length === 0) {
          return res.render('shared/404.html');
        }

        thread = thread[0];

        thread = new MessageThread(thread);

        var senderOrReceiver = thread.isPersonSender(req.currentPerson.id) ? 'Sender' : 'Receiver';

        thread['hiddenFor' + senderOrReceiver] = true;

        thread.save(function(err, result) {
          if (err) {
            throw new Error(err);
          }

          Message.find({'thread_id' : thread.id}, function(err, messages) {
            async.each(messages, function(message, done) {
              message = new Message(message);

              var senderOrReceiver = message.isPersonSender(req.currentPerson.id) ? 'Sender' : 'Receiver';

              message['hiddenFor' + senderOrReceiver] = true;

              message.save(function(err, messageSaveResult) {
                if (err) {
                  done(err)
                }

                done()
              })
            }, function(err) {
              if (err) {
                res.status(500).json({error : err});
              }

              return res.format({
                json : function() {
                  res.status(200).json({status : 'ok'});
                }
              })
            })
          })
        })

      })
    }
  }
});

module.exports = new ThreadsController();
