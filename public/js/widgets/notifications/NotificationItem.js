var API = require('./../../lib/api');
var Events = require('./../../lib/events');
var Person = require('./../../lib/currentPerson');

Class(CV, 'NotificationItem').inherits(CV.Notification)({
    HTML : '\
        <div>\
            <div class="cv-notification__info"></div>\
            <div class="cv-notification__close -clickable -abs -full-height">\
                <svg class="-s9">\
                    <use xlink:href="#svg-close"></use>\
                </svg>\
            </div>\
        </div>',

    prototype : {
        data: null,

        init : function init(config) {
            CV.Notification.prototype.init.call(this, config);
            this.el = this.element[0];
            this.closeElement = this.el.querySelector('.cv-notification__close');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.el.classList.add(this.notificationId);

            this.appendChild(
                CV.FeedItem.create({data: this.data})
            ).render(this.el.querySelector('.cv-notification__info'));

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._closeRef = this._close.bind(this);
            Events.on(this.closeElement, 'click', this._closeRef);
            return this;
        },

        _close : function _close() {
            this.destroy();

            API.markNotificationAsRead({
                profileName : Person.get().profileName,
                data : {notificationId: this.notificationId}
            }, function(err, res) {
                console.log(err);
                console.log(res);
            });
        },

        destroy : function destroy() {
            CV.Notification.prototype.destroy.call(this);

            Events.off(this.closeElement, 'click', this._closeRef);
            this._closeRef = null;
         }
    }
});
