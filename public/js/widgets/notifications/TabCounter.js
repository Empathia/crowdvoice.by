var favico = require('favico.js')
  , NotificationsStore = require('./../../stores/NotificationsStore');

Class(CV, 'TabCounter')({
  prototype: {
    _unseen_total: 0,
    favicon: null,

    init: function init() {
      this._setup()._bindEvents();
    },

    _setup: function _setup() {
      this.favicon = new favico({
        animation:'none'
      });
      return this;
    },

    /* Subscribe to NotificationsStore.
     * @private
     * @return {Object} this
     */
    _bindEvents: function _bindEvents() {
      this._newNotificationsHandlerRef = this._newNotificationsHandler.bind(this);
      NotificationsStore.bind('newNotifications', this._newNotificationsHandlerRef);
      return this;
    },

    /* NotificationsStore 'newNotifications' event handler.
     * @private
     * @param {Object} res
     * @property {Array} res.notifications
     * @prototype {number} res.unseen
     */
    _newNotificationsHandler: function _newNotificationsHandler(res) {
      var total = res.unseen;
      if (this._unseen_total !== total) {
        this._unseen_total = total;
        this.favicon.badge(this._unseen_total);
      }
    }
  }
});
