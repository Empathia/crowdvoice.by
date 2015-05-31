require('neon');
require('neon/stdlib');

var jQuery = require('./vendor/jquery-2.0.3.js');
window.jQuery = jQuery;
window.$ = jQuery;

// our namespace
window.CV = {};

require('./lib/widget-utils.js');
require('./lib/Widget.js');

window.validate = require('validate');
//window.soundManager = require('SoundManager2').soundManager;

require('./../css/style.less');

// widgets
require('./widgets/popover.js');
require('./widgets/popover-request-to-contribute.js');
require('./widgets/responsive-slider.js');

// components
require('./widgets/card.js');
require('./widgets/voice-cover.js');
require('./widgets/voice-cover-mini.js');
require('./widgets/category-cover.js');

require('./views/voice');
require('./widgets/voice-post-layers-manager');
require('./widgets/voice-footer');
require('./widgets/voice-timeline-feedback');
require('./widgets/voice-posts-layer');
require('./widgets/voice-post-indicator');
require('./widgets/voice-about-box');
require('./widgets/post.js');
require('./widgets/post-image.js');
require('./widgets/post-video.js');
require('./widgets/post-audio.js');
require('./widgets/post-link.js');
require('./widgets/post-quote.js');

require('./widgets/bubble.js');
require('./widgets/bubble/jump-to-date.js');
require('./widgets/bubble/voices-list.js');
require('./widgets/bubble/share.js');
require('./widgets/bubble/help.js');
require('./widgets/notification.js');
require('./widgets/modal.js');
require('./widgets/forms/create-voice.js');
require('./widgets/forms/create-organization.js');
require('./widgets/forms/invite-to-contribute.js');
require('./widgets/forms/manage-contributors.js');
require('./widgets/forms/manage-related-voices.js');
require('./widgets/forms/users-list.js');
require('./widgets/forms/request-membership.js');
require('./widgets/forms/report.js');
require('./widgets/forms/block.js');

require('./widgets/elements/image.js');
require('./widgets/elements/button.js');
require('./widgets/elements/check.js');
require('./widgets/elements/input.js');
require('./widgets/elements/input-search.js');
require('./widgets/elements/select.js');
require('./widgets/elements/select-account.js');



require('./widgets/audio.js');
