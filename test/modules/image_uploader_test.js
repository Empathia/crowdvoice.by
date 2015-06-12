'use strict';

require('./../../bin/server.js');

CONFIG.database.logQueries = false;

console.log('');
console.log('...');

var m = new Voice({id:3});
var propertyName = 'background';

m.uploadImage(propertyName, process.argv[2], function () {
  console.log(m);
  Object.keys(m[propertyName].versions).forEach(function (version) {
    console.log(m[propertyName].url(version));
  });
});
