/* jshint multistr: true */
Class(CV, 'NotificationMessage').inherits(CV.Notification)({
    ELEMENT_CLASS : 'cv-notification message',
    HTML : '\
        <div>\
            <div class="cv-notification__info">\
                <div class="cv-notification__info-main">\
                    <img class="main-avatar -rounded" src="/img/sample/covers/feat-00.jpg">\
                    <p class="main-text">Message from Esra’a Al Shafei:</p>\
                </div>\
                <div class="cv-notification__info-extra">Hi! I’ve followed you for some time and I thnik you would be an amazing if you</div>\
            </div>\
            <div class="cv-notification__close -clickable -abs -full-height">\
                <svg class="-s9">\
                    <use xlink:href="#svg-close"></use>\
                </svg>\
            </div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            console.log('message');
        }
    }
});
