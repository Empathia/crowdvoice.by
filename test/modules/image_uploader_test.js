'use strict';

require('./../../bin/server.js');

CONFIG.database.logQueries = false;

console.log('');
console.log('...');

var v = new Voice({
  title : 'Voice Title',
  description : 'Voice Description',
  latitude : null,
  longitude : null,
  locationName : null,
  ownerId : 1,
  status : Voice.STATUS_DRAFT,
  type : Voice.TYPE_PUBLIC,
  twitterSearch : null,
  tweetLastFetchAt : null,
  rssUrl : null,
  rssLastFetchAt : null,
});

var p = new Post({
  sourceType: 'image',
  sourceUrl: 'url',
  sourceService: 'imgur'
});

var propertyName = 'image';

Promise.all([
  db('Posts').del(),
  db('Voices').del(),
]).then(function () {
  v.save(function (err) {
    if (err) { console.log(err); return; }

    p.ownerId = 1;
    p.voiceId = v.id;
    p.save(function (err) {
      if (err) { console.log(err); return; }

      p.uploadImage(propertyName, process.argv[2], function () {
        if (err) { console.log(err); return; }

        p.save(function (err) {
          if (err) { console.log(err); return; }

          console.log(p);
          Object.keys(p[propertyName].versions).forEach(function (version) {
            console.log(p[propertyName].url(version));
            console.log(p[propertyName].meta(version));
          });

          console.log(p[propertyName].exists('algo'));
          console.log(p[propertyName].exists('medium'));
        });
      });
    });
  });
});

// p.imageBaseUrl = "development/post_3/image_{versionName}.jpeg"
// p.image.processVersions(function () {
//   console.log(arguments);
//   Object.keys(p[propertyName].versions).forEach(function (version) {
//     console.log(p[propertyName].url(version));
//     console.log(p[propertyName].meta(version));
//   });
// });
