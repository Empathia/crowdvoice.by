ACL.addRole(new ACL.Role('Person'), ['Anonymous']);

/*
  ==================
  ThreadsController
  ==================
*/

ACL.addResource(new ACL.Resource('threads'));
// Show inherited from  Anonymous

ACL.allow('create', 'threads', 'Person', function(acl, args, next) {
  var data = args;

  if (data.senderEntityId === data.receiverEntityId) {
    logger.log('senderEntityId is equal to receiverEntityId');
    return next(null, {isAllowed : false});
  }

  if (data.senderPersonId === data.receiverEntityId) {
    logger.log('senderPersonId is equal to receiverEntityId');
    return next(null, {isAllowed : false});
  }

  var senderPerson, senderEntity, receiverEntity;

  async.series([function(done) {
    Entity.findById(data.senderPersonId, function(err, result) {
      if (err) {
        return done(err);
      }

      if (result.length === 0) {
        logger.log('Sender Person Not Found');
        return done(new NotFoundError('Sender Person Not Found.'));
      }

      senderPerson = new Entity(result[0]);

      done();
    });
  }, function(done) {
    Entity.findById(data.senderEntityId, function(err, result) {
      if (err) {
        return done(err);
      }

      if (result.length === 0) {
        logger.log('Sender Entity Not Found');
        return done(new NotFoundError('Sender Entity Not Found.'));
      }

      senderEntity = new Entity(result[0]);

      done();
    });
  }, function(done) {
    Entity.findById(data.receiverEntityId, function(err, result) {
      if (err) {
        return done(err);
      }

      if (result.length === 0) {
        logger.log('Receiver Entity Not Found');
        return done(new NotFoundError('Receiver Entity Not Found.'));
      }

      receiverEntity = new Entity(result[0]);

      done();
    });
  }], function(err) {
    if (err) {
      return next(err);
    }

    var response = {
      senderPerson: senderPerson,
      senderEntity: senderEntity,
      receiverEntity: receiverEntity,
      isAllowed: true
    };

    if (receiverEntity.type !== 'person') {
      logger.log('Receiver entity is not a person');
      response.isAllowed = false;
      logger.log(response);
      return next(null, response);
    }

    if (receiverEntity.isAnonymous) {
      logger.log('Receiver entity is anonymous');
      response.isAllowed = false;
      logger.log(response);
      return next(null, response);
    }

    next(err, response);
  });
});

ACL.allow('update', 'threads', 'Person', function(acl, data, next) {
  MessageThread.findById(data.threadId, function(err, result) {
    if (err) {
      return next(err);
    }
    if (result.length === 0) {
      logger.log('Thread not found');
      return next(new NotFoundError('Thread not found.'));
    }

    var thread = result[0];

    if (data.currentPersonId === thread.senderPersonId || data.currentPersonId === thread.receiverEntityId) {
      return next(null, true);
    }

    return next(null, false);
  });
});

ACL.allow('destroy', 'threads', 'Person', function(acl, data, next) {
  MessageThread.findById(data.threadId, function(err, result) {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      logger.log('Thread not found');
      return next(new NotFoundError('Thread not found.'));
    }

    var thread = result[0];

    if (data.currentPersonId === thread.senderPersonId || data.currentPersonId === thread.receiverEntityId) {
      return next(null, true);
    }

    return next(null, false);
  });
});

ACL.allow('searchPeople', 'threads', 'Person', function(acl, data, next) {
  if (data.currentPerson.isAnonymous) {
    logger.log('Current person is anonymous');
    return next(null, false);
  }

  return next(null, true);
});

/*
  ==================
  MessagesController
  ==================
*/

ACL.addResource(new ACL.Resource('messages'));

ACL.allow('create', 'messages', 'Person', function(acl, data, next) {
  MessageThread.findById(data.threadId, function(err, result) {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      logger.log('Thread not found');
      return next(new NotFoundError('Thread not found.'));
    }

    var thread = result[0];

    if (data.currentPersonId === thread.senderPersonId || data.currentPersonId === thread.receiverEntityId) {
      return next(null, true);
    }

    return next(null, false);
  });
});

ACL.allow('destroy', 'messages', 'Person', function(acl, data, next) {
  Message.findById(data.messageId, function(err, result) {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      logger.log('Message not found');
      return next(new NotFoundError('Message not found.'));
    }

    var message = result[0];

    if (data.currentPersonId === message.senderPersonId || data.currentPersonId === message.receiverEntityId) {
      return next(null, true);
    }

    return next(null, false);
  });
});

ACL.allow('acceptInvite', 'messages', 'Person', function(acl, data, next) {
  var currentPerson = data.currentPerson;
  currentPerson.id = hashids.decode(currentPerson.id)[0];

  var thread = data.thread;
  var message = data.message;
  var invitationRequest = data.invitationRequest;
  var voice = data.voice;
  var organization = data.organization;

  var isAllowed = true;

  if (currentPerson.id !== thread.senderPersonId && currentPerson.id !== thread.receiverEntityId) {
    logger.log('currentPerson.id !== thread.senderPersonId AND currentPerson.id !== thread.receiverEntityId');
    isAllowed = false;
  }

  if (message.threadId !== thread.id) {
    logger.log('Message.threadId !== thread.id');
    isAllowed = false;
  }

  if (!message.invitationRequestId) {
    logger.log('message.invitationRequestId is null or undefined');
    isAllowed = false;
  }

  if (invitationRequest.invitedEntityId !== currentPerson.id) {
    logger.log('Invited entity is not eq to currentPerson.id');
    isAllowed = false;
  }

  return next(null, isAllowed);
});

/*
  VoicesController
*/

ACL.allow('requestToContribute', 'voices', 'Person', function(acl, data, next) {
  var currentPerson = data.currentPerson;
  currentPerson.id = hashids.decode(currentPerson.id)[0];

  var voice;
  var profile;
  var owner = false;

  var senderPerson;
  var senderEntity;
  var receiverEntity;

  async.series([function(done) {
    Voice.findBySlug(data.voiceSlug, function(err, result) {
      if (err) {
        return done(err);
      }

      voice = result;
      done();
    });
  }, function(done) {
    Entity.find({profile_name: data.profileName}, function(err, result) {
      if (err) {
        return done(err);
      }

      if (result.length === 0) {
        logger.log('Profile not found');
        return done(new NotFoundError('Profile Not Found.'));
      }

      profile = new Entity(result[0]);

      if (profile.type === 'organization') {
        profile.owner(function(err, result) {
          if (err) {
            return done(err);
          }

          owner = new Entity(result);
          return done();
        });
      } else {
        return done();
      }
    });
  }], function(err) {
    if (err) {
      return next(err);
    }

    var response = {
      isAllowed: true,
      senderPerson: currentPerson,
      senderEntity: currentPerson,
      receiverEntity: profile,
      voice: voice
    };

    // Is anonymous voice
    if (voice.ownerId === 0) {
      logger.log('Is anonymous voice');
      response.isAllowed = false;
    }

    if (profile.type === 'organization') {
      response.senderPerson = profile;
      response.senderEntity = owner;
      response.receiverEntity = currentPerson;
    }

    return next(null, response);
  });
});

ACL.allow('myVoices', 'entities', 'Person', function (acl, data, next) {
  // we know person is not anonymous automatically

  // Check if profileName is his profile name

  // for the time being, always provides permission
  return(null, { isAllowed: true });
});
