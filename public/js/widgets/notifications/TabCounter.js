var favico = require('favico.js')
  , NotificationsStore = require('./../../stores/NotificationsStore');

Class(CV, 'TabCounter')({
  prototype: {
    _unseen_total: 0,
    favicon: null,

    init: function init() {
      this._setup()._bindEvents();
      NotificationsStore.getUnseen();
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
      this._getUnseenHandlerRef = this._getUnseenHandler.bind(this);
      NotificationsStore.bind('getUnseen', this._getUnseenHandlerRef);
      return this;
    },

    /* Handles NotificationsStore 'getUnseen' event.
     * @param {Object} res
     * @property {number} res.total
     */
    _getUnseenHandler: function _getUnseenHandler(res) {
      var total = res.total;
      if (this._unseen_total !== total) {
        this._unseen_total = total;
        this.favicon.badge(this._unseen_total);
      }
    }
  }
});
