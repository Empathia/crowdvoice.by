#!/usr/bin/env node

// Admin namespace for Admin Controllers
global.Admin = {};

var application = require('neonode-core');

// Load socket.io
var io = require('socket.io')(application.server);

// Load moment
global.moment = require('moment');

global.FeedInjector = require(__dirname + '/../lib/FeedInjector.js');

// Load routes
require('./../lib/routes.js');

application._serverStart();

require('./../presenters/PostsPresenter');

io.use(function(socket, next) {
  sessionMiddleWare(socket.request, socket.request.res, next);
});

io.on('connection', function(socket) {
  socket.on('getApprovedMonthPosts', function(voiceId, dateString, up) {
    var dateData = dateString.split('-');

    logger.log(voiceId, dateString, up);

    Post.find(['"Posts".voice_id = ? AND EXTRACT(MONTH FROM "Posts".published_at) = ? AND EXTRACT(YEAR FROM "Posts".published_at) = ? AND approved = true ORDER BY "Posts".published_at DESC', [hashids.decode(voiceId)[0], dateData[1], dateData[0]]], function(err, posts) {
      logger.log(posts.length);

      PostsPresenter.build(posts, socket.request.session.currentPerson, function(err, results) {
        if (err) {
          return socket.emit('approvedMonthPosts', {'error': err}, dateString, up);
        }

        logger.log(posts.length, results.length);

        socket.emit('approvedMonthPosts', results, dateString, up);
      });
    });
  });

  socket.on('getUnapprovedMonthPosts', function(voiceId, dateString, up) {
    var dateData = dateString.split('-');

    logger.log(voiceId, dateString, up);

    Post.find(['"Posts".voice_id = ?  AND EXTRACT(MONTH FROM "Posts".published_at) = ?  AND EXTRACT(YEAR FROM "Posts".published_at) = ?  AND approved = false ORDER BY "Posts".published_at DESC', [hashids.decode(voiceId)[0], dateData[1], dateData[0]]], function(err, posts) {
      logger.log(posts.length);

      PostsPresenter.build(posts, socket.request.session.currentPerson, function(err, results) {
        if (err) {
          return socket.emit('unapprovedMonthPosts', {'error': err}, dateString, up);
        }

        socket.emit('unapprovedMonthPosts', results, dateString, up);
      });
    });
  });

  socket.on('getStats', function() {
    var cities = 0;
    var organizations = 0;
    var voices = 0;
    var posts = 0;

    async.series([function(done) {
      db.raw('SELECT COUNT(DISTINCT location) FROM "Entities" WHERE type = \'person\' OR type = \'organization\' AND is_anonymous = false;').exec(function(err, result) {
        if (err) {
          done(err);
        }

        cities = result.rows[0].count;
        done();
      });
    }, function(done) {
      db.raw('SELECT COUNT(id) FROM "Entities" WHERE type = \'organization\';').exec(function(err, result) {
        if (err) {
          return done(err);
        }

        organizations = result.rows[0].count;
        done();
      });
    }, function(done) {
      db.raw('SELECT COUNT(id) FROM "Voices" WHERE status = \'STATUS_PUBLISHED\';').exec(function(err, result) {
        if (err) {
          return done(err);
        }

        voices = result.rows[0].count;
        done();
      });
    }, function(done) {
      db.raw('SELECT COUNT(id) FROM "Posts" WHERE approved = true;').exec(function(err, result) {
        if (err) {
          return done(err);
        }

        posts = result.rows[0].count;
        done();
      });
    }], function(err) {
      if (err) {
        logger.error('Get Stats error');
        logger.error(err)
        logger.error(err.stack);
      }

      var response = {
        cities : cities,
        organizations : organizations,
        voices : voices,
        posts : posts
      }

      socket.emit('stats', response);
    });
  });

  socket.on('getUnreadMessagesCount', function (data) {
    if (!socket.request.session.currentPerson) {
      return;
    }

    var currentPerson = new Entity(socket.request.session.currentPerson);
    currentPerson.id = hashids.decode(currentPerson.id)[0];
    var counter = 0;

    EntityOwner.find({ owner_id: currentPerson.id }, function (err, orgs) {
      var ids = orgs.map(function (val) { return val.ownedId });
      ids.push(currentPerson.id);

      db('MessageThreads')
        .whereIn('receiver_entity_id', ids)
        .orWhereIn('sender_entity_id', ids)
        .exec(function (err, result) {
          if (err) {
            return console.log(err);
          }

          var threads = Argon.Storage.Knex.processors[0](result);

          async.each(threads, function (thread, next) {
            var isThreadSender = false,
              isThreadReceiver = false;

            // figure out if we should deal with the thread receiver or the sender
            if (thread.senderPersonId === currentPerson.id) {
              isThreadSender = true;
            } else if (thread.receiverEntityId === currentPerson.id) {
              isThreadReceiver = true;
            }

            // don't count hidden threads
            if (isThreadSender) {
              if (thread.isHiddenForSender) {
                return next();
              }
            } else if (isThreadReceiver) {
              if (thread.isHiddenForReceiver) {
                return next();
              }
            }

            Message.find({
              thread_id: thread.id
            }, function (err, messages) {
              if (err) {
                return console.log(err);
              }

              var isUnread;

              var messagesNotByUser = messages.filter(function (msg) {
                return msg.receiverEntityId === currentPerson.id;
              });

              var unseenMessages = messagesNotByUser.filter(function (msg) {
                isUnread = false;

                // we're dealing with the sender
                if (isThreadSender) {
                  // never seen thread thus unread
                  if (thread.lastSeenSender === null) {
                    isUnread = true;
                  }
                  isUnread = moment(msg.createdAt).format('X') > moment(thread.lastSeenSender).format('X');
                  // don't count hidden messages
                  if (msg.hiddenForSender) {
                    isUnread = false;
                  }
                // we're dealing with the receiver
                } else if (isThreadReceiver) {
                  // never seen thread thus unread
                  if (thread.lastSeenReceiver === null) {
                    isUnread = true;
                  }
                  isUnread = moment(msg.createdAt).format('X') > moment(thread.lastSeenReceiver).format('X');
                  // don't count hidden messages
                  if (msg.hiddenForReceiver) {
                    isUnread = false;
                  }
                } else {
                  isUnread = false;
                }

                return isUnread;
              });

              counter += unseenMessages.length;
              next();
            });
          }, function (err) {
            if (err) {
              return console.log(err);
            }

            socket.emit('unreadMessagesCount', counter);
          });
        });
    });
  });

  socket.on('getNotifications', function(data) {
    if (!socket.request.session.currentPerson) {
      return;
    }

    var lastNotificationDate = socket.request.session.lastNotificationDate || null;

    var currentPerson = socket.request.session.currentPerson;
    var isAnonymous = false;

    var notifications = [];

    if (currentPerson.isAnonymous) {
      isAnonymous = true;
    }

    async.series([function(done) {
      if (!isAnonymous) {
        return done();
      }

      var entity = new Entity(currentPerson);

      entity.owner(function(err, result) {
        if (err) {
          return done(err);
        }

        currentPerson = result;
        done();
      });
    }, function(done) {
      // Using DESC in the query returns 1 notification everytime
      Notification.find(['follower_id = ? AND read = false AND created_at > ? ORDER BY created_at ASC', [hashids.decode(currentPerson.id)[0], moment(new Date(lastNotificationDate).toISOString()).format()]], function(err, result) {
        if (err) {
          return done(err);
        }

        notifications = result;
        done();
      });
    }], function(err) {
      if (err) {
        logger.error('Get Notifications Error');
        logger.error(err);
        logger.error(err.stack);
      }

      if (notifications.length > 0) {
        socket.request.session.lastNotificationDate = notifications[0].createdAt;
      }

      socket.emit('notifications', notifications.length);
    });
  });

  socket.on('readNotifications', function() {
    var currentPerson = socket.request.session.currentPerson;

    db('Notifications').where({
      follower_id : hashids.decode(currentPerson.id)[0]
    }).update({
      read : true
    }).returning('id').exec(function(err, result) {
      logger.log('Mark as Read');
      logger.log(result);
    });
  });

});
