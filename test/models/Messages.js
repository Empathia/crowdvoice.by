#!/usr/bin/env node

require('neonode-core');

CONFIG.database.logQueries = false;

require('tellurium');

require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});

Tellurium.suite('Messages Model')(function() {
  var suite = this;
  this.setup(function() {
    var setup = this;

    async.waterfall([
      function(callback) {
        var senderPerson = new Entity({
          type : 'person',
          name : 'Sender Person',
          lastname : 'LastName',
          profileName : 'sender_person_profile',
          isAnonymous : false
        });

        senderPerson.save(function(err, result) {
          suite.registry.senderPerson = senderPerson;

          callback(err, senderPerson);
        })
      },
      function(senderPerson, callback) {
        var user = new User({
          username : 'sender',
          email : 'sender@test.com',
          password : '12345678',
          entityId : senderPerson.id
        });

        user.save(function(err, result) {
          suite.registry.senderUser = user;

          callback(err, senderPerson);
        });
      },
      function(senderPerson, callback) {
        var senderOrganization = new Entity({
          type : 'organization',
          name : 'Sender Organization',
          lastname : 'LastName',
          profileName : 'sender_organization_profile',
          isAnonymous : false
        });

        senderOrganization.save(function(err, result) {
          senderPerson.ownOrganization(senderOrganization, function(err, data) {
            suite.registry.senderOrganization = senderOrganization;

            callback(err, senderOrganization)
          });
        })
      },
      function(senderOrganization, callback) {
        var receiverEntity = new Entity({
          type : 'person',
          name : 'Receiver Person',
          lastname : 'LastName',
          profileName : 'receiver_person_profile',
          isAnonymous : false
        });

        receiverEntity.save(function(err, result) {
          suite.registry.receiverEntity = receiverEntity;
          callback(err, receiverEntity)
        })
      },
      function(receiverEntity, callback) {
        var user = new User({
          username : 'receiver',
          email : 'receiver@test.com',
          password : '12345678',
          entityId : receiverEntity.id
        });

        user.save(function(err, result) {
          suite.registry.receiverUser = user;
          callback(err, user);
        });
      },
      function(receiverUser, callback) {
        var thread = new MessageThread({
          senderPersonId : suite.registry.senderPerson.id,
          senderEntityId : suite.registry.senderPerson.id,
          receiverEntityId : suite.registry.receiverEntity.id
        });

        thread.save(function(err, result) {
          suite.registry.thread = thread;
          callback(err, thread);
        })
      },
      function(thread, callback) {
        var invitation = new InvitationRequest({
          invitatorEntityId : suite.registry.senderPerson.id,
          invitedEntityId : suite.registry.receiverEntity.id
        });

        invitation.save(function(err, result) {
          suite.registry.invitation = invitation;
          callback(err, invitation);
        })
      }
    ], function(err, result) {
      if (err) {
        throw new Error(err);
      }

      console.log('Finished setup!')
      setup.completed();

    })
  });

  this.describe('Validations')(function(desc) {
    desc.beforeEach(function(spec) {
      spec.registry.message = {
        type : Message.TYPE_MESSAGE,
        senderPersonId : null,
        senderEntityId : null,
        receiverEntityId : null,
        threadId : null,
        invitationRequestId : null,
        voiceId : null,
        organizationId : null,
        message : null,
        hiddenForSender : false,
        hiddenForReceiver : false
      }
    });

    desc.specify('Pass Validation')(function(spec) {
      var thread = suite.registry.thread;

      var message = new Message({
        type : Message.TYPE_MESSAGE,
        senderPersonId : suite.registry.senderPerson.id,
        senderEntityId : suite.registry.senderPerson.id,
        receiverEntityId : suite.registry.receiverEntity.id,
        threadId : thread.id,
        message : 'hola'
      })

      message.isValid(function(valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      });
    })

    desc.specify('Fail Validation')(function(spec) {
      var message = new Message({
        type : Message.TYPE_MESSAGE,
        senderPersonId : suite.registry.senderPerson.id,
        senderEntityId : suite.registry.senderPerson.id,
        receiverEntityId : suite.registry.receiverEntity.id,
        threadId : 9876,
        message : 'hola'
      })

      message.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    desc.specify('Pass create a message With Thread.createMessage Factory')(function(spec) {
      var thread = suite.registry.thread;

      thread.createMessage({
        type : Message.TYPE_MESSAGE,
        senderPersonId : suite.registry.senderPerson.id,
        message : 'Hola'
      }, function(err, result) {
        spec.assert(result.id).toBeGreaterThan(0);
        spec.completed();
      });

    });

    desc.specify('Fail create a message With Thread.createMessage Factory')(function(spec) {
      var thread = suite.registry.thread;

      thread.createMessage({
        type : Message.TYPE_MESSAGE,
        senderPersonId : 1234,
        message : 'Hola'
      }, function(err, result) {
        spec.assert(result.id).toBe(undefined);
        spec.completed();
      });

    });

    desc.afterEach(function(spec) {

    })
  });

  this.tearDown(function() {
    var teardown = this;
    db('Users').del().exec(function(err, data) {
      db('MessageThreads').del().exec(function(err, data) {
        db('Messages').del().exec(function(err, data) {
          db('Entities').del().exec(function(err, data) {
            db('EntityOwner').del().exec(function(err, data) {
              console.log('teardown completed')
              teardown.completed();
            })
          })
        })
      })
    })

  });
});

Tellurium.run();
