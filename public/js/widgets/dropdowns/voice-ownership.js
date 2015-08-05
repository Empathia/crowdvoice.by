var Person = require('./../../lib/currentPerson');
var Events = require('./../../lib/events');

Class(CV.UI, 'DropdownVoiceOwnership').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="ui-form-field">\
            <label class="-block">\
                <span class="ui-input__label -upper -font-bold">Voice Ownership</span>\
            </label>\
        </div>',

    prototype : {
        _items : null,
        _value : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.appendChild(new CV.Dropdown({
                name : 'dropdown',
                label : '- Select voice ownership',
                showArrow : true,
                className : 'dropdown-topics ui-dropdown-styled -lg',
                arrowClassName : '-s10 -color-grey',
                bodyClassName : 'ui-vertical-list hoverable -block'
            })).render(this.el);

            this._setup()._bindEvents();
        },

        selectByIndex : function selectByIndex(index) {
            this._items[index].click();
            return this;
        },

        _setup : function _setup() {
            this._createItem((Person.get().name + ' ' + Person.get().lastname).trim(), Person.get().id);

            Person.get().ownedOrganizations.forEach(function(organization) {
                this._createItem(organization.name, organization.id);
            }, this);

            this._items = [].slice.call(this.dropdown.getContent());

            return this;
        },

        _createItem : function _createItem(label, value) {
            var item = this.dom.create('div');
            item.className = 'ui-vertical-list-item';
            this.dom.updateText(item, label);
            this.dom.updateAttr('data-value', item, value);
            this.dropdown.addContent(item);
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this._items.forEach(function(item) {
                Events.on(item, 'click', this._clickHandlerRef);
            }, this);
            return this;
        },

        _clickHandler : function _clickHandler(ev) {
            this._value = ev.target.dataset.value;
            this._items.forEach(function(item) {
                item.classList.remove('active');
            });
            ev.target.classList.add('active');
            this.dropdown.setLabel(ev.target.innerText).deactivate();
        },

        /* Returns the data-value of the current selected option
         * @method getValue <public>
         */
        getValue : function getValue() {
            return this._value;
        },

        /* Sets the error state on the dropdown.
         * @method error <public>
         */
        error : function error() {
            this.dropdown.error();
            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            this._items.forEach(function(item) {
                Events.off(item, 'click', this._clickHandlerRef);
            }, this);
            this._clickHandlerRef = null;
            return null;
        }
    }
});
