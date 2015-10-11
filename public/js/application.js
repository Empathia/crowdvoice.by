// Styles
require('./../css/style.less');
// Fonts
window.WebFontConfig = {
    google: { families: [ 'Open+Sans:400,300,600,700,800:latin' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

// JS » polyfills
require('./polyfills/rAF');

// JS » deps
window.jQuery = window.$ = require('jquery');
window.validate = require('validate');
var moment = require('moment');
window.moment = moment;
window.dragula = require('dragula');

// JS » Our stack, namespace, lib
require('neon');
require('neon/stdlib');
window.CV = {UI: {}, Views: {}};
require('./lib/widget-utils.js');
require('./lib/Widget.js');
require('./lib/image-halt');
require('./lib/ResponsiveWidth');
require('./app');

// Global Widgets
require('./widgets/ui/Modal');
require('./widgets/ui/Input');
require('./widgets/ui/Button');
require('./widgets/ui/Checkbox');
require('./widgets/ui/Close');
require('./widgets/ui/InputButton');
require('./widgets/ui/InputButtonResults');
require('./widgets/ui/InputButtonResultsItem');

// notifications
require('./widgets/notifications/manager');
require('./widgets/notifications/notification');
require('./widgets/notifications/notification-followed');
require('./widgets/notifications/notification-created');
require('./widgets/notifications/notification-new-posts');
require('./widgets/notifications/notification-changed-avatar');
require('./widgets/notifications/notification-changed-background');
require('./widgets/notifications/notification-new-description');
require('./widgets/notifications/notification-new-title');
require('./widgets/notifications/notification-read-more');
require('./widgets/notifications/notification-flash');
require('./widgets/notifications/notification-published');
require('./widgets/notifications/notification-archived');
require('./widgets/notifications/notification-became-a-public-member');
require('./widgets/notifications/notification-became-a-public-contributor');
require('./widgets/notifications/-notification-message');
require('./widgets/notifications/-notification-invite');
require('./widgets/notifications/-notification-request');

// search
require('./widgets/search/Search');
require('./widgets/search/SearchButton');
require('./widgets/search/SearchResultsManager');
require('./widgets/search/SearchResultsGroup');
require('./widgets/search/SearchResultsViewAllButton');
// other
require('./widgets/sidebar.js');
require('./widgets/NotificationBell.js');
require('./widgets/Header');
require('./widgets/incognito/button');
require('./widgets/loader');

// generic widgets
require('./widgets/EmptyState');
require('./widgets/Popover');
require('./widgets/PopoverBlocker');
require('./widgets/responsive-slider.js');
require('./widgets/InputClearable');
require('./widgets/input-counter.js');
require('./widgets/Dropdown');
require('./widgets/dropdowns/regular');
require('./widgets/dropdowns/DropdownTopics');
require('./widgets/dropdowns/voice-types');
require('./widgets/dropdowns/voice-status');
require('./widgets/dropdowns/voice-ownership');
require('./widgets/dropdowns/voice-ownership-admin');
require('./widgets/dropdowns/CurrentPersonEntitiesCheckboxes');
require('./widgets/tabs/TabsManager');
require('./widgets/tabs/Tab');
require('./widgets/tabs/TabNav');
require('./widgets/tabs/TabContent');

// components
require('./widgets/cards/Card');
require('./widgets/cards/CardMini');
require('./widgets/cards/CardMiniClean');
require('./widgets/cards/CardActionFollow');
require('./widgets/cards/CardActionFollowMultiple');
require('./widgets/cards/CardActionMessage');
require('./widgets/cards/CardActionInvite');
require('./widgets/cards/CardActionJoin');
require('./widgets/cards/CardUnfollowPopover');
require('./widgets/cards/CardInviteToPopover');

require('./widgets/voice-cover/VoiceCover');
require('./widgets/voice-cover/VoiceCoverMini');
require('./widgets/voice-cover/VoiceCoverMiniClean');
require('./widgets/voice-cover/actions/VoiceCoverActions');
require('./widgets/voice-cover/actions/VoiceCoverActionsEdit');
require('./widgets/voice-cover/actions/VoiceCoverActionsArchive');
require('./widgets/category-cover');

// views
require('./views/Home');
require('./widgets/voice/voice-helper.js');
require('./views/Search');
require('./widgets/view-search/voices-tab');
require('./widgets/view-search/users-tab');
require('./widgets/view-search/organizations-tab');
require('./views/Voice');
require('./views/SavedPosts');
require('./widgets/view-saved-posts/onboarding');
require('./widgets/view-saved-posts/manager');
require('./views/MyVoices');
require('./widgets/view-my-voices/MyVoicesOnboarding');
require('./widgets/view-my-voices/VoiceTab');
require('./views/UserProfile');
require('./views/OrganizationProfile');
require('./widgets/view-user-profile/UserProfileTabNav');
require('./widgets/view-user-profile/UserProfileVoicesTab');
require('./widgets/view-user-profile/UserProfileFollowersTab');
require('./widgets/view-user-profile/UserProfileFollowingTab');
require('./widgets/view-user-profile/OrganizationProfileMembersTab');
require('./widgets/view-user-profile/actions/UserProfileActionFollow');
require('./widgets/view-user-profile/actions/UserProfileActionFollowMultiple');
require('./widgets/view-user-profile/actions/UserProfileActionMessage');
require('./widgets/view-user-profile/actions/UserProfileMoreActions');
require('./widgets/view-user-profile/actions/OrganizationProfileActionLeave');
require('./widgets/view-user-profile/actions/OrganizationProfileMoreActions');

require('./widgets/voice/posts-registry');
require('./widgets/voice/Onboarding');
require('./widgets/voice/VoiceHeader');
require('./widgets/voice/VoiceFooter');
require('./widgets/voice/footer/share-buttons-group');
require('./widgets/voice/footer/share-button');
require('./widgets/voice/footer/embed-button');
require('./widgets/voice/follow/VoiceFollowSingleButton');
require('./widgets/voice/follow/VoiceFollowMultipleButton');

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

require('./widgets/voice/moderate/ModeratePostsRegistry');
require('./widgets/voice/moderate/VoiceModerateButton');
require('./widgets/voice/moderate/VoiceModerateManager');
require('./widgets/voice/moderate/VoiceModerateDoneButton');
require('./widgets/voice/moderate/VoiceModerateFooter');

require('./widgets/voice/add-content/');

require('./widgets/voice/related-voices/RelatedVoicesButton');
require('./widgets/voice/related-voices/ManageRelatedVoices');
require('./widgets/voice/related-voices/RelatedVoicesList');

require('./widgets/voice/contributors/ManageContributorsButton');
require('./widgets/voice/contributors/ManageContributors');
require('./widgets/voice/contributors/ManageContributorsList');

// popovers
require('./widgets/popovers/PopoverLeave');
require('./widgets/popovers/unsave');
require('./widgets/popovers/share');

// posts
require('./widgets/posts/modules/images');
require('./widgets/posts/post');
require('./widgets/posts/post-image');
require('./widgets/posts/post-video');
require('./widgets/posts/post-link');
require('./widgets/posts/actions/save');
require('./widgets/posts/actions/share');

// post detail
require('./widgets/post-details/controllers/base');
require('./widgets/post-details/controllers/approved');
require('./widgets/post-details/controllers/unapproved');
require('./widgets/post-details/controllers/saved');
require('./widgets/post-details/navigation');
require('./widgets/post-details/post-detail');
require('./widgets/post-details/actions/save');
require('./widgets/post-details/actions/share');
// post detail link
require('./widgets/post-details/link/post-detail-link');
require('./widgets/post-details/link/header');
require('./widgets/post-details/link/iframe');
require('./widgets/post-details/link/noncompatible');
// post detail media
require('./widgets/post-details/media/post-detail-media');
require('./widgets/post-details/media/header');
require('./widgets/post-details/media/thumb');
require('./widgets/post-details/media/info');

// editable posts
require('./widgets/posts/edit/EditablePost');
require('./widgets/posts/edit/editable-post-link.js');
require('./widgets/posts/edit/editable-post-video.js');
require('./widgets/posts/edit/editable-post-image.js');
require('./widgets/posts/edit/image-controls.js');

// moderate actions
require('./widgets/posts/moderate/remove-button.js');
require('./widgets/posts/moderate/publish-button.js');
require('./widgets/posts/moderate/vote-buttons.js');

require('./widgets/voice/VoiceRequestToContribute');

// post creators
require('./widgets/post-creators/post-creator.js');
require('./widgets/post-creators/post-button.js');
require('./widgets/post-creators/uploading.js');
require('./widgets/post-creators/error.js');
require('./widgets/post-creators/success.js');

require('./widgets/post-creators/from-url/post-creator-from-url.js');
require('./widgets/post-creators/from-url/source-icons.js');

require('./widgets/post-creators/from-sources/post-creator-from-sources.js');
require('./widgets/post-creators/from-sources/sources-dropdown.js');
require('./widgets/post-creators/from-sources/sources-dropdown-option.js');
require('./widgets/post-creators/from-sources/sources-results.js');
require('./widgets/post-creators/from-sources/sources-queue.js');
require('./widgets/post-creators/from-sources/source-youtube.js');
require('./widgets/post-creators/from-sources/source-google-news.js');

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
require('./widgets/modal.js');
require('./widgets/login.js');
require('./widgets/formUtils.js');
require('./widgets/forms/send-message.js');
require('./widgets/forms/RequestToContribute');
require('./widgets/forms/CreateVoice.js');
require('./widgets/forms/create-organization.js');
require('./widgets/forms/invite-to-contribute.js');
require('./widgets/forms/invite-to-organization.js');
require('./widgets/forms/users-list.js');
require('./widgets/forms/request-membership.js');
require('./widgets/forms/report.js');
require('./widgets/forms/block.js');

require('./widgets/elements/image.js');
require('./widgets/elements/UploadImage');
require('./widgets/elements/button.js');
require('./widgets/elements/check.js');
require('./widgets/elements/input.js');
require('./widgets/elements/input-button.js');
require('./widgets/elements/select.js');
require('./widgets/elements/select-account.js');
require('./widgets/elements/alert.js');
require('./widgets/elements/detect-location.js');

// threads and messages
require('./widgets/messages/ThreadsContainer.js');
require('./widgets/messages/Thread.js');
require('./widgets/messages/Message.js');

// generators
require('./widgets/generators/feedGenerator.js');


require('./widgets/audio.js');

require('neowidget');

require('./widgets/HomepageStats.js');
