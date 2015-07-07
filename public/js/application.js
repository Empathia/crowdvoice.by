// Styles
require('./../css/style.less');
// Fonts
WebFontConfig = {
    google: { families: [ 'Open+Sans:400,300,600,700,800:latin' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

// JS » deps
var jQuery = require('./vendor/jquery-2.0.3.js');
window.jQuery = jQuery;
window.$ = jQuery;
window.validate = require('validate');
var moment = require('moment');
window.moment = moment;

// JS » Our stack, namespace, lib
require('neon');
require('neon/stdlib');
window.CV = {};
require('./lib/widget-utils.js');
require('./lib/Widget.js');
require('./lib/image-halt');
require('share-url/neon');
require('./app');

// Global Widgets
// notifications
require('./widgets/notifications/manager');
require('./widgets/notifications/notification');
require('./widgets/notifications/notification-follow');
require('./widgets/notifications/notification-message');
require('./widgets/notifications/notification-invite');
require('./widgets/notifications/notification-request');
// search
require('./widgets/search/search');
require('./widgets/search/button');
// other
require('./widgets/sidebar.js');
require('./widgets/header.js');

// generic widgets
require('./widgets/popover.js');
require('./widgets/popover-blocker.js');
require('./widgets/responsive-slider.js');
require('./widgets/input-clearable.js');
require('./widgets/input-counter.js');
require('./widgets/dropdown.js');

// components
require('./widgets/cards/card');
require('./widgets/cards/mini');
require('./widgets/cards/action-follow');
require('./widgets/cards/action-message');
require('./widgets/cards/action-invite-to');
require('./widgets/cards/action-join');

require('./widgets/voice-cover');
require('./widgets/voice-cover-mini');
require('./widgets/category-cover');

// views
require('./views/home');
require('./widgets/voice/voice-helper.js');
require('./views/voice');

require('./widgets/voice/voice-header.js');
require('./widgets/voice/voice-footer');
require('./widgets/voice/footer/share-buttons-group');
require('./widgets/voice/footer/share-button');
require('./widgets/voice/footer/share-items');
require('./widgets/voice/footer/embed-button');
require('./widgets/voice/voice-follow-button.js');
require('./widgets/voice/voice-related-voices.js');

require('./widgets/voice/timeline/feedback');
require('./widgets/voice/timeline/jump-to-date');
require('./widgets/voice/timeline/jump-to-date-label');
require('./widgets/voice/timeline/jump-to-date-item');

require('./widgets/voice/layers/layers');
require('./widgets/voice/layers/voice_abstract');
require('./widgets/voice/layers/moderate_abstract');
require('./widgets/voice/layers/layer');
require('./widgets/voice/layers/indicator');
require('./widgets/voice/voice-about-box');

require('./widgets/voice/moderate/button.js');
require('./widgets/voice/moderate/manager.js');
require('./widgets/voice/moderate/footer-button.js');
require('./widgets/voice/moderate/footer.js');

require('./widgets/voice/add-content/');

// posts
require('./widgets/posts/modules/images');
require('./widgets/posts/post');
require('./widgets/posts/post-image');
require('./widgets/posts/post-video');
require('./widgets/posts/post-link');

// editable posts
require('./widgets/posts/edit/editable-post.js');
require('./widgets/posts/edit/editable-post-link.js');
require('./widgets/posts/edit/editable-post-video.js');
require('./widgets/posts/edit/editable-post-image.js');
require('./widgets/posts/edit/image-controls.js');

// moderate actions
require('./widgets/posts/moderate/remove-button.js');
require('./widgets/posts/moderate/publish-button.js');
require('./widgets/posts/moderate/vote-buttons.js');

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
require('./widgets/bubble/form-request-to-contribute.js');
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

// threads and messages
require('./widgets/messages/ThreadsContainer.js');
require('./widgets/messages/Thread.js');
require('./widgets/messages/Message.js');


require('./widgets/audio.js');
