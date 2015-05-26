var MessagesController = Class('MessagesController')({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      this._initRouter();

      return this;
    },

    _initRouter : function() {
      application.router.route('/:profileName/messages/:threadId')
        .post(this.create);

      application.router.route('/:profileName/messages/:threadId/:messageId')
        .delete(this.destroy);
    },

    create : function create(req, res, next) {
      res.format({
        json : function() {
          MessageThread.findById(req.params.threadId, function(err, thread) {
            if (err) {
              next(err); return;
            }

            if (thread.length === 0 ) {
              next(new NotFoundError('MessageThread Not Found')); return;
            }

            thread =  new MessageThread(thread[0]);

            var message = new Message({
              type : Message.TYPE_MESSAGE,
              senderPersonId : req.currentPerson.id,
              senderEntityId : req.body.senderEntityId,
              threadId : thread.id,
              message : req.body.message
            });

            if (thread.isPersonSender(req.currentPerson.id)) {
              message.receiverEntityId = thread.receiverEntityId;
            } else {
              message.receiverEntityId = thread.senderEntityId;
            }

            message.save(function(err, result) {
              if (err) {
                return next(err);
              }

              delete message.senderPersonId;
              delete message.hiddenForSender;
              delete message.hiddenForReceiver;

              async.series([function(done) {
                Entity.find({id : message.senderEntityId}, function(err, result) {
                  if (err) {
                    done(err)
                  }

                  if (result.length === 0) {
                    done('Entity not Found')
                  }

                  message.senderEntity = result[0];
                  delete message.senderEntityId;

                  done(err, result);
                })
              }, function(done) {
                Entity.find({id : message.receiverEntityId}, function(err, result) {
                  if (err) {
                    done(err)
                  }

                  if (result.length === 0) {
                    done('Entity not Found')
                  }

                  message.receiverEntity = result[0];
                  delete message.receiverEntityId;

                  done(err, result);
                })
              }], function(err) {
                if (err) {
                  return next(err);
                }



                return res.json(message);
              });
            });
          });
        }
      });
    },

    destroy : function destroy(req, res, next) {
      res.format({
        json : function() {
          Message.findById(req.params.messageId, function(err, message) {
            if (err) {
              return next(err);
            }

            if (message.length === 0) {
              return next(new NotFoundError('Message Not Found'));
            }

            message = new Message(message[0]);

            var senderOrReceiver = message.isPersonSender(req.currentPerson.id) ? 'Sender' : 'Receiver';

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
    }
  }
});

module.exports = new MessagesController();
