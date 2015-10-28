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

            this._decreaseBubbleCounterRef = this._decreaseBubbleCounter.bind(this);
            this.bind('notification:markAsRead', this._decreaseBubbleCounterRef);

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
            this._updateBubbleState(res.length);
            this.notificationsManager.update(res.reverse());
        },

        /* Updates the bubble and button state.
         * @method _updateBubbleState <private> [Function]
         * @return undefined
         */
        _updateBubbleState : function _updateBubbleState(notificationsLength) {
            this._notificationsLength = notificationsLength;

            if (this._notificationsLength) {
                this.dom.updateText(this.badgeElement, this._notificationsLength);
                this.dom.addClass(this.el, ['has-new-notifications']);
            } else {
                this.dom.removeClass(this.el, ['has-new-notifications']);
            }
        },

        /* Show/hide the NotificationsManager.
         * @method _toggleNotificationsManager <private> [Function]
         * @return undefined
         */
        _toggleNotificationsManager : function _toggleNotificationsManager() {
            this.notificationsManager.toggle();
        },

        _decreaseBubbleCounter : function _decreaseBubbleCounter(ev) {
            ev.preventDefault();
            this._notificationsLength--;
            this._updateBubbleState(this._notificationsLength);
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
