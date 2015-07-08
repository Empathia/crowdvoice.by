var TopicsPresenter = Module('TopicsPresenter')({
  build : function build(topics, callback) {
    var response = [];

    async.each(topics, function(topic, nextTopic) {
      var topicInstance = new Topic(topic);

      topicInstance.id = hashids.encode(topicInstance.id);

      // Images
      var images = {};

      for (var version in topicInstance.imageMeta) {
        images[version] = {
          url : topicInstance.image.url(version),
          meta : topicInstance.image.meta(version)
        }
      }

      topicInstance.images = images;

      delete topicInstance.imageBaseUrl;
      delete topicInstance.imageMeta;

      response.push(topicInstance);

      nextTopic();
    }, function(err) {
      if (err) {
        return callback(err);
      }

      callback(null, response);
    });
  }
});
