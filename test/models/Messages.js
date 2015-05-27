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

    async.series([function(done) {
      Entity.findById(1, function(err, result) {
        suite.registry.jack = new Entity(result[0]);
        done();
      });
    }, function(done) {
      Entity.findById(3, function(err, result) {
        suite.registry.john = new Entity(result[0]);
        done();
      })
    }, function(done){
      Entity.findById(9, function(err, result) {
        suite.registry.organization = new Entity(result[0]);
        done();
      })
    }, function(done) {
      MessageThread.findById(1, function(err, result) {
        suite.registry.thread = new MessageThread(result[0]);
        done();
      })
    }, function(done) {
      var invitation = new InvitationRequest({
        invitatorEntityId : suite.registry.jack.id,
        invitedEntityId : suite.registry.john.id
      });

      invitation.save(function(err, result) {
        suite.registry.invitation = invitation;
        done()
      })
    }], function(err) {
      console.log('Finished setup');
      setup.completed();
    });

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
      var jack = suite.registry.jack;
      var john = suite.registry.john;
      var thread = suite.registry.thread;

      var message = new Message({
        type : Message.TYPE_MESSAGE,
        senderPersonId : jack.id,
        senderEntityId : jack.id,
        receiverEntityId : john.id,
        threadId : thread.id,
        message : 'hola'
      })

      message.isValid(function(valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      });
    })

    desc.specify('Fail Validation')(function(spec) {
      var jack = suite.registry.jack;
      var john = suite.registry.john;
      var thread = suite.registry.thread;

      var message = new Message({
        type : Message.TYPE_MESSAGE,
        senderPersonId : jack.id,
        senderEntityId : jack.id,
        receiverEntityId : john.id,
        threadId : 9876,
        message : 'hola'
      })

      message.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    desc.specify('Pass create a message With Thread.createMessage Factory')(function(spec) {
      var jack = suite.registry.jack;
      var john = suite.registry.john;
      var thread = suite.registry.thread;

      thread.createMessage({
        type : Message.TYPE_MESSAGE,
        senderPersonId : jack.id,
        message : 'Hola'
      }, function(err, result) {
        spec.assert(result.id).toBeGreaterThan(0);
        spec.completed();
      });

    });

    desc.specify('Fail create a message With Thread.createMessage Factory')(function(spec) {
      var jack = suite.registry.jack;
      var john = suite.registry.john;
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

  });

});

Tellurium.run();
