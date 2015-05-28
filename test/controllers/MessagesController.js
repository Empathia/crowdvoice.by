'use strict';

var application = require('neonode-core');

require('tellurium');
require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});

var request = require('superagent');
var crypto = require('crypto');

CONFIG.database.logQueries = false;

var urlBase = 'http://localhost:3000';
var csrf;
var cookies;

Tellurium.suite('Messages Controller')(function() {
  var suite = this;

  this.setup(function() {
    var setup = this;

    async.series([
      function(done) {
        Entity.findById(1, function(err, jack) {
          jack = jack[0];

          suite.registry.jack = jack;
          done()
        })
      },
      function(done) {
        Entity.findById(3, function(err, john) {
          john = john[0];

          suite.registry.john = john;
          done()
        })
      },

      function(done) {
        Entity.findById(5, function(err, peter) {
          peter = peter[0];

          suite.registry.peter = peter;
          done()
        })
      },
      function(done) {
        Entity.findById(7, function(err, steve) {
          steve = steve[0];

          suite.registry.steve = steve;
          done()
        })
      }
    ], function(err) {
      if (err) {
        throw new Error(err);
      }

      setup.completed();
    })
  });

  this.describe('Actions')(function(desc) {

    desc.specify('Create a message in an existing thread')(function(spec) {
      var jack = suite.registry.jack;

      async.series([
        function (done) {
          var req = request
            .get(urlBase + '/csrf');

          req.end(function (err, res) {
            cookies = res.headers['set-cookie'];
            csrf = res.text;
            done();
          });
        },
        function (done) {
          var req = request
            .post(urlBase + '/session')
            .set('cookie', cookies)
            .send({_csrf: csrf, username: 'jack', password: '12345678'});

          req.end(function (err, res) {
            done();
          });
        }
      ], function(err) {
        if (err) {
          throw new Error(err);
        }

        var message = 'Test sending message to an existing thread.';

        var req = request
          .post(urlBase + '/' + jack.profileName + '/messages/' + hashids.encode(1))
          .accept('application/json')
          .set('cookie', cookies)
          .send({
            _csrf : csrf,
            senderEntityId : jack.id,
            message : message
          });

          req.end(function(err, res) {
            if (err) {
              spec.assert(true).toBe(false);
            }

            spec.assert(res.status).toBe(200);
            spec.assert(res.body.message).toBe(message);
            spec.completed();
          })
      })
    });

    desc.specify('Sanitize a created message')(function(spec) {
      var jack = suite.registry.jack;

      async.series([
        function (done) {
          var req = request
            .get(urlBase + '/csrf');

          req.end(function (err, res) {
            cookies = res.headers['set-cookie'];
            csrf = res.text;
            done();
          });
        },
        function (done) {
          var req = request
            .post(urlBase + '/session')
            .set('cookie', cookies)
            .send({_csrf: csrf, username: 'jack', password: '12345678'});

          req.end(function (err, res) {
            done();
          });
        }
      ], function(err) {
        if (err) {
          throw new Error(err);
        }

        var message = '<h1>Test sending message to an existing thread.</h1>';

        setTimeout(function() {
          var req = request
            .post(urlBase + '/' + jack.profileName + '/messages/' + hashids.encode(1))
            .accept('application/json')
            .set('cookie', cookies)
            .send({
              _csrf : csrf,
              senderEntityId : jack.id,
              message : message
            });

            req.end(function(err, res) {
              if (err) {
                spec.assert(true).toBe(false);
              }

              spec.assert(res.status).toBe(200);
              spec.assert(res.body.message).toBe('Test sending message to an existing thread.');
              spec.completed();
            })
        }, 1000);
      })
    });

    desc.specify('Hide a message')(function(spec) {
      var jack = suite.registry.jack;

      setTimeout(function() {
        var req = request
          .del(urlBase + '/' + jack.profileName + '/messages/' + hashids.encode(1) + '/' + hashids.encode(1))
          .accept('application/json')
          .set('cookie', cookies)
          .send({
            _csrf : csrf,
            _method : 'delete'
          });

          req.end(function(err, res) {
            if (err) {
              spec.assert(true).toBe(false);
            }

            spec.assert(res.status).toBe(200);
            spec.assert(res.body.status).toBe('ok');
            spec.completed();
          })
      }, 2000)
    })
  });


})

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
