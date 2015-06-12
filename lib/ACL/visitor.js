ACL.addRole(new ACL.Role('Visitor'));

ACL.addResource(new ACL.Resource('homepage'));

ACL.addResource(new ACL.Resource('signup'));

ACL.addResource(new ACL.Resource('login'));

ACL.addResource(new ACL.Resource('voices'));

ACL.addResource(new ACL.Resource('users'));

ACL.allow('show', 'homepage', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('show', 'signup', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('show', 'login', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('browse', 'voices', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('trending', 'voices', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('new', 'voices', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('topics', 'voices', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('new', 'users', 'Visitor', function(acl, data, next) {
  if (data.currentPerson) {
    return next(null, false)
  }

  return next(null, true);
});

ACL.allow('create', 'users', 'Visitor', function(acl, data, next) {
  if (data.currentPerson) {
    return next(null, false)
  }

  return next(null, true);
});

ACL.allow('checkUsername', 'users', 'Visitor', function(acl, data, next) {
  if (data.currentPerson) {
    return next(null, false)
  }

  return next(null, true);
});

/* ====================
   PostController
   ====================
*/
ACL.addResource(new ACL.Resource('posts'));

ACL.allow('show', 'posts', 'Visitor', function(acl, data, next) {
  var entity = data.entity;
  var voice = data.voice;
  var post = data.post;

  if (entity.type === 'person') {
    User.find({entity_id : entity.id}, function(err, user) {
      if (err) {
        return next(err);
      }

      if (user.length === 0) {
        return next(new NotFoundError('User not found'))
      }

      user = new User(user[0]);

      if (user.deleted) {
        return next(null, false);
      }

      if (voice.status !== Voice.STATUS_PUBLISHED) {
        return next(null, false);
      }

      return next(null, true);
    })
  }
})
