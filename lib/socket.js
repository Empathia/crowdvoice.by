var NotificationsPresenter = require(__dirname + '/../presenters/NotificationsPresenter.js')

module.exports = function (socket) {
  logger.log('Loading Socket.io functions');

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

  socket.on('getApprovedPostsPage', function(voiceId, page, up) {
    var offset = page * VoicesController.POSTS_PER_PAGE;

    db.raw('SELECT * FROM (SELECT *, row_number() OVER (ORDER BY "Posts".published_at DESC) FROM "Posts" WHERE "Posts".voice_id = ? AND approved = true ORDER BY "Posts".published_at) AS posts WHERE row_number > ? ORDER BY published_at DESC LIMIT ?', [hashids.decode(voiceId)[0], offset, VoicesController.POSTS_PER_PAGE]).exec(function(err, posts) {
      posts = Argon.Storage.Knex.processors[0](posts.rows);

      logger.log(posts.length);

      PostsPresenter.build(posts, socket.request.session.currentPerson, function(err, results) {
        if (err) {
          return socket.emit('approvedPostsPage', {'error': err}, page, up);
        }

        logger.log(posts.length, results.length);

        socket.emit('approvedPostsPage', results, page, up);
      });
    });
  });

  socket.on('getUnApprovedPostsPage', function(voiceId, page, up) {
    var offset = page * VoicesController.POSTS_PER_PAGE;

    db.raw('SELECT * FROM (SELECT *, row_number() OVER (ORDER BY "Posts".published_at DESC) FROM "Posts" WHERE "Posts".voice_id = ? AND approved = false ORDER BY "Posts".published_at) AS posts WHERE row_number > ? ORDER BY published_at DESC LIMIT ?', [hashids.decode(voiceId)[0], offset, VoicesController.POSTS_PER_PAGE]).exec(function(err, posts) {
      posts = Argon.Storage.Knex.processors[0](posts.rows);

      logger.log(posts.length);

      PostsPresenter.build(posts, socket.request.session.currentPerson, function(err, results) {
        if (err) {
          return socket.emit('unapprovedPostsPage', {'error': err}, page, up);
        }

        logger.log(posts.length, results.length);

        socket.emit('unapprovedPostsPage', results, page, up);
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
      db.raw('SELECT COUNT(DISTINCT x) FROM (SELECT location from "Entities" WHERE is_anonymous = false UNION ALL SELECT location_name FROM "Voices") AS x;').exec(function(err, result) {
        if (err) {
          return done(err);
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
        .whereIn('sender_person_id', currentPerson.id)
        .orWhereIn('receiver_entity_id', ids)
        .exec(function (err, rows) {
          if (err) {
            logger.log(err);
            logger.log(err.stack);
            return;
          }

          var threads = Argon.Storage.Knex.processors[0](rows);

          async.each(threads, function (thread, doneThread) {
            var threadInst = new MessageThread(thread),
              isThreadSender = threadInst.isPersonSender(currentPerson.id),
              lastSeen = threadInst['lastSeen' + (isThreadSender ? 'Sender' : 'Receiver')];

            Message.find({
              thread_id: threadInst.id
            }, function (err, messages) {
              if (err) { return doneThread(err); }

              var messagesToGoThrough = messages.filter(function (msg) {
                return (ids.indexOf(msg.receiverEntityId) !== -1);
              }).filter(function (msg) {
                return !(msg.hiddenForSender && msg.hiddenForReceiver);
              });

              messagesToGoThrough.forEach(function (msg) {
                // never seen the thread, thus unread
                if (lastSeen === null) {
                  counter += 1;
                  return;
                }

                if (moment(msg.createdAt).format('X') > moment(lastSeen).format('X')) {
                  counter += 1;
                  return;
                }
              });

              return doneThread();
            });
          }, function (err) {
            if (err) {
              logger.log(err);
              logger.log(err.stack);
              return;
            }

            socket.emit('unreadMessagesCount', counter);
          });
        });
    });
  });

  var notificationHandler = function(data) {
    var notification = data.data.model;

    var followerId = notification.followerId;

    var currentPerson = new Entity(socket.request.session.currentPerson);

    if (notification.forFeed === true) {
      return;
    }

    async.series([function(done) {
      if (!socket.request.session.isAnonymous) {
        return done();
      }

      currentPerson.owner(function(err, result) {
        if (err) {
          return done(err);
        }

        currentPerson = new Entity(result);

        done();
      });
    }, function(done) {
      if (hashids.decode(currentPerson.id)[0] !== followerId) {
        return done();
      }

      Entity.find({id : hashids.decode(currentPerson.id)[0] }, function(err, res) {
        if (err) {
          return done(err);
        }

        currentPerson = new Entity(res[0]);
        currentPerson.lastNotificationDate = new Date(notification.createdAt);

        currentPerson.save(function(err, res) {
          if (err) {
            return done(err);
          }

          done();
        })
      });
    }], function(err) {
      if (err) {
        logger.error(err);
      }

      if (currentPerson.id !== followerId) {
        return;
      }

      NotificationsPresenter.build([notification], currentPerson, function(err, notifications) {
        if (err) {
          logger.error(err);
        }

        socket.emit('newNotifications', notifications);
      });
    })
  }

  Notification.bind('afterCreate', notificationHandler);

  socket.on('disconnect', function() {
    Notification.unbind('afterCreate', notificationHandler);
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
      if (!currentPerson.lastNotificationDate) {
        return done();
      }

      // Using DESC in the query returns 1 notification everytime
      Notification.find(['follower_id = ? AND read = false AND created_at > ? ORDER BY created_at ASC', [hashids.decode(currentPerson.id)[0], currentPerson.lastNotificationDate]], function(err, result) {
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
        Entity.find({id : hashids.decode(currentPerson.id)[0]}, function(err, res) {
          if (err) {
            logger.error(err);
          }

          var entity = new Entity(res[0]);
          entity.lastNotificationDate = notifications[notifications.length - 1].createdAt;

          entity.save(function(err, res) {
            if (err) {
              logger.error(err);
            }

            NotificationsPresenter.build(notifications, currentPerson, function(err, notifications) {
              if (err) {
                logger.error(err);
              }

              socket.emit('newNotifications', notifications);
            });
          });

        });
      }
    });
  });

  socket.on('readNotifications', function() {
    var currentPerson = socket.request.session.currentPerson;

    db('Notifications').where({
      follower_id : hashids.decode(currentPerson.id)[0]
    }).update({
      read : true
    }).returning('id').exec(function(err, result) {
      if (err) {
        logger.error('readNotifications Error');
        logger.error(err);
        logger.error(err.stack);
        return;
      }

      logger.log('Mark as Read');
      logger.log(result);
    });
  });
};
