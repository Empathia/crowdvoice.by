ACL.addRole(new ACL.Role('Person'), ['Visitor']);

ACL.addResource(new ACL.Resource('threads'));

ACL.allow('show', 'threads', 'Person', function(acl, args) {


  return true
});

ACL.allow('create', 'threads', 'Person', function (acl, args) {
  var data = args[0];
  var callback = args[1]

  if (data.senderPersonId === data.receiverEntityId) {
    return callback(null, false);
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
      return callback(err)
    }

    if (receiverEntity.type !== 'person') {
      return callback(null, false);
    }
  });
});
