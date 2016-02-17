/* Handles the notifications data fetching and emits events letting its
 * subscribers to know when it changes so they can update itself.
 */
var API = require('./../lib/api')
  , Person = require('./../lib/currentPerson');

module.exports = Class(CV, 'NotificationsStore').includes(CustomEventSupport)({
  _socket: null,
  _run: function _run() {
    this._socket = CV.App.getSocket();
    this._socket.on('newNotifications', function (res) {
      console.log(res);
      if (res.length) {
        this._new_notifications = res;
        this._unseen_count = res.length;
        this._emitNewNotifications();
      }
    }.bind(this));
    this._newNotifications();
  },

  /* @property {Number} _unseen_count - Holds the unseen notifications total.
   * @private
   */
  _notifications: null,
  _notificationsTotalCount: 0,
  _notificationsLimit: 10,
  _notificationsRequests: 0,
  _unseen_count: 0,
  _new_notifications: null,

  getUnseen: function getUnseen() {
    this._newNotifications();
  },

  /* Decrease the _unseen_count by one and emits the getUnseen event.
   * @static
   * @emits 'getUnseen'
   */
  decreaseUnseen: function decreaseUnseen() {
    if (this._unseen_count > 0) {
      this._unseen_count--;
      this._emitNewNotifications();
    }
  },

  /* @emits 'getUnseen' {total: {number}}
   * @private
   */
  _emitUnseen: function _emitUnseen() {
    this.dispatch('getUnseen', {total: this._unseen_count});
  },

  fetchNotifications: function fetchNotifications() {
    if (this._notifications && this._notifications.length) {
      if (this._notifications.length >= this._notificationsTotalCount) {
        return;
      }
    }

    API.getNotifications({
      profileName: Person.get('profileName'),
      data: {
        limit: this._notificationsLimit,
        offset: this._notificationsRequests * this._notificationsLimit
      }
    }, function (err, res) {
      if (err) return console.log(err);
      if (this._notifications) {
        this._notifications = this._notifications.concat(res.notifications);
      } else {
        this._notifications = res.notifications;
      }
      this._notificationsRequests++;
      this._notificationsTotalCount = res.totalCount;
      this._emitNotifications();
    }.bind(this));
  },

  getNotifications: function getNotifications() {
    this._emitNotifications();
  },

  _emitNotifications: function _emitNewNotifications() {
    this.dispatch('notifications', {notifications: this._notifications});
  },

  /* Socket 'newNotifications' event handler
   * @private
   * @emits 'newNotifications'
   */
  _newNotifications: function _newNotifications() {
    this._socket.emit('getNotifications');
  },

  /* @emits 'newNotifications' {notifications: {array}}
   */
  _emitNewNotifications: function _emitNewNotifications() {
    this.dispatch('newNotifications', {
      notifications: this._new_notifications,
      unseen: this._unseen_count
    });
  }
});

setTimeout(function () {
  if (Person.get()) {
    CV.NotificationsStore._run();
  }
}, 0);

