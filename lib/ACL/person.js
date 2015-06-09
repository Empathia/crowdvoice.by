ACL.addRole(new ACL.Role('Person'), ['Visitor']);

ACL.addResource(new ACL.Resource('threads'));

ACL.allow('show', 'threads', 'Person', function (acl, args, next) {
  if (args.currentPerson.isAnonymous) {
    return next(null, false);
  }

  return next(null, true);
});

ACL.allow('create', 'threads', 'Person', function (acl, args, next) {
  var data = args;

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

    next(err, true);
  });
});
