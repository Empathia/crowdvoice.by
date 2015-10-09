global.Admin = {};

require('neonode-core');

// Load moment
global.moment = require('moment');

global.FeedInjector = require(__dirname + './../lib/FeedInjector.js');

// Load routes
require('./../lib/routes.js');

require('./../presenters/PostsPresenter');

application._serverStart();


var request = require('superagent');

var urlBase = 'http://localhost:3000';

var csrf;

var cookie;

async.series([function(done) {
  var req = request
    .get(urlBase + '/csrf');

  req.end(function (err, res) {
    cookies = res.headers['set-cookie'];
    csrf = res.text;
    done();
  });
}, function(done) {
  var req = request
    .post(urlBase + '/session')
    .set('cookie', cookies)
    .send({_csrf: csrf, username: 'cersei', password: '12345678'});

  req.end(function (err, res) {
    done();
  });
}, function(done) {
  var req = request
    .post(urlBase + '/jon-snow/follow')
    .set('cookie', cookies)
    .send({_csrf: csrf});

  req.end(function (err, res) {
    done();
  });
}]);
