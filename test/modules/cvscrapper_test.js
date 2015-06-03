var scrapper = require(__dirname + '/../../lib/cvscrapper');

scrapper.processUrl('http://google.com', function (err, info) {
  console.log(arguments);
});
