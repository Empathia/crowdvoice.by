ACL.addRole(new ACL.Role('Anonymous'), ['Visitor']);

ACL.addResource(new ACL.Resource('threads'));

ACL.allow('show', 'threads', 'Anonymous', function (acl, args, next) {
  return next(null, true);
});

/*
  =======================
  PostsController
  ======================
*/

ACL.allow('create', 'posts', 'Anonymous', function(acl, data, next) {
  var currentPerson;

  if (!data.currentPerson.isAnonymous) {
    currentPerson = data.currentPerson
    currentPerson.id = hashids.decode(currentPerson.id)[0];
  }

  var voice;
  var profile;
  var isVoiceCollaborator = false;
  var isOrganizationMember = false;

  async.series([function(done){
    var person = new Entity(data.currentPerson);

    person.owner(function(err, result) {
      if (err) {return done(err)};

      if (data.currentPerson.isAnonymous) {
        currentPerson = new Entity(result);
      } else {
        currentPerson = new Entity(currentPerson);
      }

      return done();

    });
  },function(done) {
    Voice.findBySlug(data.voiceSlug, function(err, result) {

      if (err) {return done(err)};

      voice = new Voice(result);

      done();
    })
  }, function(done) {
    Entity.find({profile_name : data.profileName}, function(err, result) {
      if (err) {return next(err)}

      if (result.length === 0) { return next(new NotFoundError('Profile not found'))};

      profile = new Entity(result[0]);

      done();
    })
  }, function(done) {
    VoiceCollaborator.find({voice_id : voice.id, collaborator_id : currentPerson.id}, function(err, result) {
      if (err) {return next(err)}

      if (result.length !== 0) { isVoiceCollaborator = true };

      done();
    })
  }, function(done) {
    currentPerson.isMemberOf(profile.id, function(err, isMember) {

      isOrganizationMember = isMember;

      done();
    })
  }], function(err) {
    if (err) {return next(err)}

    var response = {
      voice : voice,
      currentPerson : currentPerson,
      isVoiceCollaborator : isVoiceCollaborator,
      isOrganizationMember : isOrganizationMember,
      isAllowed : false
    }

    if (voice.type === Voice.TYPE_CLOSED) {

      if (currentPerson.id === voice.ownerId) {
        response.isAllowed = true;
        return next(null, response);
      }

      if (isVoiceCollaborator === true) {
        response.isAllowed = true;
        return next(null, response);
      }

      if (isOrganizationMember === true) {
        response.isAllowed = true;
        return next(null, response);
      }

      response.isAllowed = false;
      return next(null, response);
    }

    response.isAllowed = true;
    return next(null, response);

  })
});

ACL.allow('update', 'posts', 'Anonymous', function(acl, data, next) {
  var currentPerson;

  if (!data.currentPerson.isAnonymous) {
    currentPerson = data.currentPerson
    currentPerson.id = hashids.decode(currentPerson.id)[0];
  }

  var voice;
  var profile;
  var isVoiceCollaborator = false;
  var isOrganizationMember = false;

  async.series([function(done){
    var person = new Entity(data.currentPerson);

    person.owner(function(err, result) {
      if (err) {return done(err)};

      if (data.currentPerson.isAnonymous) {
        currentPerson = new Entity(result);
      } else {
        currentPerson = new Entity(currentPerson);
      }

      return done();

    });
  },function(done) {
    Voice.findBySlug(data.voiceSlug, function(err, result) {

      if (err) {return done(err)};

      voice = new Voice(result);

      done();
    })
  }, function(done) {
    Entity.find({profile_name : data.profileName}, function(err, result) {
      if (err) {return next(err)}

      if (result.length === 0) { return next(new NotFoundError('Profile not found'))};

      profile = new Entity(result[0]);

      done();
    })
  }, function(done) {
    VoiceCollaborator.find({voice_id : voice.id, collaborator_id : currentPerson.id}, function(err, result) {
      if (err) {return next(err)}

      if (result.length !== 0) { isVoiceCollaborator = true };

      done();
    })
  }, function(done) {
    currentPerson.isMemberOf(profile.id, function(err, isMember) {

      isOrganizationMember = isMember;

      done();
    })
  }, function(done) {
    currentPerson.isOwnerOf(profile.id, function(err, result) {
      if (err) {
        return done(err);
      }

      isOrganizationOwner = result;
      done();
    })
  }], function(err) {
    if (err) {return next(err)}

    var response = {
      voice : voice,
      currentPerson : currentPerson,
      isVoiceCollaborator : isVoiceCollaborator,
      isOrganizationMember : isOrganizationMember,
      isAllowed : false
    }

    if (currentPerson.id === voice.ownerId) {
      response.isAllowed = true;
    }

    if (isVoiceCollaborator === true) {
      response.isAllowed = true;
    }

    if (isOrganizationOwner) {
      response.isAllowed = true;
    }

    if (isOrganizationMember === true) {
      response.isAllowed = true;
    }

    return next(null, response);

  })
});

