Class(CV, 'NotificationsManager').inherits(Widget)({
    ELEMENT_CLASS : 'cv-notifications',

    prototype : {
        notifications : null,

        _container : document.body,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            // if (this.notifications) this._renderNotifications();
        },

        _renderNotifications : function _renderNotifications() {
            this.notifications.forEach(function(n) {
                this.appendChild(CV.Notification.create(n)).render(this.el);
            }, this);
        }
    }
});
