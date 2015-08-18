var MessagesController = Class('MessagesController').includes(BlackListFilter)({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      return this;
    },

    answerInvite : function (req, res, next) {
      var thread,
        message,
        invitationRequest = null,
        voice = null,
        organization = null,
        inviteToOrg = false,
        inviteToVoice = false;

      async.series([
        // find thread
        function(done) {
          MessageThread.find({id : hashids.decode(req.params.threadId)[0]}, function(err, result) {
            if (err) {
              return done(err);
            }

            if (result.length === 0) {
              return done(new NotFoundError('Thread Not Found.'))
            }

            var messageThread = new MessageThread(result[0]);

            thread = messageThread;

            done();
          })
        },

        // find message
        function(done) {
          Message.find({id : hashids.decode(req.params.messageId)[0]}, function(err, result) {
            if (err) {
              return done(err);
            }

            if (result.length === 0) {
              return done(new NotFoundError('Thread Not Found.'))
            }

            var messageInstance = new Message(result[0]);

            message = messageInstance;

            done();
          })
        },

        // find invitation request in message
        function(done) {
          InvitationRequest.find({id: message.invitationRequestId}, function(err, result) {
            if (err) {
              return done(err);
            }

            if (result.length === 0) {
              return done(new NotFoundError('Thread Not Found.'))
            }

            invitationRequest = result[0];

            done();
          })
        },

        // voice ID?
        function(done) {
          if (!message.voiceId) {
            return done();
          }

          Voice.find({id : hashids.decode(message.voiceId)[0]}, function(err, result) {
            if (err) {
              return done(err);
            }

            if (result.length === 0) {
              return done(new NotFoundError('Thread Not Found.'))
            }

            voice = result[0];

            inviteToVoice = true;

            done();
          })
        },

        // organization ID?
        function(done) {
          if (!message.organizationId) {
            return done();
          }

          Entity.find({id : hashids.decode(message.organizationId)[0]}, function(err, result) {
            if (err) {
              return done(err);
            }

            if (result.length === 0) {
              return done(new NotFoundError('Thread Not Found.'))
            }

            organization = result[0];

            inviteToOrg = true;

            done();
          })
        }
      ], function (err) {
        ACL.isAllowed('acceptInvite', 'messages', req.role,  {
          currentPerson : req.currentPerson,
          thread : thread,
          message : message,
          invitationRequest : invitationRequest,
          voice : voice,
          organization : organization
        }, function(err, isAllowed) {
          if (err) { return next(err); }

          if (!isAllowed) {
            return next(new ForbiddenError('Unauthorized.'))
          }

          console.log('!!!!!!!!!!!', req.body);

          async.series([
            // accept
            function (done) {
              if (req.body.action !== 'accept') {
                return done();
              }

              done();
            },

            // acceptAsAnonymous
            function (done) {
              if (req.body.action !== 'acceptAsAnonymous') {
                return done();
              }

              done();
            },

            // ignore
            function (done) {
              if (req.body.action !== 'ignore') {
                return done();
              }

              done();
            }
          ], function (err) {
            if (err) { return next(err); }

            res.json({})
          });
        })
      })
    },

    create : function create(req, res, next) {
      var threadId = hashids.decode(req.params.threadId)[0];
      var currentPersonId = hashids.decode(req.currentPerson.id)[0];

      ACL.isAllowed('create', 'messages', req.role, {
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
                next(err); return;
              }

              if (thread.length === 0 ) {
                next(new NotFoundError('MessageThread Not Found')); return;
              }

              thread =  new MessageThread(thread[0]);

              thread.createMessage({
                type : Message.TYPE_MESSAGE,
                senderPersonId : currentPersonId,
                message : req.body.message
              }, function(err, message) {
                if (err) {
                  return next(err);
                }

                ThreadsPresenter.build(req, [thread], function(err, threads) {
                  if (err) {
                    return next(err);
                  }

                  res.json(threads[0].messages[threads[0].messages.length - 1]);
                });
              });
            });
          }
        });
      })
    },

    destroy : function destroy(req, res, next) {
      var messageId = hashids.decode(req.params.messageId)[0];
      var currentPersonId = hashids.decode(req.currentPerson.id)[0];

      ACL.isAllowed('destroy', 'messages', req.role, {
        messageId : messageId,
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
            Message.findById(messageId, function(err, message) {
              if (err) {
                return next(err);
              }

              if (message.length === 0) {
                return next(new NotFoundError('Message Not Found'));
              }

              message = new Message(message[0]);

              var senderOrReceiver = message.isPersonSender(currentPersonId) ? 'Sender' : 'Receiver';

              message['hiddenFor' + senderOrReceiver] = true;

              message.save(function(err, result) {
                if (err) {
                  return next(err);
                }

                res.json({status : 'ok'});
              });
            })
          }
        })
      })
    }
  }
});

module.exports = new MessagesController();
