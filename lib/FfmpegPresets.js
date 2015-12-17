'use strict'

// This module doesn't actually format any videos, it just sets the options for
// the ffmpeg instances.

var FfmpegPresets = Module('FfmpegPresets')({

  prototype: {

    videoToMp4: function (command) {
      command
        .format('mp4')
        .videoCodec('libx264')
        .videoBitrate('1024k')
        .fps(30)
        .size('720x?')
        .noAudio()
    },

    videoToWebm: function (command) {
      command
        .format('webm')
        .videoCodec('libvpx')
        .videoBitrate('1024k')
        .fps(30)
        .size('720x?')
        .noAudio()
    },

    videoToOgv: function (command) {
      command
        .format('ogv')
        .videoCodec('libtheora')
        .videoBitrate('1024k')
        .fps(30)
        .size('720x?')
        .noAudio()
    },

  }

})

module.exports = FfmpegPresets
