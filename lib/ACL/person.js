ACL.addRole(new ACL.Role('Person'), ['Anonymous']);

/*
  ==================
  ThreadsController
  ==================
*/

ACL.addResource(new ACL.Resource('threads'));
// show inherited from  Anonymous

ACL.allow('create', 'threads', 'Person', function (acl, args, next) {
  var data = args;

  if (data.senderEntityId === data.receiverEntityId) {
    return next(null, false);
  }

  if (data.senderPersonId === data.receiverEntityId) {
    return next(null, false);
  }

  var senderPerson, senderEntity, receiverEntity;

  async.series([function(done) {
    Entity.findById(data.senderPersonId, function(err, result) {
      if (err) {
        return done(err);
      }

      if (result.length === 0) {
        return done(new NotFoundError('Sender Person Not Found.'))
      }

      senderPerson = new Entity(result[0]);
    })
  }, function(done) {
    Entity.findById(data.senderEntityId, function(err, result) {
      if (err) {
        return done(err);
      }

      if (result.length === 0) {
        return done(new NotFoundError('Sender Entity Not Found.'))
      }

      senderEntity = new Entity(result[0]);
    })
  }, function(done) {
    Entity.findById(data.senderEntityId, function(err, result) {
      if (err) {
        return done(err);
      }

      if (result.length === 0) {
        return done(new NotFoundError('Receiver Entity Not Found.'))
      }

      receiverEntity = new Entity(result[0]);
    })
  }], function(err) {
    if (err) {
      return next(err)
    }

    if (receiverEntity.type !== 'person') {
      return next(null, false);
    }

    if (receiverEntity.isAnonymous) {
      return next(null, false);
    }

    next(err, true);
  });
});

ACL.allow('update', 'threads', 'Person', function (acl, data, next) {
  MessageThread.findById(data.threadId, function(err, result) {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      return next(new NotFoundError('Thread not found.'));
    }

    var thread = result[0];

    if (data.currentPersonId !== thread.senderPersonId || data.currentPersonId !== thread.receiverEntityId) {
      return next(null, false)
    }

    return next(null, true)
  })
});

ACL.allow('destroy', 'threads', 'Person', function (acl, data, next) {
  MessageThread.findById(data.threadId, function(err, result) {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      return next(new NotFoundError('Thread not found.'));
    }

    var thread = result[0];

    if (data.currentPersonId !== thread.senderPersonId || data.currentPersonId !== thread.receiverEntityId) {
      return next(null, false)
    }

    return next(null, true)
  })
});

ACL.allow('searchPeople', 'threads', 'Person', function (acl, data, next) {
  if (currentPerson.isAnonymous) {
    return next(null, false);
  }

  return next(null, true)
});

/*
  ==================
  MessagesController
  ==================
*/

ACL.addResource(new ACL.Resource('messages'));

ACL.allow('create', 'message', 'Person', function (acl, data, next) {
  MessageThread.findById(data.threadId, function(err, result) {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      return next(new NotFoundError('Thread not found.'));
    }

    var thread = result[0];

    if (data.currentPersonId !== thread.senderPersonId || data.currentPersonId !== thread.receiverEntityId) {
      return next(null, false)
    }

    return next(null, true)
  })
});

ACL.allow('destroy', 'message', 'Person', function (acl, data, next) {
  Message.findById(data.messageId, function(err, result) {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      return next(new NotFoundError('Message not found.'));
    }

    var message = result[0];

    if (data.currentPersonId !== message.senderPersonId || data.currentPersonId !== message.receiverEntityId) {
      return next(null, false)
    }

    return next(null, true)
  })
});
