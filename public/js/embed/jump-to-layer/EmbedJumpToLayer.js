var moment = require('moment');
var GeminiScrollbar = require('gemini-scrollbar');
var Events = require('./../../lib/events');

Class(CV, 'EmbedJumpToLayer').inherits(Widget)({
  prototype: {
    init : function init(config) {
      Widget.prototype.init.call(this, config);
      this._optionChilds = [];
      this._setup()._bindEvents();
    },

    _setup : function _setup() {
      this.appendChild(new CV.PopoverBlocker({
        name : 'jumpToDatePopover',
        className : 'voice-timeline-popover',
        title : 'Jump to',
        placement : 'bottom',
        showCloseButton : true,
        hasScrollbar : true
      })).render(this.triggerElement);

      this._createJumpToLayerOptions();

      return this;
    },

    /* Subscribe to the wiget’s events.
     * @private
     */
    _bindEvents : function _bindEvents() {
      this._activatePopoverRef = this._activatePopover.bind(this);
      Events.on(this.triggerElement, 'click', this._activatePopoverRef);

      this._handleDeactivatePopoverRef = this._handleDeactivatePopover.bind(this);
      this.jumpToDatePopover.bind('deactivate', this._handleDeactivatePopoverRef);

      this._itemClickedRef = this._itemClicked.bind(this);
      this._optionChilds.forEach(function (option) {
        option.bind('jumpToLayerItemClicked', this._itemClickedRef);
      }, this);
    },

    /* Creates the menu options for all years and months including the total post counters.
     * @method _createJumpToLayerOptions <private> [Function]
     */
    _createJumpToLayerOptions : function _createJumpToLayerOptions() {
      var frag = document.createDocumentFragment();
      var _lastYear, optionWidget;

      this.postsCount.forEach(function(yearItem) {
        var year = yearItem.year;

        yearItem.months.forEach(function(monthItem) {
          var date = moment(year + '-' + monthItem.month + '-01', 'YYYY-MM-DD');
          var dateString = date.format('YYYY-MM');
          var month = date.format('MMMM');

          if (_lastYear !== year) {
            _lastYear = year;

            this.appendChild(new CV.EmbedJumpToLayerLabel({
              name : 'label_' + year,
              label : year
            }));

            frag.appendChild(this['label_' + year].el);
          }

          optionWidget = new CV.EmbedJumpToLayerItem({
            name : 'item_' + dateString,
            label : month,
            date : dateString,
            totalPosts : monthItem.total
          });

          this.appendChild(optionWidget);
          this._optionChilds.push(optionWidget);

          frag.appendChild(optionWidget.el);

          dateString = month = null;
        }, this);

        year = null;
      }, this);

      this.jumpToDatePopover.getContent().className += ' ui-vertical-list hoverable';
      this.jumpToDatePopover.setContent(frag);

      this.scrollbar = new GeminiScrollbar({
        element : this.jumpToDatePopover.getContent()
      }).create();

      frag = _lastYear = optionWidget = null;
    },

    /* Handles the popover item click event.
     * @private
     */
    _itemClicked : function _itemClicked(ev) {
      ev.stopPropagation();
      this.updateActiveOption(ev.dateString);
      this.jumpToDatePopover.deactivate();
      this.dispatch('jumpToLayer', {dateString: ev.dateString});
    },

    /* Deactivate any active option and activate the one that matches the passed dateString by name.
     * @public
     * @param {string} dateString - @ex `1987-07`
     * @emits {activate} emits EmbedJumpToLayerPopover `activate` event dispatched by the widget.activate method.
     * @return {Object} EmbedJumpToLayerPopover
     */
    updateActiveOption : function updateActiveOption(dateString) {
      this._optionChilds.forEach(function(child) {
        child.deactivate();
      });
      this['item_' + dateString].activate();
      return this;
    },

    /* Handles the triggerElement click event.
     * @private
     */
    _activatePopover : function _activatePopover(ev) {
      var popover = this.jumpToDatePopover.el;

      this.jumpToDatePopover.activate();
      popover.style.left = ev.pageX + 'px';

      var left = popover.offsetLeft;
      var width = popover.offsetWidth;
      var farRight = (left + width);
      var w = window.innerWidth;
      var diff = (farRight - w);

      if (diff > 0) {
        var transform = 'translateX(' + ((diff + 10) * -1) + 'px)';
        popover.style.msTransform =  transform;
        popover.style.webkitTransform = transform;
        popover.style.transform = transform;
      }

      if (left < 0) {
        popover.style.left = '10px';
      }

      this.scrollbar.update();
      this.activate();
    },

    /* Handles the jumpToDatePopover `deactivate` event.
     * @private
     */
    _handleDeactivatePopover : function _handleDeactivatePopover() {
      this.jumpToDatePopover.el.style.msTransform = '';
      this.jumpToDatePopover.el.style.webkitTransform = '';
      this.jumpToDatePopover.el.style.transform = '';
      this.deactivate();
    },

    destroy : function destroy() {
      Widget.prototype.destroy.call(this);
      this._handleDeactivatePopoverRef = null;

      Events.off(this.triggerElement, 'click', this._activatePopoverRef);
      this._activatePopoverRef = null;

      return null;
    }
  }
});
