'use strict'

var ffmpeg = require('fluent-ffmpeg'),
  fs = require('fs'),
  uuid = require('uuid') // use .v4

var FfmpegPresets = require(path.join(__dirname, '../../lib/FfmpegPresets.js'))

Admin.HomepageTopVoicessController = Class(Admin, 'HomepageTopVoicesController')({

  prototype: {

    // GET /admin/topVoices
    index: function (req, res, next) {
      ACL.isAllowed('index', 'admin.homepageTopVoices', req.role, {
        currentPerson: req.currentPerson,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new NotFoundError())
        }

        return res.render('admin/topVoices/index.html', { layout: 'admin' })
      })
    },

    show: function (req, res, next) {
      return next(new NotFoundError())
    },

    new: function (req, res, next) {
      return next(new NotFoundError())
    },

    /** POST /admin/topVoices
     *
     * req.body = {
     *   voiceId: Hashids.encode,
     *   sourceText: String,
     *   sourceUrl: String,
     *   description: String (optional),
     * }
     *
     * req.files = {
     *   video: String,
     *   poster: String,
     * }
     */
    create: function (req, res, next) {
      ACL.isAllowed('create', 'admin.homepageTopVoices', req.role, {
        currentPerson: req.currentPerson,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new NotFoundError())
        }

        var topVoice = new HomepageTopVoice({
          voiceId: hashids.decode(req.body.voiceId)[0],
          sourceText: req.body.sourceText,
          sourceUrl: req.body.sourceUrl,
          description: req.body.description,
          active: true,
        })

        var versions = {
          mp4: 'videoToMp4',
          webm: 'videoToWebm',
          ogv: 'videoToOgv',
        }

        var outputBasePath,
          useAmazon = false

        async.series([
          // Figure out videoUuid
          function (nextSeries) {
            var buffer = new Buffer(16)

            uuid.v4(null, buffer, 0)

            topVoice.videoUuid = uuid.unparse(buffer)

            return nextSeries()
          },

          // Figure out base path
          function (nextSeries) {
            // {env}/{modelName}_{id}/{property}_{versionName}.{extension}

            if (CONFIG.env === 'development') {
              useAmazon = false
              // Base path + topVoice_hashids.encode(:voiceId)_:videoUuid
              outputBasePath = path.join(process.cwd(), '/public/videos/topVoice_' + req.body.voiceId + '_' + topVoice.videoUuid)
              fs.mkdirSync(outputBasePath)
            } else {
              // Amazon stuff goes in here
              useAmazon = true
            }

            return nextSeries()
          },

          // Process and upload to Amazon S3
          function (nextSeries) {
            async.each(Object.keys(versions), function (version, doneEach) {
              var command = ffmpeg(fs.createReadStream(req.files.video.path))

              // Apply preset
              command.preset(FfmpegPresets.prototype[versions[version]])

              var amazonParams = {
                Bucket: 'crowdvoice.by',
                ACL: 'public-read',
                Body: command.pipe()
              }

              // Upload to Amazon S3
              if (useAmazon) {
                amazonS3.upload(amazonParams)
              } else {
                // Save to FS
                command.save(path.join(outputBasePath, '720.' + version))
              }
            }, nextSeries)
          },
        ], next)
      })
    },

    edit: function (req, res, next) {
      return next(new NotFoundError())
    },

    // PUT /admin/topVoices/:voiceId
    update: function (req, res, next) {
      ACL.isAllowed('update', 'admin.homepageTopVoices', req.role, {
        currentPerson: req.currentPerson,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new NotFoundError())
        }
      })
    },

    // DELETE /admin/topVoices/:voiceId
    destroy: function (req, res, next) {
      ACL.isAllowed('destroy', 'admin.homepageTopVoices', req.role, {
        currentPerson: req.currentPerson,
      }, function (err, isAllowed) {
        if (err) { return next(err) }

        if (!isAllowed) {
          return next(new NotFoundError())
        }
      })
    },

  },

})

module.exports = new Admin.HomepageTopVoicesController()
