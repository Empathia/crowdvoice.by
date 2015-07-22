ACL.addRole(new ACL.Role('Visitor'));

ACL.addResource(new ACL.Resource('homepage'));
ACL.addResource(new ACL.Resource('signup'));
ACL.addResource(new ACL.Resource('login'));
ACL.addResource(new ACL.Resource('voices'));
ACL.addResource(new ACL.Resource('users'));
ACL.addResource(new ACL.Resource('entities'));

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
});

ACL.allow('create', 'posts', 'Visitor', function(acl, data, next) {
  var voice;



  var currentPerson = new Entity({
    id : 0,
    name : 'Anonymous',
    lastname : '',
    type : 'person',
    profileName : 'anonymous_guest',
    isAnonymous : false
  });


  async.series([function(done) {
    Voice.findBySlug(data.voiceSlug, function(err, result) {

      if (err) {return done(err)};

      voice = new Voice(result);

      done();
    })
  }], function(err) {
    if (err) {return next(err)}

    if (voice.type === Voice.TYPE_CLOSED) {
      return next(null, {
        voice : voice,
        currentPerson : currentPerson,
        isAllowed : false
      })
    }

    return next(null, {
      voice : voice,
      currentPerson : currentPerson,
      isAllowed : true
    })
  })
});

ACL.allow('update', 'posts', 'Visitor', function(acl, data, next) {
  return next(null, {
    isAllowed : false
  })
});

/* ====================
   VoicesController
   ====================
*/

ACL.allow('show', 'voices', 'Visitor', function(acl, data, next) {
  var voice = data.voice;

  var result = {
    isAllowed : true,
    allowPosting : false,
    allowPostEditing : false
  }

  if (voice.type === Voice.TYPE_CLOSED) {
    return next(null, result);
  } else {
    result.allowPosting = true
    return next(null, result);
  }
});

ACL.allow('requestToContribute', 'voices', 'Visitor', function(acl, data, next) {
  return(null, {isAllowed : false});
})

/* ====================
   ThreadsController
   ====================
*/
ACL.allow('show', 'threads', 'Visitor', function (acl, args, next) {
  return next(null, false);
});

/* ENTITIES */

ACL.allow('myVoices', 'entities', 'Visitor', function (acl, args, next) {
  // visitors are never allowed because they don't have an account to look at
  return next(null, { isAllowed: false });
});

ACL.allow('savedPosts', 'entities', 'Visitor', function(acl, args, next) {
  return next(null, {isAllowed : false });
});

ACL.allow('feed', 'entities', 'Visitor', function (acl, args, next) {
  // visitors are never allowed because they don't have an account to look at
  return next(null, { isAllowed: false });
});

ACL.allow('isProfileNameAvailable', 'entities', 'Visitor', function(acl, data, next) {
  return next(null, { isAllowed : false });
});

ACL.allow('edit', 'entities', 'Visitor', function(acl, data, next) {
  return next(null, { isAllowed : false });
});

ACL.allow('update', 'entities', 'Visitor', function(acl, data, next) {
  return next(null, { isAllowed : false });
});
