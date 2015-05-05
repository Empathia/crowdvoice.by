require('neon');
require('neon/stdlib');

var jQuery = require('./vendor/jquery-2.0.3.js');
window.jQuery = jQuery;
window.$ = jQuery;

// our namespace
window.CV = {};

require('../../lib/js/widget-utils.js');
require('./vendor/Widget.js');

window.validate = require('validate');
window.soundManager = require('SoundManager2').soundManager;

require('./../css/style.less');

require('./widgets/card.js');
require('./widgets/voice-cover.js');
require('./widgets/responsive-slider.js');
require('./widgets/category-cover.js');

require('./widgets/post.js');
require('./widgets/post-image.js');
require('./widgets/post-video.js');
require('./widgets/post-audio.js');
require('./widgets/post-link.js');
require('./widgets/post-quote.js');

require('./widgets/audio.js');
