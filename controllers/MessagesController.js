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
          MessageThread.findById(hashids.decode(req.params.threadId)[0], function(err, thread) {
            if (err) {
              next(err); return;
            }

            if (thread.length === 0 ) {
              next(new NotFoundError('MessageThread Not Found')); return;
            }

            thread =  new MessageThread(thread[0]);

            thread.createMessage({
              type : Message.TYPE_MESSAGE,
              senderPersonId : hashids.decode(req.currentPerson.id)[0],
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
    },

    destroy : function destroy(req, res, next) {
      res.format({
        json : function() {
          Message.findById(hashids.decode(req.params.messageId)[0], function(err, message) {
            if (err) {
              return next(err);
            }

            if (message.length === 0) {
              return next(new NotFoundError('Message Not Found'));
            }

            message = new Message(message[0]);

            var senderOrReceiver = message.isPersonSender(hashids.decode(req.currentPerson.id)[0]) ? 'Sender' : 'Receiver';

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
