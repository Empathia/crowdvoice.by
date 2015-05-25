#!/usr/bin/env node

'use strict';

require('tellurium');
require('./../../lib/TelluriumConsoleReporter.js');

var application = require('neonode-core');
var async = require('async');
var request = require('superagent');
var crypto = require('crypto');

CONFIG.database.logQueries = false;

var urlBase = 'http://localhost:3000';
var csrf;
var cookies;

function uid (number) {
  return crypto.randomBytes(number).toString('hex');
}
function rid () {
  return Math.floor(Math.random()*100000000).toString();
}

/* Entity Model Tests
 *
 */
Tellurium.suite('Entities Controller')(function () {

  this.setup(function () {
    var setup = this;
    Promise.all([
      db('Entities').del(),
    ]).then(function () {
      setup.completed();
    });
  });

  this.beforeEach(function (spec) {
    spec.registry.organizationData = {
      type: 'organization',
      name: 'organization_' + uid(16),
      profileName: 'organization_' + uid(16),
      isAnonymous: false
    };
    spec.registry.personData = {
      type: 'person',
      name: 'john_' + uid(16),
      profileName: 'john' + uid(16),
      isAnonymous: false
    };
  });

  this.describe('Actions')(function () {

    // Entities#show organization
    this.specify('(text/html) should redirect to OrganizationsController if entity type is organization')(function (spec) {
      async.series([
        function (done) { (new Entity(spec.registry.organizationData)).save(done); }
      ], function (err) {
        var prevMethod = OrganizationsController.prototype.showByProfileName;
        OrganizationsController.prototype.showByProfileName = function (req, res, next) {
          res.send('Organizations#showByProfileName');
        };
        var req = request
          .get(urlBase + '/' + spec.registry.organizationData.profileName)
          .accept('application/json');
        req.end(function (err, res) {
          if (err) {
            spec.assert(false).toBe(true);
          } else {
            spec.assert(res.text).toBe('Organizations#showByProfileName');
          }
          spec.completed();
          OrganizationsController.prototype.showByProfileName = prevMethod;
        });
      });
    });

    // Entities#show person
    this.specify('(text/html) should redirect to PersonsController if entity type is person')(function (spec) {
      async.series([
        function (done) { (new Entity(spec.registry.personData)).save(done); }
      ], function (err) {
        var prevMethod = PersonsController.prototype.showByProfileName;
        PersonsController.prototype.showByProfileName = function (req, res, next) {
          res.send('Persons#showByProfileName');
        };
        var req = request
          .get(urlBase + '/' + spec.registry.personData.profileName)
          .accept('application/json');
        req.end(function (err, res) {
          if (err) {
            spec.assert(false).toBe(true);
          } else {
            spec.assert(res.text).toBe('Persons#showByProfileName');
          }
          spec.completed();
          PersonsController.prototype.showByProfileName = prevMethod;
        });
      });
    });

  });

});

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
