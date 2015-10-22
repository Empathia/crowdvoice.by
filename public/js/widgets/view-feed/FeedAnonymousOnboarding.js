Class(CV, 'FeedAnonymousOnboarding').inherits(Widget)({
    HTML : '\
        <div class="profile-onboarding -mid-height -rel">\
            <h1>You can\'t preview your feed in anonymous mode.</h1>\
            <p>Please disable anonymous mode to follow voices, users and organzations and view all their recent activity. This will also help you discover more of them to contact, contribute, join and follow.</p>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
