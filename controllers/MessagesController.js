var MessagesController = Class('MessagesController').includes(BlackListFilter)({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      return this;
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
