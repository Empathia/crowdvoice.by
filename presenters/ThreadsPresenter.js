Module('ThreadsPresenter')({
  build : function build(req, threads, callback) {
    async.each(threads, function(thread, next) {
      var threadInstance = new MessageThread(thread);

      var senderOrReceiver = threadInstance.isPersonSender(hashids.decode(req.currentPerson.id)[0]) ? 'Sender' : 'Receiver';

      thread.lastSeen     = thread['lastSeen' + senderOrReceiver]
      thread.messageCount = thread['messageCount' + senderOrReceiver];
      thread.hidden       = thread['hiddenFor' + senderOrReceiver];
      thread.id           = hashids.encode(thread.id);

      delete thread.senderPersonId;
      delete thread.lastSeenSender;
      delete thread.lastSeenReceiver;
      delete thread.messageCountSender;
      delete thread.messageCountReceiver;
      delete thread.hiddenForSender;
      delete thread.hiddenForReceiver;
      delete thread.eventListeners;

      async.series([function(done) {
        Entity.findById(thread.senderEntityId, function(err, result) {
          if (err) {
            return done(err);
          }

          thread.senderEntity = new Entity(result[0]);
          thread.senderEntity.id = hashids.encode(thread.senderEntity.id);

          delete thread.senderEntityId;

          done();
        })
      }, function(done) {
        Entity.findById(thread.receiverEntityId, function(err, result) {
          if (err) {
            return done(err);
          }

          thread.receiverEntity = new Entity(result[0]);
          thread.receiverEntity.id = hashids.encode(thread.receiverEntity.id);
          delete thread.receiverEntityId;

          done();
        })
      }, function(done) {
        db('Messages')
          .where('thread_id', '=', threadInstance.id)
          .andWhereRaw("created_at > DATE '" +  new Date(thread.lastSeen).toISOString() + "'")
          .count('*')
          .exec(function(err, result) {
            if (err) {
              return done(err);
            }

            thread.unreadCount = parseInt(result[0].count, 10);
            delete thread.lastSeen;

            done();
          })
      }, function(done) {
        Message.find({'thread_id' : threadInstance.id}, function(err, messages) {
          if (err) {
            return done(err);
          }

          messages.forEach(function(message) {
            var messageInstance = new Message(message);

            var messageSenderOrReceiver = messageInstance.isPersonSender(hashids.decode(req.currentPerson.id)[0]) ? 'Sender' : 'Receiver';

            message.hidden = message['hiddenFor' + messageSenderOrReceiver];

            if (messageSenderOrReceiver === 'Sender') {
              message.senderEntity = thread.senderEntity;
              message.receiverEntity = thread.receiverEntity;
            } else {
              message.senderEntity = thread.receiverEntity;
              message.receiverEntity = thread.senderEntity;
            }

            message.threadId = hashids.encode(message.threadId);
            message.invitationRequestId = hashids.encode(message.invitationRequestId);
            message.voiceId = hashids.encode(message.voiceId);
            message.organizationId = hashids.encode(message.organizationId);


            delete message.senderPersonId;
            delete message.senderEntityId;
            delete message.receiverEntityId;
            delete message.hiddenForSender;
            delete message.hiddenForReceiver;
            delete message.eventListeners;

          });

          thread.messages = messages;

          messages = messages.filter(function(message) {
            if (!message.hidden) {
              delete message.hidden;
              return message;
            }
          });

          done();
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

      callback(err, threads);
    });
  }
});
