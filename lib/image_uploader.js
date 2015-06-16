'use strict';

var sharp = require('sharp');
var http = require('http');
var https = require('https');

// Common variables
var env = process.env['NODE_ENV'] || 'development';

var ImageUploader = Module('ImageUploader')({
  prototype: {
    hasImage: function (config) {
      var model = this,
          property = config.propertyName,
          modelName = model.constructor.className.toLowerCase();

      var imageObject = {
        url: function (versionName) {
          if (!model[property + 'BaseUrl']) {
            return null;
          }

          return 'https://s3.amazonaws.com/crowdvoice.by/' + model[property + 'BaseUrl'].
            replace(/{versionName}/g, versionName);
        },
        meta: function (versionName) {
          return JSON.parse(model[property + 'Meta'])[versionName]
        },
        versions: config.versions,
        basePath: config.basePath
      };

      Object.defineProperty(model, property, {
        enumerable: false,
        get: function () {
          return imageObject;
        }
      });
    },

    uploadImage : function uploadImage (property, image, done) {
      var model = this,
          versions = model[property].versions,
          modelName = model.constructor.className.toLowerCase(),
          s3BasePath = model[property].basePath,
          baseUrl = '',
          imagesMetadata = {};

      // For each version, upload an image.
      async.each(Object.keys(versions), function (versionName, done) {
        var uploadParams = {
          Bucket: 'crowdvoice.by',
          ACL: 'public-read',
        };

        // Build read stream from file system or from a url.
        if (image.match(/^\//)) {
          sharp(image).metadata(function (err, meta) {
            if (err) { done(err); return; }
            uploadImage(fs.createReadStream(image), {
              extension: meta.format
            });
          });
        } else if (image.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/) ) {
          var request = http;
          if (image.match('https')) {
            request = https;
          }
          request.get(image, function (res) {
            var extension = 'png';

            if (res.headers['content-type']) {
              extension = res.headers['content-type'].replace(/image\//, '');
            }

            uploadImage(res, {
              extension: extension
            });
          });
        }

        // Upload image from a readStream
        var uploadImage = function (readStream, imageInfo) {
          var transform = versions[versionName];

          // Set key
          baseUrl = s3BasePath.
            replace(/{env}/g, env).
            replace(/{modelName}/g, modelName).
            replace(/{id}/g, model.id).
            replace(/{property}/g, property).
            replace(/{extension}/g, imageInfo.extension);

          uploadParams.Key = baseUrl.
            replace(/{versionName}/g, versionName);

          // Set extension
          uploadParams.ContentType = 'image/' + imageInfo.extension;

          var calculator = sharp().metadata(function (err, metadata) {
            imagesMetadata[versionName] = metadata;
          });

          if (typeof(transform) === 'function') {
            var transformStream = transform(readStream).pipe(calculator);
            uploadParams.Body = transformStream;
          } else {
            done(new Error('Version is not a transform function'));
          }

          amazonS3.upload(uploadParams, function (err) {
            done(err);
          });
        };
      }, function (err) {

        // After all images have been uploaded, set the property of the model
        model[property + 'BaseUrl'] = baseUrl;
        model[property + 'Meta'] = JSON.stringify(imagesMetadata);

        done(err);
      });
    },
  }
});

module.exports = ImageUploader;