/* ====================
   VoicesController
   ====================
*/

ACL.allow('show', 'voices', 'Anonymous', function(acl, data, next) {
  var voice = data.voice;
  var currentPerson;

  if (!data.currentPerson.isAnonymous) {
    currentPerson = data.currentPerson
    currentPerson.id = hashids.decode(currentPerson.id)[0];
  }

  var profile;
  var isVoiceCollaborator = false;
  var isOrganizationMember = false;
  var isOrganizationOwner = false;

  async.series([function(done) {
    var person = new Entity(data.currentPerson);

    person.owner(function(err, result) {
      if (err) {return done(err)};

      if (data.currentPerson.isAnonymous) {
        currentPerson = new Entity(result);
      } else {
        currentPerson = new Entity(currentPerson);
      }

      return done();

    });
  }, function(done) {
    Entity.find({profile_name : data.profileName}, function(err, result) {
      if (err) {return next(err)}

      if (result.length === 0) { return next(new NotFoundError('Profile not found'))};

      profile = new Entity(result[0]);

      done();
    })
  }, function(done) {
    VoiceCollaborator.find({voice_id : voice.id, collaborator_id : currentPerson ? currentPerson.id : 0}, function(err, result) {
      if (err) {return next(err)}

      if (result.length !== 0) { isVoiceCollaborator = true };

      done();
    })
  }, function(done) {
    currentPerson.isMemberOf(profile.id, function(err, isMember) {

      isOrganizationMember = isMember;

      done();
    })
  }, function(done) {
    currentPerson.isOwnerOf(profileId, function(err, result) {
      if (err) {
        return done(err);
      }

      isOrganizationOwner = result;
      done();
    })
  }], function(err) {
    if (err) {
      return next(err);
    }

    var response = {
      isAllowed : true,
      allowPosting : false,
      allowPostEditing : false
    }

    if (currentPerson.id === voice.ownerId) {
      response.allowPostEditing = true;
    }

    if (isVoiceCollaborator === true) {
      response.allowPostEditing = true;
    }

    if (isOrganizationMember === true) {
      response.allowPostEditing = true;
    }

    if (isOrganizationOwner) {
      response.allowPostEditing = true;
    }

    if (voice.type === Voice.TYPE_CLOSED) {
      if (currentPerson.id === voice.ownerId) {
        response.allowPosting = true;
        return next(null, response);
      }

      if (isVoiceCollaborator === true) {
        response.allowPosting = true;
        return next(null, response);
      }

      if (isOrganizationOwner == true) {
        response.allowPosting = true;
        return next(null, response);
      }

      if (isOrganizationMember === true) {
        response.allowPosting = true;
        return next(null, response);
      }

      return next(null, response);
    } else {
      response.allowPosting = true;
      return next(null, response);
    }

  })

})
