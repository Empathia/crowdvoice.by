ACL.addRole(new ACL.Role('Anonymous'), ['Visitor']);

ACL.allow('show', 'threads', 'Anonymous', function (acl, args, next) {
  return next(null, true);
});

var findAnonRealEntity = function (currentPerson, callback) {
  var person = new Entity(currentPerson);
  person.id = hashids.decode(person.id)[0];

  person.owner(function (err, result) {
    if (err) { return callback(err) }

    if (currentPerson.isAnonymous) {
      return callback(null, new Entity(result))
    } else {
      return callback(null, new Entity(person))
    }
  })
}

/*
  =======================
  PostsController
  =======================
*/

ACL.allow(['preview', 'create'], 'posts', 'Anonymous', function(acl, data, next) {
  var currentPerson,
    voice,
    profile,
    isVoiceCollaborator = false,
    isOrganizationMember = false;

  async.series([function(done){
    var person = new Entity(data.currentPerson);
    person.id = hashids.decode(person.id)[0];

    person.owner(function(err, result) {
      if (err) {return done(err)};

      if (data.currentPerson.isAnonymous) {
        currentPerson = new Entity(result);
      } else {
        currentPerson = new Entity(person);
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
    Entity.find({
      profile_name: data.profileName
    }, function(err, result) {
      if (err) {return next(err)}

      if (result.length === 0) { return next(new NotFoundError('Profile not found'))};

      profile = new Entity(result[0]);

      done();
    })
  }, function(done) {
    VoiceCollaborator.find({
      voice_id: voice.id,
      collaborator_id: currentPerson.id
    }, function(err, result) {
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

ACL.allow(['update', 'destroy', 'deleteOlderThan', 'deleteAllUnmoderated'], 'posts', 'Anonymous', function(acl, data, next) {
  var currentPerson,
    voice,
    profile,
    isVoiceCollaborator = false,
    isOrganizationMember = false;

  async.series([function(done){
    var person = new Entity(data.currentPerson);
    person.id = hashids.decode(person.id)[0];

    person.owner(function(err, result) {
      if (err) {return done(err)};

      if (data.currentPerson.isAnonymous) {
        currentPerson = new Entity(result);
      } else {
        currentPerson = new Entity(person);
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

ACL.allow(['inviteToContribute', 'removeContributor'], 'voices', 'Anonymous', function (acl, data, respond) {
  /*
   * data = {
   *   currentPerson,
   *   voiceId
   * }
   */

  var voice,
    currentPerson,
    isAllowed = false;

  async.series([
    // get currentPerson
    function (next) {
      findAnonRealEntity(data.currentPerson, function (err, person) {
        if (err) { return next(err); }

        currentPerson = person;

        return next();
      });
    },

    // get voice
    function (next) {
      Voice.findById(data.voiceId, function (err, result) {
        if (err) { return next(err); }

        voice = result[0];

        return next();
      });
    },

    // check if entity is voice owner
    function (next) {
      if (voice.ownerId === currentPerson.id) {
        isAllowed = true;
      }

      return next();
    },
  ], function (err) { // async.series
    if (err) { return respond(err); }

    return respond(null, {
      isAllowed: isAllowed,
      owner: currentPerson,
      voice: voice
    });
  });
});

ACL.allow('show', 'voices', 'Anonymous', function(acl, data, next) {
  var voice = data.voice;
  var currentPerson;
  var anonymous = false;
  var profile;
  var isVoiceCollaborator = false;
  var isOrganizationMember = false;
  var isOrganizationOwner = false;
  var isVoiceOwner = false;

  async.series([function(done) {
    currentPerson = new Entity(data.currentPerson);
    currentPerson.id = hashids.decode(currentPerson.id)[0];

    if (!currentPerson.isAnonymous) {
      return done();
    }

    // if its anonymous get the real entity
    currentPerson.owner(function(err, result) {
      if (err) {
        return done(err);
      }

      // currentPerson is now not an anonymous entity.
      currentPerson = new Entity(result);

      done();
    });
  }, function(done) {
    if (data.profileName.search(/anonymous/) !== -1) {
      profile = false;
      return done();
    }

    Entity.find({profile_name : data.profileName}, function(err, result) {
      if (err) {return next(err)}

      if (result.length === 0) { return next(new NotFoundError('Profile not found'))};

      profile = new Entity(result[0]);

      done();
    })
  }, function(done) {
    VoiceCollaborator.find({
      voice_id: voice.id,
      collaborator_id: currentPerson ? currentPerson.id : 0
    }, function(err, result) {
      if (err) { return next(err); }

      if (result.length > 0) {
        isVoiceCollaborator = true
      };

      done();
    })
  }, function(done) {
    currentPerson.isMemberOf(voice.ownerId, function(err, isMember) {
      if (err) { return done(err); }

      isOrganizationMember = isMember;

      done();
    })
  }, function(done) {
    currentPerson.isOwnerOf(voice.ownerId, function(err, result) {
      if (err) { return done(err); }

      isOrganizationOwner = result;

      done();
    })
  }, function (done) {
    if (voice.ownerId === currentPerson.id) {
      isVoiceOwner = true;
    }

    return done();
  }], function(err) {
    if (err) {
      return next(err);
    }

    var response = {
      isAllowed : true,
      allowPosting : false,
      allowPostEditing : false
    }

    if (profile) {
      if (profile.id !== voice.ownerId) {
        response.isAllowed = false;
      }
    }

    if (isVoiceOwner) {
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

    if (voice.status !== Voice.STATUS_PUBLISHED) {
      response.isAllowed = false;

      if (isOrganizationOwner || isVoiceOwner) {
        response.isAllowed = true;
      }
    }

    if (voice.type === Voice.TYPE_CLOSED) {
      if (isVoiceOwner) {
        response.allowPosting = true;
      }

      if (isVoiceCollaborator) {
        response.allowPosting = true;
      }

      if (isOrganizationOwner) {
        response.allowPosting = true;
      }

      if (isOrganizationMember) {
        response.allowPosting = true;
      }
    } else {
      response.allowPosting = true;
    }

    return next(null, response);

  })

})

ACL.allow(['create'], 'voices', 'Anonymous', function(acl, data, next) {
  return next(null, { isAllowed : true });
});

ACL.allow(['destroy', 'edit', 'update', 'isVoiceSlugAvailable'], 'voices', 'Anonymous', function(acl, data, next) {
  var currentPerson = new Entity(data.currentPerson);
  var voice = new Voice(data.voice);

  return next(null, { isAllowed: hashids.decode(currentPerson.id)[0] === voice.ownerId });
});

ACL.allow('archiveVoice', 'voices', 'Anonymous', function (acl, data, respond) {
  data.currentPersonId = hashids.decode(data.currentPersonId)[0];
  data.activeVoiceId = data.voiceId;

  Entity.findById(data.currentPersonId, function (err, currentPerson) {
    if (err) { return respond(err); }

    var currentPerson = new Entity(currentPerson[0]);
    var owner;

    currentPerson.owner(function (err, result) {
      if (err) { return respond(err); }

      if (currentPerson.isAnonymous) {
        owner = new Entity(result);
      } else {
        owner = currentPerson;
      }

      Voice.findById(data.activeVoiceId, function (err, activeVoice) {
        if (activeVoice.length !== 0 && activeVoice[0].ownerId === owner.id) {
          return respond(null, true);
        } else {
          return respond(null, false);
        }
      });
    });
  });
});

/* ENTITIES */

ACL.allow(['myVoices', 'getOrganizations'], 'entities', 'Anonymous', function (acl, data, next) {
  // if the profile we're looking at (currentEntity) is the same as the user
  // that is logged in as anonymous (currentPerson)
  if (data.currentEntity.profileName === data.currentPerson.profileName) {
    findAnonRealEntity(data.currentPerson, function (err, result) {
      if (err) { return next(err); }

      return next(null, { isAllowed: true, entity: result });
    });
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
  var currentPerson = data.currentPerson;

  if (data.currentEntity.profileName === data.currentPerson.profileName) {
    findAnonRealEntity(currentPerson, function (err, result) {
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

// Notifications

ACL.allow('markAsRead', 'notifications', 'Anonymous', function (acl, data, respond) {
  /* data = {
   *   currentPerson
   *   notificationId
   * }
   */

  findAnonRealEntity(data.currentPerson, function (err, currentPerson) {
    if (err) { return respond(err); }

    EntityOwner.find({ owner_id: currentPerson.id }, function (err, entities) {
      var ids = entities.map(function (entity) { return entity.id })
      ids.push(currentPerson.id)

      db('Notifications')
        .whereIn('follower_id', ids)
        .andWhere('read', '=', false)
        .andWhere('id', '=', hashids.decode(data.notificationId)[0])
        .exec(function (err, result) {
          if (err) { return next(err) }

          return respond(null, result.length > 0);
        });
    });
  });
});

ACL.allow('markAllAsRead', 'notifications', 'Anonymous', function (acl, data, respond) {
  return respond(null, true);
});

/* =====
 * ADMIN
 * =====
 */

var isAdmin = function (currentPerson, next) {
  findAnonRealEntity(currentPerson, function (err, realEntity) {
    if (err) { return next(err); }

    return next(null, realEntity.isAdmin);
  });
}

ACL.allow('index', 'admin', 'Anonymous', function(acl, data, next) {
  return isAdmin(data.currentPerson, next);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'], 'admin.people', 'Anonymous', function(acl, data, next) {
  return isAdmin(data.currentPerson, next);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'], 'admin.organizations', 'Anonymous', function(acl, data, next) {
  return isAdmin(data.currentPerson, next);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'], 'admin.users', 'Anonymous', function(acl, data, next) {
  return isAdmin(data.currentPerson, next);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'], 'admin.voices', 'Anonymous', function(acl, data, next) {
  return isAdmin(data.currentPerson, next);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'], 'admin.topics', 'Anonymous', function(acl, data, next) {
  return isAdmin(data.currentPerson, next);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy', 'updatePositions', 'searchVoices'], 'admin.featuredVoices', 'Anonymous', function(acl, data, next) {
  return isAdmin(data.currentPerson, next);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy', 'updatePositions', 'searchEntities'], 'admin.featuredEntities', 'Anonymous', function(acl, data, next) {
  return isAdmin(data.currentPerson, next);
});
