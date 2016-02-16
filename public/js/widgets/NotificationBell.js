var NotificationsStore = require('./../stores/NotificationsStore')
  , Events = require('./../lib/events');

Class('NotificationBell').inherits(Widget).includes(CV.WidgetUtils)({
  HTML: '\
    <button class="header-notification-button header-actions-button cv-button small rounded -p0 -rel ui-has-tooltip">\
      <svg class="header-actions-svg -s17">\
        <use xlink:href="#svg-notifications"></use>\
      </svg>\
      <span class="ui-badge -abs"></span>\
      <span class="ui-tooltip -bottom -nw">Notifications</span>\
    </button>',

  prototype: {
    init: function(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this.badgeElement = this.el.querySelector('.ui-badge');
      this._bindEvents();
    },

    _bindEvents: function _bindEvents() {
      this._newNotificationsHandlerRef = this._newNotificationsHandler.bind(this);
      NotificationsStore.bind('newNotifications', this._newNotificationsHandlerRef);

      this._toggleNotificationsPopoverHandlerRef = this._toggleNotificationsPopoverHandler.bind(this);
      Events.on(this.el, 'click', this._toggleNotificationsPopoverHandlerRef);
      return this;
    },

    /* Button click event handler.
     * Toggle the NotificationsPopover widget.
     * @private
     */
    _toggleNotificationsPopoverHandler: function _toggleNotificationsPopoverHandler() {
      console.log('toggle notifications popover');

      if (this.notificationsPopover) this.notificationsPopover = this.notificationsPopover.destroy();

      this.appendChild(new CV.PopoverBlocker({
        name: 'notificationsPopover',
        className: 'notifications-popover',
        placement: 'bottom-right',
        content: CV.NotificationsPopover
      })).render(this.el);

      requestAnimationFrame(function () {
        this.notificationsPopover.activate();
      }.bind(this));
    },

    /* NotificationsStore 'newNotifications' event handler.
     * @private
     * @param {Object} res
     * @property {Array} res.notifications
     * @prototype {number} res.unseen
     */
    _newNotificationsHandler: function _newNotificationsHandler(res) {
      this._updateBubbleState(res.unseen);
    },

    /* Updates the bubble and button state.
     * @private
     */
    _updateBubbleState: function _updateBubbleState(notificationsLength) {
      this._notificationsLength = notificationsLength;

      if (this._notificationsLength) {
        this.dom.updateText(this.badgeElement, this._notificationsLength);
        this.dom.addClass(this.el, ['has-new-notifications']);
      } else {
        this.dom.removeClass(this.el, ['has-new-notifications']);
      }
    },

    destroy: function destroy() {
      NotificationsStore.unbind('getUnseen', this._getUnseenHandlerRef);
      this._getUnseenHandlerRef = null;

      Events.off(this.el, 'click', this._toggleNotificationsPopoverHandlerRef);
      this._toggleNotificationsPopoverHandlerRef = null;

      Widget.prototype.destroy.call(this);
      return null;
    }
  }
});
