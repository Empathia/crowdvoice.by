'use strict';

require('./../../bin/server.js');

CONFIG.database.logQueries = false;

console.log('');
console.log('...');

var m = new Post({id:3});
var propertyName = 'image';

m.uploadImage(propertyName, process.argv[2], function () {
  Object.keys(m[propertyName].versions).forEach(function (version) {
    console.log(m[propertyName].url(version));
    console.log(m);
  });
});
