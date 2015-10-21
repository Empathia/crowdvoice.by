require('./../presenters/ThreadsPresenter');

var ThreadsController = Class('ThreadsController').includes(BlackListFilter)({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      return this;
    },

    index : function index(req, res, next) {
      ACL.isAllowed('show', 'threads', req.role, {currentPerson : req.currentPerson},  function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        if (req.role === 'Anonymous') {
          return res.render('threads/anonymous.html')
        };

        MessageThread.find(['sender_person_id = ? OR receiver_entity_id = ?', [hashids.decode(req.currentPerson.id)[0], hashids.decode(req.currentPerson.id)[0]]], function(err, threads) {
          if (err) { return next(err); }

          ThreadsPresenter.build(req, threads, function(err, threads) {
            if (err) { return next(err); }

            res.format({
              html : function() {
                return res.render('threads/index.html', {
                  pageName : 'page-inner page-threads',
                  threads : threads
                });
              },
              json : function() {
                return res.json(result);
              }
            });
          });
        });
      });
    },

    create : function create(req, res, next) {
      var payload = req.body;

      payload.type = payload.type || 'message';

      if (payload.senderEntityId) {
        payload.senderEntityId = hashids.decode(payload.senderEntityId)[0];
      } else {
        payload.senderEntityId = hashids.decode(req.currentPerson.id)[0];
      }

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

      ACL.isAllowed('create', 'threads', req.role, {
        senderPersonId : hashids.decode(req.currentPerson.id)[0],
        senderEntityId : payload.senderEntityId,
        receiverEntityId : payload.receiverEntityId,
        invitationRequestId : payload.invitationRequestId || null,
        voiceId : payload.voiceId || null,
        organizationId : payload.organizationId || null
      }, function(err, response) {
        if (err) {
          return next(err);
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        var thread,
          invite,
          message,
          refreshedInvitationMessage = false;

        async.series([
          function(done) {
            MessageThread.findOrCreate({
              senderPerson : response.senderPerson,
              senderEntity : response.senderEntity,
              receiverEntity : response.receiverEntity
            }, function(err, result) {
              if (err) {
                return done(err);
              }

              thread = result;

              done();
            })
          },
          function(done) {
            if (!payload.type.match(/invitation_(voice|organization)/)) {
              return done();
            }

            db('Messages')
              .where('thread_id', thread.id)
              .andWhere('sender_person_id', response.senderPerson.id)
              .andWhere('sender_entity_id', response.senderEntity.id)
              .andWhere('receiver_entity_id', response.receiverEntity.id)
              .andWhere('invitation_request_id', 'is not', null)
              .andWhere(function () {
                this
                  .where(function () {
                    this
                      .where('organization_id', 'is not', null)
                      .andWhere('organization_id', '=', payload.organizationId)
                  })
                  .orWhere(function () {
                    this
                      .where('voice_id', 'is not', null)
                      .andWhere('voice_id', '=', payload.voiceId)
                  })
              })
              .orderBy('created_at', 'desc')
              .exec(function (err, rows) {
                if (err) { return done(err); }

                var messages = Argon.Storage.Knex.processors[0](rows),
                  message = new Message(messages[0]);

                if (messages.length < 1) {
                  var invite = new InvitationRequest({
                    invitatorEntityId: response.senderEntity.id,
                    invitedEntityId: response.receiverEntity.id
                  });
                  invite.save(function (err) {
                    if (err) { return done(err); }

                    payload.invitationRequestId = invite.id;

                    return done();
                  });
                } else {
                  payload.invitationRequestId = message.invitationRequestId;

                  message.destroy(done);
                }
              });
          },
          function(done) {
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

              message = result;

              done();
            });
          }
        ], function(err) {
          if (err) {
            return next(err);
          }

          ThreadsPresenter.build(req, [thread], function(err, result) {
            if (err) {
              return next(err);
            }

            res.format({
              json : function() {
                res.json(result[0]);
              }
            });
          });
        });
      })
    },

    update : function update(req, res, next) {
      var threadId = hashids.decode(req.params.threadId)[0];
      var currentPersonId = hashids.decode(req.currentPerson.id)[0];

      ACL.isAllowed('update', 'threads', req.role, {
        threadId : threadId,
        currentPersonId : currentPersonId
      }, function(err, isAllowed) {

        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        MessageThread.findById(threadId, function(err, thread) {
          if (err) {
            return next(err);
          }

          if (thread.length === 0) {
            return next(new NotFoundError('Thread Not Found'));
          }

          thread = new MessageThread(thread[0]);

          var senderOrReceiver = thread.isPersonSender(currentPersonId) ? 'Sender' : 'Receiver';

          thread['lastSeen' + senderOrReceiver] = new Date(Date.now());

          thread.updatedAt = thread.updatedAt;

          thread.save(function(err, result) {
            if (err) {
              return next(err);
            }

            res.json({status : 'ok', data : result});
          })
        })
      })
    },

    destroy : function destroy(req, res, next) {
      var threadId = hashids.decode(req.params.threadId)[0];
      var currentPersonId = hashids.decode(req.currentPerson.id)[0];

      ACL.isAllowed('destroy', 'threads', req.role, {
        threadId : threadId,
        currentPersonId : currentPersonId
      }, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        res.format({
          json : function() {


            MessageThread.findById(threadId, function(err, thread) {
              if (err) {
                return next(err);
              }

              if (thread.length === 0) {
                return next(new NotFoundError('Thread Not Found'));
              }

              thread = new MessageThread(thread[0]);

              var senderOrReceiver = thread.isPersonSender(currentPersonId) ? 'Sender' : 'Receiver';

              thread['hiddenFor' + senderOrReceiver] = true;

              thread.save(function(err, result) {
                if (err) { return next(err); }

                Message.find({'thread_id' : thread.id}, function(err, messages) {
                  if (err) { return next(err); }

                  async.each(messages, function(message, done) {
                    async.series([
                      // mark post as hidden
                      function (next) {
                        message = new Message(message);

                        var senderOrReceiver = message.isPersonSender(currentPersonId) ? 'Sender' : 'Receiver';

                        message['hiddenFor' + senderOrReceiver] = true;

                        message.save(next);
                      },

                      function (next) {
                        if (!message.invitationRequestId) {
                          return next();
                        }

                        InvitationRequest.findById(message.invitationRequestId, function (err, invitation) {
                          var invite = new InvitationRequest(invitation[0]);

                          invite.destroy(next);
                        });
                      },
                    ], done);
                  }, function(err) {
                    if (err) { return next(err); }

                    res.json({ status: 'ok' });
                  })
                })
              })
            })
          }
        });
      });
    },

    searchPeople : function searchPeople(req, res, next) {
      ACL.isAllowed('searchPeople', 'threads', req.role, {
        currentPerson : req.currentPerson
      }, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        var value = req.body.value.toLowerCase().trim();
        var currentPersonId = hashids.decode(req.currentPerson.id)[0];
        res.format({
          json : function() {
            Entity.searchPeople({
              value : value,
              currentPersonId : currentPersonId
            }, function(err, result) {
              if (err) {
                return next(err);
              }

              result.forEach(function(person) {
                person.id = hashids.encode(person.id);
              })

              res.json(result);
            });
          }
        })
      })
    }
  }
});

module.exports = new ThreadsController();
