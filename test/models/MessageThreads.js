#!/usr/bin/env node

require('neonode-core');

CONFIG.database.logQueries = false;

require('tellurium');

require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});

Tellurium.suite('MessageThread Model')(function() {
  var suite = this;
  this.setup(function() {
    var setup = this;

    async.series([
      function(callback) {
        var senderPerson = new Entity({
          type : 'person',
          name : 'Person Name',
          lastname : 'Person LastName',
          profileName : 'Person_Profile',
          isAnonymous : false
        });

        senderPerson.save(function(err, result) {
          callback(err, senderPerson);
        });
      },
      function(callback) {
        var senderOrganization = new Entity({
          type : 'organization',
          name : 'Organization Name',
          lastname : 'Organization LastName',
          profileName : 'org_profile',
          isAnonymous : false
        });

        senderOrganization.save(function(err, result) {
          callback(err, senderOrganization);
        })
      },
      function(callback) {
        var receiverEntity = new Entity({
          type : 'person',
          name : 'Receiver Name',
          lastname : 'Receiver LastName',
          profileName : 'receiver_profile',
          isAnonymous : false
        })

        receiverEntity.save(function(err, result) {
          callback(err, receiverEntity);
        })
      }, function(callback) {
        var user = new User({
          username : 'sender',
          email : 'sender@test.com',
          password : '12345678',
          entityId : 0
        });

        user.save(function(err, result) {
          callback(err, user);
        })
      },

      function(callback) {
        var user = new User({
          username : 'receiver',
          email : 'receiver@test.com',
          password : '12345678',
          entityId : 0
        });

        user.save(function(err, result) {
          callback(err, user);
        })
      }
    ], function(err, result) {
      if (err) {
        throw new Error(err);
      }

      suite.registry.senderPerson        =  result[0];
      suite.registry.senderOrganization  =  result[1];
      suite.registry.receiverPerson      =  result[2];
      suite.registry.user                =  result[3];
      suite.registry.receiverUser        =  result[4];

      suite.registry.user.entityId          = suite.registry.senderPerson.id;
      suite.registry.receiverUser.entityId  = suite.registry.receiverPerson.id;

      suite.registry.user.save(function(err, data) {
        if (err) {
          throw new Error(err)
        }

        suite.registry.receiverUser.save(function(err, result) {
          if (err) {
            throw new Error(err);
          }

          setup.completed()
        });

      })

    })

  })

  this.describe('Validations')(function(desc) {

    desc.beforeEach(function(spec){
      spec.registry.thread = {
        senderPersonId : null,
        senderEntityId : null,
        receiverEntityId : null,
        hiddenForSender : false,
        hiddenForReceiver : false,
        lastSeenSender : null,
        lastSeenReceiver : null,
        messageCountSender : 0,
        messageCountReceiver : 0,
      }
    });

    desc.specify('Fail Validation when senderPersonId is not presents')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderEntityId   = suite.registry.senderPerson.id;
      thread.receiverEntityId = suite.registry.receiverPerson.id;

      thread.isValid(function(valid){
        spec.assert(valid).toBe(false);
        spec.completed();
      })
    });

    desc.specify('Fail Validation when senderPerson user is deactivated')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderEntityId   = suite.registry.senderPerson.id;
      thread.receiverEntityId = suite.registry.receiverPerson.id;

      var user = suite.registry.user;

      setTimeout(function() {
        user.deleted = true;

        user.save(function(err, response) {
          if (err) {
            throw new Error(err);
          }

          thread.isValid(function(valid){
            user.deleted = false;

            user.save(function(err, data) {
              spec.assert(valid).toBe(false);
              spec.completed();
            });
          })

        });
      }, 1000);
    });

    desc.specify('Fail when the senderPerson is not a person')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderPersonId   = suite.registry.senderOrganization.id;
      thread.senderEntityId   = suite.registry.senderOrganization.id;
      thread.receiverEntityId = suite.registry.receiverPerson.id;

      thread.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      })
    });

    desc.specify('Pass when senderPerson is the same as senderEntity')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderPersonId   = suite.registry.senderPerson.id;
      thread.senderEntityId   = suite.registry.senderPerson.id;
      thread.receiverEntityId = suite.registry.receiverPerson.id;

      thread.isValid(function(valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      })
    });

    desc.specify('Fail when receiverEntity doesnt exists')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderPersonId   = suite.registry.senderPerson.id;
      thread.senderEntityId   = suite.registry.senderPerson.id;
      thread.receiverEntityId = 12345;

      thread.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      })
    });

    desc.specify('Fail when receiverEntity is an organization')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderPersonId   = suite.registry.senderPerson.id;
      thread.senderEntityId   = suite.registry.senderPerson.id;
      thread.receiverEntityId = suite.registry.senderOrganization.id;

      thread.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      })
    });

    desc.specify('Fail when senderPerson is NOT the same as senderEntity')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderPersonId   = 97854;
      thread.senderEntityId   = suite.registry.senderPerson.id;
      thread.receiverEntityId = suite.registry.receiverPerson.id;

      thread.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      })
    });

    desc.specify('Pass when senderPerson is the owner of senderEntity Organization')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderPersonId   = suite.registry.senderPerson.id;
      thread.senderEntityId   = suite.registry.senderOrganization.id;
      thread.receiverEntityId = suite.registry.receiverPerson.id;

      suite.registry.senderPerson.ownOrganization(suite.registry.senderOrganization, function(err, result) {
        if (err) {
          throw new Error(err);
        }

        thread.isValid(function(valid) {
          spec.assert(valid).toBe(true);
          spec.completed();
        })
      })
    });


    desc.specify('Fail when senderPerson is NOT the owner/member of senderEntity Organization')(function(spec) {
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderPersonId   = suite.registry.senderPerson.id;
      thread.senderEntityId   = suite.registry.senderOrganization.id;
      thread.receiverEntityId = suite.registry.receiverPerson.id;

      setTimeout(function() {
        db('EntityOwner').del().exec(function(err, result) {
          if (err) {
            throw new Error(err)
          }

          thread.isValid(function(valid) {
            spec.assert(valid).toBe(false);
            spec.completed();
          })
        })
      }, 1000);

    });

    desc.specify("Fail when receiverEntity user has been deactivated")(function(spec){
      var data = spec.registry.thread;

      var thread = new MessageThread(data);

      thread.senderPersonId   = suite.registry.senderPerson.id;
      thread.senderEntityId   = suite.registry.senderPerson.id;
      thread.receiverEntityId = suite.registry.receiverPerson.id;

      var user = suite.registry.receiverUser;

      setTimeout(function() {
        user.deleted = true;

        user.save(function(err, response) {
          if (err) {
            throw new Error(err);
          }

          thread.isValid(function(valid){
            user.deleted = false;

            user.save(function(err, data) {
              spec.assert(valid).toBe(false);
              spec.completed();
            });
          })

        });
      }, 1000);
    })
  })

  this.tearDown(function() {
    var teardown = this;

    db('Entities').del().exec(function(err, data) {
      db('Users').del().exec(function(err, data) {
        console.log('Teardown completed');
        teardown.completed();
      })
    });
  })
})


Tellurium.run();
