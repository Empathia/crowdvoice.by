var MessagesController = Class('MessagesController').includes(BlackListFilter)({
  prototype : {

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
              return done(new NotFoundError('Thread Not Found.'));
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
              return done(new NotFoundError('Message Not Found.'));
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
              return done(new NotFoundError('Invitation Request Not Found.'));
            }

            invitationRequest = new InvitationRequest(result[0]);

            done();
          })
        },

        // voice ID?
        function(done) {
          if (!message.voiceId) {
            return done();
          }

          Voice.find({id : message.voiceId}, function(err, result) {
            if (err) {
              return done(err);
            }

            if (result.length === 0) {
              return done(new NotFoundError('Voice Not Found.'));
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

          Entity.find({id : message.organizationId}, function(err, result) {
            if (err) {
              return done(err);
            }

            if (result.length === 0) {
              return done(new NotFoundError('Organization Not Found.'))
            }

            organization = result[0];

            inviteToOrg = true;

            done();
          });
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

          async.series([
            // accept
            function (done) {
              if (req.body.action === 'accept') {

                async.series([function(doneSeries) {
                  if (!voice) {
                    return doneSeries();
                  }

                  var voiceCollaborator = new VoiceCollaborator({
                    voiceId : voice.id,
                    collaboratorId : hashids.decode(req.currentPerson.id)[0]
                  });

                  if (req.body.anonymous) {
                    voiceCollaborator.isAnonymous = true;
                  }

                  voiceCollaborator.save(function(err, result) {
                    if (err) {
                      return doneSeries(err);
                    }

                    message.type = 'invitation_accepted_voice';

                    message.save(function(err, response) {
                      if (err) {
                        return doneSeries(err);
                      }

                      invitationRequest.destroy(function (err) {
                        if (err) { return doneSeries(err); }

                        // if new member is not anonymous, i.e. is public
                        if (!req.body.anonymous) {
                          FeedInjector().inject(voiceCollaborator.collaboratorId, 'item voiceNewPublicContributor', voiceCollaborator, doneSeries);
                        } else {
                          return doneSeries();
                        }
                      });
                    });
                  });
                }, function(doneSeries) {
                  if (!organization) {
                    return doneSeries();
                  }

                  var entityMembership = new EntityMembership({
                    entityId : organization.id,
                    memberId : hashids.decode(req.currentPerson.id)[0]
                  });

                  if (req.body.anonymous) {
                    entityMembership.isAnonymous = true;
                  }

                  entityMembership.save(function(err, result) {
                    if (err) {
                      return doneSeries(err);
                    }

                    message.type = 'invitation_accepted_organization';

                    message.save(function(err, response) {
                      if (err) {
                        return doneSeries(err);
                      }

                      invitationRequest.destroy(function (err) {
                        if (err) { return doneSeries(err); }

                        // if new member is not anonymous, i.e. is public
                        if (!req.body.anonymous) {
                          FeedInjector().inject(entityMembership.memberId, 'item entityBecomesOrgPublicMember', entityMembership, doneSeries);
                        } else {
                          return doneSeries();
                        }
                      });
                    });
                  });

                }], done);
              } else {
                return done();
              }
            },

            // ignore
            function (done) {
              if (req.body.action === 'ignore') {
                if (voice) {
                  message.type = 'invitation_rejected_voice';
                } else {
                  message.type = 'invitation_rejected_organization';
                }

                message.save(function(err, response) {
                  if (err) {
                    return done(err);
                  }

                  invitationRequest.destroy(done);
                });
              } else {
                done();
              }
            }
          ], function (err) {
            if (err) {
              logger.log(err);
              logger.log(err.stack);
              return res.status(400).json({ error : err });
            }

            res.json({ status : 'done' });
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

              if (thread.length === 0) {
                return next(new NotFoundError('MessageThread Not Found'));
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
