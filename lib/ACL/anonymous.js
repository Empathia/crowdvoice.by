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
  }

  var voice;
  var profile;
  var isVoiceCollaborator = false;
  var isOrganizationMember = false;

  async.series([function(done){
    if (!currentPerson) {
      data.currentPerson.owner(function(err, result) {
        if (err) {return done(err)};

        currentPerson = new Entity(result);
      })
    }
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

    if (voice.type === Voice.TYPE_CLOSED) {

      if (currentPerson.id === voice.ownerId) {
        return next(null, true);
      }

      if (isVoiceCollaborator === true) {
        return next(null, true);
      }

      if (isOrganizationMember === true) {
        return next(null, true);
      }

      return next(null, false);
    }
  })
})

