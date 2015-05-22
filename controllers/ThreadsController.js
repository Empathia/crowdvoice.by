var async = require('async');

var ThreadsController = Class('ThreadsController').inherits(RestfulController)({
  prototype : {
    _initRouter : function() {
      application.router.route('/:profileName/messages')
        .get(this.index);

      application.router.route('/' + inflection.singularize(this.name).toLowerCase())
        .post(this.create);


      application.router.route('/:profileName/messages/:threadId')
        .get(this.show)
        .delete(this.destroy);
    },

    index : function index(req, res) {
      MessageThreads.find(['WHERE sender_person_id = ? OR WHERE receiver_entity_id = ?', [req.currentPerson.id, req.currentPerson.id]], function(err. threads) {
        var results = [];

        threads.forEach(function(thread) {
          thread = new MessageThread(thread);

          var result = {
            id : thread.id,
            senderEntity : thread.senderEntity?
            receiverEntity : thread.receiverEntity?
          }

          var senderOrReceiver = thread.isPersonSender(req.currentPerson.id) ? 'Sender' : 'Receiver';


          result.lastSeen     : thread['lastSeen' + senderOrReceiver];
          result.messageCount : thread['messageCount' + senderOrReceiver];
          result.hidden       : thread['hiddenFor' + senderOrReceiver];

          results.push(result);
        });

        async.each(results, function(item, callback) {
          if (item.hidden) {
            var index = results.indexOf(item);

            if (index !== -1) {
                results.splice(index, 1);
            }

            callback();
          } else {
            Message.find(['WHERE thread_id = ? AND created_at > ?', [item.id, item.lastSeen]], function(err. messages) {
              if (err) {
                callback(err);
              }

              delete item.lastSeen;
              delete item.hidden;

              item.unreadCount = messages.length;

              callback();
            })
          }
        }, function(err) {
          if (err) {
            throw new Error(err)
          }

          res.format({
            html : function() {
              res.render('threads/index.html', {layout : 'application', threads : results});
            },
            json : function() {
              res.json(results);
            }
          })
        });

      });


    },

    show : function show(req, res) {
      res.render('threads/show.html', {layout : false});
    },

    new : function(req, res) {
      res.render('threads/new.html');
    },

    create : function create(req, res) {
      res.redirect('/thread/id');
    },

    edit : function edit(req, res) {
      res.render('threads/edit.html', {layout : false});
    },

    update : function update(req, res) {
      res.redirect('/thread/id');
    },

    destroy : function destroy(req, res) {
      res.redirect('/threads');
    }
  }
});

module.exports = new ThreadsController();
