var Events = require('./../../lib/events');

Class(CV.UI, 'DropdownVoiceTypes').inherits(Widget)({
  HTML: '\
    <div class="ui-form-field">\
      <label class="-block">\
        <span class="ui-input__label -upper -font-bold">Voice Type</span>\
      </label>\
    </div>',

  prototype: {
    _items: null,
    _value: null,

    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];

      this.appendChild(new CV.Dropdown({
        name: 'dropdown',
        label: '- Select the voice type',
        showArrow: true,
        className: 'dropdown-topics ui-dropdown-styled -lg',
        arrowClassName: '-s10 -color-grey',
        bodyClassName: 'ui-vertical-list hoverable -block',
        content: '\
          <div class="ui-vertical-list-item" data-value="TYPE_PUBLIC">Public</div>\
          <div class="ui-vertical-list-item" data-value="TYPE_CLOSED">Closed</div>'
      })).render(this.el);

      this._items = [].slice.call(this.dropdown.getContent());

      this._bindEvents();
    },

    /* Subscribe widget’s events.
     * @private
     */
    _bindEvents: function _bindEvents() {
      this._clickHandlerRef = this._clickHandler.bind(this);
      this._items.forEach(function(item) {
        Events.on(item, 'click', this._clickHandlerRef);
      }, this);
      return this;
    },

    /* Handle the dropdown items click.
     * @private
     */
    _clickHandler: function _clickHandler(ev) {
      this.selectByElement(ev.target);
    },

    /* Selects dropdown option by item element.
     * @public
     * @param {NodeElement} element - the dropdown option element to select.
     */
    selectByElement: function selectByElement(element) {
      this._value = element.dataset.value;
      this._items.forEach(function(item) {
        item.classList.remove('active');
      });
      element.classList.add('active');
      this.dropdown.setLabel(element.textContent).deactivate();
      return this;
    },

    /* Selects dropdown option by item `data-value`.
     * @public
     * @param {string} value - the option’s data to be selected.
     */
    selectByValue: function selectByValue(value) {
      this._items.some(function(i) {
        if (i.getAttribute('data-value') === value) {
          this.selectByElement(i);
          return true;
        }
      }, this);
      return this;
    },

    /* Returns the `data-value` value of the current option selected.
     * @public
     */
    getValue: function getValue() {
      return this._value;
    },

    /* Sets the error state on the dropdown.
     * @public
     */
    error: function error() {
      this.dropdown.error();
      return this;
    },

    destroy: function destroy() {
      Widget.prototype.destroy.call(this);
      this._items.forEach(function(item) {
        Events.off(item, 'click', this._clickHandlerRef);
      }, this);
      this._clickHandlerRef = null;
      return null;
    }
  }
});
