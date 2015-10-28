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
require('./widgets/ui/Radio');
require('./widgets/ui/Close');
require('./widgets/ui/InputButton');
require('./widgets/ui/InputButtonResults');
require('./widgets/ui/InputButtonResultsItem');

// notifications
require('./widgets/notifications/NotificationsManager');
require('./widgets/notifications/Notification');
require('./widgets/notifications/NotificationItem');
require('./widgets/notifications/NotificationReadMore');
// require('./widgets/notifications/notification-flash');

// feed items
require('./widgets/feed/FeedItem');
require('./widgets/feed/FeedChangedAvatar');
require('./widgets/feed/FeedChangedBackground');
require('./widgets/feed/FeedNewPosts');
require('./widgets/feed/FeedFollowed');
require('./widgets/feed/FeedPublished');
require('./widgets/feed/FeedBecamePublicContributor');
require('./widgets/feed/FeedArchived');
require('./widgets/feed/FeedBecamePublicMember');
require('./widgets/feed/FeedNewDescription');
require('./widgets/feed/FeedNewTitle');

// search
require('./widgets/search/Search');
require('./widgets/search/SearchButton');
require('./widgets/search/SearchResultsManager');
require('./widgets/search/SearchResultsGroup');
require('./widgets/search/SearchResultsViewAllButton');
// other
require('./widgets/Sidebar');
require('./widgets/NotificationBell.js');
require('./widgets/Header');
require('./widgets/incognito/button');
require('./widgets/Loading');

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
require('./widgets/tabs/TabIndicator');

// components
require('./widgets/cards/Card');
require('./widgets/cards/CardSmall');
require('./widgets/cards/CardMini');
require('./widgets/cards/CardMiniClean');
require('./widgets/cards/CardHover');
require('./widgets/cards/CardHoverItem');
require('./widgets/cards/actions/CardActionFollow');
require('./widgets/cards/actions/CardActionFollowMultiple');
require('./widgets/cards/actions/CardActionMessage');
require('./widgets/cards/actions/CardActionInvite');
require('./widgets/cards/actions/CardActionJoin');
require('./widgets/cards/actions/CardUnfollowPopover');
require('./widgets/cards/actions/CardInviteToPopover');

require('./widgets/voice-cover/VoiceCover');
require('./widgets/voice-cover/VoiceCoverMini');
require('./widgets/voice-cover/VoiceCoverMiniClean');
require('./widgets/voice-cover/VoiceCoverTitle');
require('./widgets/voice-cover/actions/VoiceCoverActions');
require('./widgets/voice-cover/actions/VoiceCoverActionsEdit');
require('./widgets/voice-cover/actions/VoiceCoverActionsArchive');
require('./widgets/CategoryCover');
require('./widgets/TopicCard');


// views
require('./views/Home');
require('./widgets/voice/voice-helper.js');
require('./views/Search');
require('./widgets/view-search/voices-tab');
require('./widgets/view-search/users-tab');
require('./widgets/view-search/organizations-tab');
require('./views/DiscoverTrending');
require('./widgets/view-discover-trending/DiscoverTrendingVoicesTab');
require('./widgets/view-discover-trending/DiscoverTrendingUpdatedVoicesTab');
require('./widgets/view-discover-trending/DiscoverTrendingUsersTab');
require('./widgets/view-discover-trending/DiscoverTrendingOrganizationsTab');
require('./views/DiscoverNew');
require('./widgets/view-discover-new/DiscoverNewVoicesTab');
require('./widgets/view-discover-new/DiscoverNewPeopleTab');
require('./widgets/view-discover-new/DiscoverNewOrganizationsTab');
require('./views/DiscoverRecommended');
require('./widgets/view-discover-recommended/DiscoverRecommendedOnboarding');
require('./widgets/view-discover-recommended/DiscoverRecommendedSection');
require('./widgets/view-discover-recommended/DiscoverRecommendedSectionItem');
require('./views/DiscoverBrowse');
require('./widgets/view-discover-browse/DiscoverBrowseVoicesTab');
require('./widgets/view-discover-browse/DiscoverBrowsePeopleTab');
require('./widgets/view-discover-browse/DiscoverBrowseOrganizationsTab');
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
require('./views/UserProfileEdit');
require('./widgets/view-user-profile-edit/UserProfileEditTab');
require('./widgets/view-user-profile-edit/UserProfileEditAccountTab');
require('./widgets/view-user-profile-edit/UserProfileEditNotificationsTab');
require('./widgets/view-user-profile-edit/UserProfileEditOrganizationsTab');
require('./widgets/view-user-profile-edit/notifications/EditNotificationsNotifyMeItem');
require('./widgets/view-user-profile-edit/notifications/EditNotificationsEmailDigestsItem');
require('./views/OrganizationProfileEdit');
require('./widgets/view-organization-profile-edit/OrganizationProfileEditTab');
require('./widgets/view-organization-profile-edit/OrganizationProfileEditMembersTab');
require('./widgets/view-organization-profile-edit/OrganizationProfileEditMembersList');
require('./views/Feed');
require('./widgets/view-feed/FeedSidebar');
require('./widgets/view-feed/FeedSidebarStats');
require('./widgets/view-feed/FeedOnboarding');
require('./widgets/view-feed/FeedAnonymousOnboarding');

