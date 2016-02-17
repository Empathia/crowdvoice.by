var NotificationsStore = require('./../stores/NotificationsStore')

Class(CV.Views, 'Notifications').includes(NodeSupport)({
  prototype: {
    _notificationWidgets: null,
    init: function init(config) {
      Object.keys(config || {}).forEach(function (key) {
        this[key] = config[key];
      }, this);
      this._notificationWidgets = [];
      this.profileBody = this.el.querySelector('.profile-body');
      this._bindEvents();
    },

    setup: function setup() {
      if (NotificationsStore._notifications) {
        NotificationsStore.getNotifications();
      } else {
        NotificationsStore.fetchNotifications();
      }
      return this;
    },

    _bindEvents: function _bindEvents() {
      this._notificationsHandlerRef = this._notificationsHandler.bind(this);
      NotificationsStore.bind('notifications', this._notificationsHandlerRef);
    },

    /* NotificationsStore 'notifications' event handler.
     * @private
     * @param {Object} res
     * @property {Array} res.notifications
     */
    _notificationsHandler: function _notificationsHandler(res) {
      var fragment = document.createDocumentFragment();

      this._notificationWidgets.forEach(function (widget) {
        widget.destroy();
      });
      this._notificationWidgets = [];

      res.notifications.forEach(function (n) {
        var item = new CV.NotificationsPopoverItem({
          name: n.notificationId,
          data: n.action,
          notificationId: n.notificationId,
          read: n.read
        }).render(fragment);
        this._notificationWidgets.push(item);
        this.appendChild(item);
      }, this);

      this.profileBody.appendChild(fragment);
    }
  }
});
