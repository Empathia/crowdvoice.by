/* jshint multistr: true */
Class(CV, 'NotificationFollow').inherits(CV.Notification)({
    ELEMENT_CLASS : 'cv-notification follow',
    HTML : '\
        <div>\
            <div class="cv-notification__info">\
                <div class="cv-notification__info-main">\
                    <img class="main-avatar -rounded">\
                    <p class="main-text"></p>\
                </div>\
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

            this.el = this.element[0];
            this.mainAvatarElement = this.el.querySelector('.main-avatar');
            this.mainText = this.el. querySelector('.main-text');

            this.dom.updateAttr('src', this.mainAvatarElement, this.person.images.small.url);
            this.dom.updateText(this.mainText, this.person.name + ' ' + this.person.lastname + ' followed you.');
            console.log('follow');
        }
    }
});
