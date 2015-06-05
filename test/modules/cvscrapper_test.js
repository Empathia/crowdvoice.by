require('neon');

var scrapper = require(__dirname + '/../../lib/cvscrapper');

scrapper.processUrl(process.argv[2], function (err, info) {
  console.log(arguments);
});
