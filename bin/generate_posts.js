var application = require('neonode-core');

var casual = require('casual');

CONFIG.database.logQueries = true;

var year = 2015;
var month = 4;

var count = 0;
var youtubes = [
  'https://www.youtube.com/watch?v=tHX55Bxnc-A',
  'https://www.youtube.com/watch?v=kNSv7DF5QrY',
  'https://www.youtube.com/watch?v=EH5E2dJx91E',
  'https://www.youtube.com/watch?v=tHX55Bxnc-A',
  'https://www.youtube.com/watch?v=f4RGU2jXQiE'
]

async.times(96012, function(id, next) {
  var post =  new Post();


  var type = casual.random_element(['image', 'video', 'link']);

  post.title = casual.title;
  post.description = casual.description;

  post.sourceType = type;

  if (type === 'video') {
    post.sourceService = 'youtube';
    post.sourceUrl = casual.random_element(youtubes);
  } else {
    post.sourceService = 'link';
    post.sourceUrl = casual.url;
  }

  var width = casual.integer(from = 200, to = 350);
  var height = casual.integer(from = 100, to = 400);
  var url = "http://dummyimage.com/" + width + "x" + height + "/CCCCCC/fff";


  post.image = url;
  post.approved = casual.random_element([true, false]);

  var date =  new Date(year + '-' + month + '-' + casual.integer(from = 1, to = 28));
  post.createdAt = date;
  post.updatedAt = date;
  post.publishedAt = date;
  post.imageWidth = width;
  post.imageHeight = height;

  post.voiceId = 1;
  post.ownerId = 1;
  count++;

  if (count === 2667) {
    month--;
    count = 0;
  }

  if (month === 0) {
    month = 12;
    year--;
  }

  console.log(date)
  post.save(function(err, result) {
    next(null, post)
  })
}, function(err, posts) {
  if (err) {
    logger.error(err)
  }

  logger.log('Finished')
});
