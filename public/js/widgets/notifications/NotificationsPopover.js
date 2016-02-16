var NotificationsStore = require('./../../stores/NotificationsStore');

Class(CV, 'NotificationsPopover').inherits(Widget)({
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
    },

    _notificationsHandler: function _notificationsHandler(res) {
      if (this.loader) {
        this.loader = this.loader.disable().remove();
      }
      res.notifications.forEach(function (n) {
        this.appendChild(new CV.NotificationsPopoverItem({
          name: n.notificationId,
          data: n.action,
          notificationId: n.notificationId,
          className: (n.read === false ? '-is-unread' : '')
        })).render(this.listElement);
      }, this);
    },

    destroy: function destroy() {
      Widget.prototype.destroy.call(this);
      return null;
    }
  }
});
