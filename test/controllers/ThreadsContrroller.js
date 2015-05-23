'use strict';

var application = require('neonode-core');

require('tellurium');
require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});

var async = require('async');
var request = require('superagent');
var crypto = require('crypto');

CONFIG.database.logQueries = false;

var urlBase = 'http://localhost:3000';
var csrf;
var cookies;

Tellurium.suite('Threads Controller Suite')(function(){
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
  })

  this.describe('Actions')(function(desc) {

    desc.specify('Get all threads for the currentPerson')(function(spec) {
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

        var req = request
          .get(urlBase + '/' + jack.profileName + '/messages')
          .accept('application/json')
          .set('cookie', cookies);

          req.end(function(err, res) {
            if (err) {
              spec.assert(true).toBe(false);
            }

            spec.assert(res.status).toBe(200);
            spec.assert(res.body.length).toBe(3);
            spec.completed();
          })
      })
    });

    desc.specify('Delete a thread should mark it as hidden for the currentPerson')(function(spec) {
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

        setTimeout(function() {
          var req = request
            .del(urlBase + '/' + jack.profileName + '/messages/1')
            .accept('application/json')
            .set('cookie', cookies)
            .send({_csrf: csrf, method : '_delete'});

            req.end(function(err, res) {
              if (err) {
                spec.assert(true).toBe(false);
              }

              spec.assert(res.status).toBe(200);

              var response = res.body;

              spec.assert(response.status).toBe('ok');

              var req = request
              .get(urlBase + '/' + jack.profileName + '/messages')
              .accept('application/json')
              .set('cookie', cookies);

              setTimeout(function() {
                req.end(function(err, res) {
                  if (err) {
                    spec.assert(true).toBe(false);
                  }

                  spec.assert(res.status).toBe(200);
                  spec.assert(res.body.length).toBe(2);
                  spec.completed();
                })
              }, 1000)
            })
        }, 1000);
      })

    });

    desc.specify('Pass create a new Thread and initial message')(function(spec) {
      var jack = suite.registry.jack;
      var john = suite.registry.john;
      var peter = suite.registry.peter;
      var steve = suite.registry.steve;

      var cookie;
      var _csrf;

      async.series([
        function (done) {
          var req = request
            .get(urlBase + '/csrf');

          req.end(function (err, res) {
            cookie = res.headers['set-cookie'];
            _csrf = res.text;
            done();
          });
        },
        function (done) {
          var req = request
            .post(urlBase + '/session')
            .set('cookie', cookie)
            .send({_csrf: _csrf, username: 'steve', password: '12345678'});

          req.end(function (err, res) {
            done();
          });
        }
      ], function(err) {
        if (err) {
          throw new Error(err);
        }

        // setTimeout(function() {
          var req = request
            .post(urlBase + '/' + steve.profileName + '/messages')
            .accept('application/json')
            .set('cookie', cookie)
            .send({
              _csrf: _csrf,
              senderPersonId : steve.id,
              senderEntityId : steve.id,
              receiverEntityId : peter.id,
              message : 'Hello Peter, this is Steve!'
            });

            req.end(function(err, res) {
              if (err) {
                spec.assert(true).toBe(false);
              }

              spec.assert(res.status).toBe(200);

              var response = res.body;

              spec.assert(response.messages.length).toBe(1);

              spec.completed()
            })
        // }, 5000);
      })
    })
  })
})

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