require('./widgets/voice/posts-registry');
require('./widgets/voice/Onboarding');
require('./widgets/voice/VoiceHeader');
require('./widgets/voice/VoiceFooter');
require('./widgets/voice/VoiceFilterPostsDropdown');
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
require('./widgets/voice/moderate/VoiceModerateDeleteUnmoderatedPostsDropdown');

require('./widgets/voice/add-content/');

require('./widgets/voice/related-voices/RelatedVoicesButton');
require('./widgets/voice/related-voices/ManageRelatedVoices');
require('./widgets/voice/related-voices/RelatedVoicesList');

require('./widgets/voice/contributors/ManageContributorsButton');
require('./widgets/voice/contributors/ManageContributors');
require('./widgets/voice/contributors/ManageContributorsList');

// popovers
require('./widgets/popovers/PopoverConfirm');
require('./widgets/popovers/unsave');
require('./widgets/popovers/share');

// posts
require('./widgets/posts/modules/PostModuleImages');
require('./widgets/posts/Post');
require('./widgets/posts/PostImage');
require('./widgets/posts/PostVideo');
require('./widgets/posts/PostLink');
require('./widgets/posts/PostText');
require('./widgets/posts/actions/PostActionSave');
require('./widgets/posts/actions/PostActionShare');

// post detail
require('./widgets/post-details/controllers/PostDetailController');
require('./widgets/post-details/controllers/PostDetailControllerApproved');
require('./widgets/post-details/controllers/PostDetailControllerUnapproved');
require('./widgets/post-details/controllers/PostDetailControllerSaved');
require('./widgets/post-details/PostDetailNavigation');
require('./widgets/post-details/PostDetail');
require('./widgets/post-details/actions/PostDetailActionsSave');
require('./widgets/post-details/actions/PostDetailActionsShare');
// post detail link (link, text)
require('./widgets/post-details/link/PostDetailLink');
require('./widgets/post-details/PostDetailText');
require('./widgets/post-details/link/PostDetailLinkHeader');
require('./widgets/post-details/link/PostDetailLinkIframe');
require('./widgets/post-details/link/PostDetailLinkNonCompatible');
// post detail media (video, image)
require('./widgets/post-details/media/PostDetailMedia');
require('./widgets/post-details/media/PostDetailMediaHeader');
require('./widgets/post-details/media/PostDetailMediaThumb');
require('./widgets/post-details/media/PostDetailMediaInfo');

// editable posts
require('./widgets/posts/edit/EditablePost');
require('./widgets/posts/edit/EditablePostLink');
require('./widgets/posts/edit/EditablePostVideo');
require('./widgets/posts/edit/EditablePostImage');
require('./widgets/posts/edit/EditablePostText');
require('./widgets/posts/edit/EditablePostImageControls');

// moderate actions
require('./widgets/posts/moderate/remove-button.js');
require('./widgets/posts/moderate/publish-button.js');
require('./widgets/posts/moderate/vote-buttons.js');

require('./widgets/voice/VoiceRequestToContribute');

// post creators
require('./widgets/post-creators/PostCreator');
require('./widgets/post-creators/PostCreatorPostButton');
require('./widgets/post-creators/PostCreatorUploadingTemplate');
require('./widgets/post-creators/PostCreatorErrorTemplate');
require('./widgets/post-creators/PostCreatorSuccessTemplate');

require('./widgets/post-creators/from-url/PostCreatorFromUrl');
require('./widgets/post-creators/from-url/PostCreatorFromUrlSourceIcons');

require('./widgets/post-creators/from-sources/PostCreatorFromSources');
require('./widgets/post-creators/from-sources/PostCreatorFromSourcesDropdown');
require('./widgets/post-creators/from-sources/PostCreatorFromSourcesDropdownOption');
require('./widgets/post-creators/from-sources/PostCreatorFromSourcesResults');
require('./widgets/post-creators/from-sources/PostCreatorFromSourcesQueue');
require('./widgets/post-creators/from-sources/PostCreatorFromSourcesYoutube');
require('./widgets/post-creators/from-sources/PostCreatorFromSourcesGoogleNews');

require('./widgets/post-creators/upload-file/PostCreatorUploadFile');
require('./widgets/post-creators/upload-file/PostCreatorUploadFileHeaderMessages');

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
require('./widgets/forms/CreateVoice');
require('./widgets/forms/CreateOrganization');
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
