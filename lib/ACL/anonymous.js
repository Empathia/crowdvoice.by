ACL.addRole(new ACL.Role('Anonymous'), ['Visitor']);

ACL.addResource(new ACL.Resource('threads'));

ACL.allow('show', 'threads', 'Anonymous', function (acl, args, next) {
  return next(null, true);
});

var findAnonRealEntity = function (currentPerson, callback) {
  currentPerson.id = hashids.decode(currentPerson.id)[0]
  var person = new Entity(currentPerson)

  person.owner(function (err, result) {
    if (err) { return callback(err) }

    if (currentPerson.isAnonymous) {
      return callback(null, new Entity(result))
    } else {
      return callback(null, new Entity(currentPerson))
    }
  })
}

/*
  =======================
  PostsController
  ======================
*/

ACL.allow('create', 'posts', 'Anonymous', function(acl, data, next) {
  var currentPerson;

  currentPerson = data.currentPerson
  currentPerson.id = hashids.decode(currentPerson.id)[0];

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

ACL.allow(['update', 'destroy'], 'posts', 'Anonymous', function(acl, data, next) {
  var currentPerson;

  currentPerson = data.currentPerson
  currentPerson.id = hashids.decode(currentPerson.id)[0];

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


  currentPerson = data.currentPerson
  currentPerson.id = hashids.decode(currentPerson.id)[0];

  var profile;
  var isVoiceCollaborator = false;
  var isOrganizationMember = false;
  var isOrganizationOwner = false;

  async.series([function(done) {
    var person = new Entity(data.currentPerson);

    person.owner(function(err, result) {
      if (err) {return done(err)};

      if (currentPerson.isAnonymous) {
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
    currentPerson.isOwnerOf(profile.id, function(err, result) {
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

    if (isVoiceCollaborator) {
      response.allowPostEditing = true;
    }

    if (isOrganizationMember) {
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

ACL.allow(['create'], 'voices', 'Anonymous', function(acl, data, next) {
  return next(null, { isAllowed : true });
});

ACL.allow(['update', 'isVoiceSlugAvailable'], 'voices', 'Anonymous', function(acl, data, next) {
  var currentPerson = data.currentPerson;

  var voice = data.voice;

  var isAllowed = false;

  if (hashids.decode(currentPerson.id)[0] === voice.ownerId) {
    isAllowed = true;
  }

  return next(null, {isAllowed : isAllowed});
})

/* ENTITIES */

ACL.allow('myVoices', 'entities', 'Anonymous', function (acl, data, next) {
  // if the profile we're looking at (currentEntity) is the same as the user
  // that is logged in as anonymous (currentPerson)
  if (data.currentEntity.profileName === data.currentPerson.profileName) {
    findAnonRealEntity(data.currentPerson, function (err, result) {
      if (err) { return next(err) }

      return next(null, { isAllowed: true, entity: result })
    })
  } else {
    return next(null, { isAllowed: false });
  }
});

ACL.allow('feed', 'entities', 'Anonymous', function (acl, data, next) {
  var isOrg = false,
    isAllowed = false,
    profileEntity,
    returnFollower;

  async.series([
    // does the profile name belong to an organization?
    function (next) {
      Entity.find({ profile_name: data.entityProfileName }, function (err, result) {
        if (err) { return next(err); }

        // it's an org, the next step will be skipped
        if (result[0].type === 'organization') {
          isOrg = true;
        }

        // we need this anyhow
        profileEntity = new Entity(result[0]);

        next();
      });
    },

    // in the case that it's not an org
    function (next) {
      // not an org, check if profile and currentPerson are the same
      if (!isOrg) {
        if (data.entityProfileName === data.currentPerson.profileName) {
          // he is allowed since they are the same person
          isAllowed = true;
          // we'll return the feed for the owner of profile
          returnFollower = profileEntity;
        }
      }

      next();
    },

    // in the case that it *is* an org
    function (next) {
      if (isOrg) {
        // gotta make sure we have the info we need
        findAnonRealEntity(data.currentPerson, function (err, currentPerson) {
          if (err) { return next(err); }

          // find the ownership
          EntityOwner.find({
            owned_id: profileEntity.id
          }, function (err, ownership) {
            if (err) { return next(err); }

            if (ownership[0].ownerId === currentPerson.id) {
              // is owner so he is allowed
              isAllowed = true;
              // get the feed for the org
              returnFollower = profileEntity;
            }

            next();
          });
        });
      } else {
        next();
      }
    }
  ], function (err) {
    if (err) { return next(err); }

    return next(null, { isAllowed: isAllowed, follower: returnFollower });
  });
});

ACL.allow('savedPosts', 'entities', 'Anonymous', function(acl, data, next) {
  if (data.currentEntity.profileName === data.currentPerson.profileName) {
    findAnonRealEntity(data.currentPerson, function (err, result) {
      if (err) { return next(err); }

      return next(null, { isAllowed: true, entity: result });
    });
  } else {
    return next(null, { isAllowed: false });
  }
});

ACL.allow('getNotifications', 'entities', 'Anonymous', function (acl, data, next) {
  // although the person is anonymous, they do have a feed to look at
  if (data.currentEntity.profileName === data.currentPerson.profileName) {
    return next(null, { isAllowed: true });
  } else {
    return next(null, { isAllowed: false });
  }
});
