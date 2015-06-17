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

var moment = require('moment');
window.moment = moment;

// generic widgets
require('./widgets/sidebar.js');
require('./widgets/popover.js');
require('./widgets/popover-blocker.js');
require('./widgets/responsive-slider.js');
require('./widgets/input-clearable.js');
require('./widgets/input-counter.js');
require('./widgets/dropdown.js');

// components
require('./widgets/card.js');
require('./widgets/voice-cover.js');
require('./widgets/voice-cover-mini.js');
require('./widgets/category-cover.js');

// views
require('./views/home');
require('./widgets/voice/voice-helper.js');
require('./views/voice');

require('./widgets/voice/voice-header.js');
require('./widgets/voice/voice-footer');
require('./widgets/voice/voice-post-layers-manager');
require('./widgets/voice/voice-follow-button.js');
require('./widgets/voice/voice-related-voices.js');
require('./widgets/voice/moderate-button.js');
require('./widgets/voice/moderate-manager.js');
require('./widgets/voice/voice-timeline-feedback');
require('./widgets/voice/voice-posts-layer');
require('./widgets/voice/voice-post-indicator');
require('./widgets/voice/voice-about-box');

// posts
require('./widgets/posts/post.js');
require('./widgets/posts/post-image.js');
require('./widgets/posts/post-video.js');
require('./widgets/posts/post-audio.js');
require('./widgets/posts/post-link.js');
require('./widgets/posts/post-quote.js');
require('./widgets/posts/edit/post-edit.js');
require('./widgets/posts/edit/post-edit-image-controls.js');

require('./widgets/voice/voice-add-content');
require('./widgets/voice/voice-timeline-jump-to-date');
require('./widgets/voice/voice-timeline-jump-to-date-label');
require('./widgets/voice/voice-timeline-jump-to-date-item');
require('./widgets/voice/voice-request-to-contribute.js');
require('./widgets/popover-request-to-contribute.js');

// post creators
require('./widgets/post-creators/post-creator.js');
require('./widgets/post-creators/post-button.js');
require('./widgets/post-creators/uploading.js');
require('./widgets/post-creators/error.js');

require('./widgets/post-creators/from-url/post-creator-from-url.js');
require('./widgets/post-creators/from-url/source-icons.js');

require('./widgets/post-creators/from-sources/post-creator-from-sources.js');
require('./widgets/post-creators/from-sources/sources-dropdown.js');
require('./widgets/post-creators/from-sources/sources-dropdown-option.js');
require('./widgets/post-creators/from-sources/sources-results.js');
require('./widgets/post-creators/from-sources/sources-queue.js');

require('./widgets/post-creators/upload-file/post-creator-upload-file.js');
require('./widgets/post-creators/upload-file/header-messages.js');

require('./widgets/post-creators/write-article/post-creator-write-article');
require('./widgets/post-creators/write-article/post-date');
require('./widgets/post-creators/write-article/editor');
require('./widgets/post-creators/write-article/editor-header');
require('./widgets/post-creators/write-article/editor-body');
require('./widgets/post-creators/write-article/cover-button');

// bubbles
require('./widgets/bubble.js');
require('./widgets/bubble/jump-to-date.js');
require('./widgets/bubble/voices-list.js');
require('./widgets/bubble/share.js');
require('./widgets/bubble/help.js');
require('./widgets/notification.js');
require('./widgets/modal.js');
require('./widgets/login.js');
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
require('./widgets/elements/input-button.js');
require('./widgets/elements/select.js');
require('./widgets/elements/select-account.js');



require('./widgets/audio.js');
