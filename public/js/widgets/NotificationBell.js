var API = require('./../lib/api');
var Person = require('./../lib/currentPerson');
var Events = require('./../lib/events');

Class('NotificationBell').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <button class="header-notification-button header-actions-button cv-button small rounded -p0 -rel">\
            <svg class="header-actions-svg -s17">\
                <use xlink:href="#svg-notifications"></use>\
            </svg>\
            <span class="ui-badge -abs"></span>\
        </button>',

    prototype : {
        /* Milliseconds to wait between each `getNotifications` request.
         * @property _fetchNotificationsIntervalMS <private> [Number]
         */
        _fetchNotificationsIntervalMS : 30000,
        _fetchNotificationsInterval : null,

        init : function(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.badgeElement = this.el.querySelector('.ui-badge');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new CV.NotificationsManager({
                name : 'notificationsManager'
            })).render(document.body);

            this._fetchNotificationsResponseHandlerRef = this._fetchNotificationsResponseHandler.bind(this);
            this._fetchNotifications();

            this._fetchNotificationsRef = this._fetchNotifications.bind(this);
            this._fetchNotificationsInterval = window.setInterval(
                this._fetchNotificationsRef,
                this._fetchNotificationsIntervalMS
            );

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._toggleNotificationsManagerRef = this._toggleNotificationsManager.bind(this);
            Events.on(this.el, 'click', this._toggleNotificationsManagerRef);
            return this;
        },

        /* Get currentPerson notifications, update the counter value and
         * update the notificationsManager.
         * @method _fetchNotifications <private> [Function]
         * @return undefined
         */
        _fetchNotifications : function _fetchNotifications() {
            API.getNotifications({
                profileName: Person.get().profileName
            }, this._fetchNotificationsResponseHandlerRef);
        },

        /* Handles the `getNotifications` call response.
         * @method _fetchNotificationsResponseHandler <private> [Function]
         * @return undefined
         */
        _fetchNotificationsResponseHandler : function _fetchNotificationsResponseHandler(err, res) {
            var filteredNotifications = res.filter(function(notification) {
                return (typeof notification.action !== 'undefined');
            }).reverse();

            if (filteredNotifications.length) {
                this.dom.updateText(this.badgeElement, filteredNotifications.length);
                this.dom.addClass(this.el, ['has-new-notifications']);
            } else {
                this.dom.removeClass(this.el, ['has-new-notifications']);
            }

            this.notificationsManager.update(filteredNotifications);
        },

        /* Show/hide the NotificationsManager.
         * @method _toggleNotificationsManager <private> [Function]
         * @return undefined
         */
        _toggleNotificationsManager : function _toggleNotificationsManager() {
            this.notificationsManager.toggle();
        },

        destroy : function destroy() {
            Events.off(this.el, 'click', this._toggleNotificationsManagerRef);
            this._toggleNotificationsManagerRef = null;

            window.clearInterval(this._fetchNotificationsInterval);
            this._fetchNotificationsRef = null;

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
