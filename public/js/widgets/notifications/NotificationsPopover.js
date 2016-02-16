var Person = require('./../../lib/currentPerson')
  , API = require('./../../lib/api')
  , NotificationsStore = require('./../../stores/NotificationsStore');

Class(CV, 'NotificationsPopover').inherits(Widget).includes(BubblingSupport)({
  ELEMENT_CLASS: 'notifications-popover-content',
  HTML: '\
    <div>\
      <header class="notifications-popover__header -font-bold -upper">Notifications</header>\
      <div class="notifications-popover__list -rel"></div>\
      <div class="notifications-popover__footer">\
        <div class="cv-button-group multiple -row -full-width">\
          <button class="cv-button tiny -col-6 -font-bold -btlr0">Mark All As Read</button>\
          <button class="cv-button tiny -col-6 -font-bold -btrr0">View All</button>\
        </div>\
      </div>\
    </div>',

  prototype: {
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.listElement = this.element[0].querySelector('.notifications-popover__list');
      this._setup()._bindEvents();
      NotificationsStore.getNotifications();
    },

    _setup: function _setup() {
      this.appendChild(new CV.Loading({
        name: 'loader'
      })).render(this.listElement).center();
      return this;
    },

    _bindEvents: function _bindEvents() {
      this._notificationsHandlerRef = this._notificationsHandler.bind(this);
      NotificationsStore.bind('notifications', this._notificationsHandlerRef);

      this._notificationMarkAsReadHandlerRef = this._notificationMarkAsReadHandler.bind(this);
      this.bind('notification:markAsReadAndRedirect', this._notificationMarkAsReadHandlerRef);
    },

    /* NotificationsStore 'notifications' event handler.
     * @private
     * @param {Object} res
     * @property {Array} res.notifications
     */
    _notificationsHandler: function _notificationsHandler(res) {
      if (this.loader) {
        this.loader = this.loader.disable().remove();
      }
      res.notifications.forEach(function (n) {
        this.appendChild(new CV.NotificationsPopoverItem({
          name: n.notificationId,
          data: n.action,
          notificationId: n.notificationId,
          read: n.read
        })).render(this.listElement);
      }, this);
    },

    /* NotificationItem 'notification:markAsRead' event handler.
     * @private
     */
    _notificationMarkAsReadHandler: function _notificationMarkAsReadHandler(ev) {
      ev.stopPropagation();
      NotificationsStore.decreaseUnseen();

      API.markNotificationAsRead({
        profileName: Person.get().profileName,
        data: {notificationId: ev.target.notificationId}
      }, function(err, res) {
        if (err) return console.log(res);
        if (ev.redirectUrl) {
          window.location = ev.redirectUrl;
        }
      });
    },

    destroy: function destroy() {
      Widget.prototype.destroy.call(this);
      return null;
    }
  }
});
