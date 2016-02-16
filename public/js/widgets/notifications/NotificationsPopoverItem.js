var Events = require('./../../lib/events');

Class(CV, 'NotificationsPopoverItem').inherits(Widget).includes(BubblingSupport)({
  ELEMENT_CLASS: 'cv-notification-popover-item',
  prototype: {
    /* @property {object} data The notification model.
     * @property {string} data.id
     * @property {string} data.action @ex 'followed you'.
     * @property {object} data.actionDoer The doer entity model.
     * @property {string} data.itemType @ex 'entity', 'voice'
     * @property {object[]} data.entity The affected entity model. (if itemType is 'entity')
     * @property {object[]} data.voice The affected voice model. (if itemType  is 'voice')
     * @property {date} data.createdAt
     * @property {date} data.updatedAt
     */
    data: null,

    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this._setup()._bindEvents();
    },

    _setup: function _setup() {
      this.appendChild(CV.FeedItem.create({
        name: 'item',
        data: this.data,
        className: this.className
      })).render(this.element[0]);
      return this;
    },

    _bindEvents: function _bindEvents() {
      this._clickHandlerRef = this._clickHandler.bind(this);
      Events.on(this.element[0], 'click', this._clickHandlerRef);
    },

    _clickHandler: function _clickHandler(ev) {
      ev.preventDefault();
      var tag = ev.target.tagName.toUpperCase();
      if (tag !== 'A') {
        console.log(this.data.action);
        console.log(this.data);
        var link = this.item.getLink();
        console.log(link);
        if (link) {
          this.dispatch('notification:markAsRead');
          window.location = link;
        }
      }
    },

    destroy: function destroy() {
      Events.off(this.element[0], 'click', this._clickHandlerRef);
      this._clickHandlerRef = null;
      Widget.prototype.destroy.call(this);
      return null;
    }
  }
});
