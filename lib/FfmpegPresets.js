'use strict'

module.exports = {
  toOgv: 'ffmpeg -i {input-path} -c:v libtheora -b:v 1024 -r 30 -q:v 10 {output-dir}/{output-file}.ogv',
  toWebm: 'ffmpeg -i {input-path} -c:v libvpx -crf 30 -b:v 1M -r 30 {output-dir}/{output-file}.webm',
  toMp4: 'ffmpeg -i {input-path} -c:v libx264 -b:v 1000k -r 30 {output-dir}/{output-file}.mp4',
}
