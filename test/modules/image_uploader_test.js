'use strict';

require('./../../bin/server.js');

CONFIG.database.logQueries = false;

console.log('');
console.log('...');

db('Entities').del().then(function (done) {
  var e = new Entity({
    id: 3,
    type: 'person',
    name: 'John Doe',
    profileName: 'john_doe',
    lastname: 'Doe',
    isAnonymous: false,
  });

  e.uploadImage('background', process.argv[2], function () {
    console.log(e);
    Object.keys(e.background.versions).forEach(function (version) {
      console.log(e.background.url(version));
    });
  });
});

