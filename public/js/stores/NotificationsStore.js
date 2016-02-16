/* Handles the notifications data fetching and emits events letting its
 * subscribers to know when it changes so they can update itself.
 */
var API = require('./../lib/api')
  , Person = require('./../lib/currentPerson');

module.exports = Class(CV, 'NotificationsStore').includes(CustomEventSupport)({
  _socket: null,
  _run: function _run() {
    this._socket = CV.App.prototype.getSocket();
    // TODO: fix, bind to socket event, this is fake to display the flying notifications
    setTimeout(function (_this) {
      _this._newNotifications();
    }, 2000, this);
  },

  /* @property {Number} _unseen_count - Holds the unseen notifications total.
   * @private
   */
  _unseen_count: 0,
  _notifications: null,
  _new_notifications: null,

  /* Fetch the unseen notifications total, updates _unseen_count and dispatch.
   * @static
   * @emits 'getUnseen'
   */
  getUnseen: function getUnseen() {
    // TODO: fix, update the api call so it calls the updated endpoint
    API.getNotifications({
      profileName: Person.get('profileName')
    }, function (err, res) {
      if (err) return console.log(err);
      var len = res.length;
      if (this._unseen_count !== len) {
        this._unseen_count = len;
        this._emitUnseen();
      }
    }.bind(this));
  },

  /* Decrease the _unseen_count by one and emits the getUnseen event.
   * @static
   * @emits 'getUnseen'
   */
  decreaseUnseen: function decreaseUnseen() {
    if (this._unseen_count > 0) {
      this._unseen_count--;
      this._emitUnseen();
    }
  },

  /* @emits 'getUnseen' {total: {number}}
   * @private
   */
  _emitUnseen: function _emitUnseen() {
    this.dispatch('getUnseen', {total: this._unseen_count});
  },

  getNotifications: function getNotifications() {
    // TODO: fix, update the api call so it calls the updated endpoint
    API.getNotifications({
      profileName: Person.get('profileName')
    }, function (err, res) {
      if (err) return console.log(err);
      this._notifications = res;
      this._emitNotifications();
    }.bind(this));
  },

  _emitNotifications: function _emitNewNotifications() {
    this.dispatch('notifications', {notifications: this._notifications});
  },

  /* Socket 'newNotifications' event handler
   * @private
   * @emits 'newNotifications'
   */
  _newNotifications: function _newNotifications() {
    // TODO: fix, use the socket event to emit, no API calls
    API.getNotifications({
      profileName: Person.get('profileName')
    }, function (err, res) {
      if (err) return console.log(err);
      if (res.length) {
        this._new_notifications = res;
        this._emitNewNotifications();
      }
    }.bind(this));
  },

  /* @emits 'newNotifications' {notifications: {array}}
   */
  _emitNewNotifications: function _emitNewNotifications() {
    this.dispatch('newNotifications', {notifications: this._new_notifications});
  }
});

setTimeout(function () {
  if (Person.get()) {
    CV.NotificationsStore._run();
  }
}, 0);

