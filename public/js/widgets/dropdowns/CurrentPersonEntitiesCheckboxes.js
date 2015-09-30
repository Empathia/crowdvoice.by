var Person = require('./../../lib/currentPerson');
var Events = require('./../../lib/events');

Class(CV.UI, 'CurrentPersonEntitiesCheckboxes').inherits(Widget)({
    prototype : {
        data : {
            label : '',
            className : 'ui-dropdown-styled'
        },

        _options : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._options = [];
            this._setup()._bindEvents();
        },

        /* Checks the options matching the passed values array.
         * It basically recieves an array of ids and compare them with the existing
         * options, if they match then the option gets selected.
         * @method selectValues <public> [Function]
         * @argument followerIds <required> [Array]
         * @return CurrentPersonEntitiesCheckboxes
         */
        selectValues : function selectValues(followerIds) {
            this._options.forEach(function(follower) {
                if (followerIds.indexOf(follower.id) !== -1) {
                    follower.check();
                }
            });

            return this;
        },

        /* Updates the dropdown's label.
         * @method setLabel <public> [Function]
         * @argument label <required> [String | Node]
         * @return CurrentPersonEntitiesCheckboxes
         */
        setLabel : function setLabel(label) {
            this.dropdown.setLabel(label);
            return this;
        },

        /* Returns the checkbox widgets that are checked
         * @method getValue <public>
         */
        getSelection : function getSelection() {
            return this._options.filter(function(option) {
                return (option.isChecked() === true);
            });
        },

        /* Creates all the dropdown's options.
         * - currentPerson
         * - ownedOrganizations (if any)
         * @return CurrentPersonEntitiesCheckboxes
         */
        _setup : function _setup() {
            this.appendChild(new CV.Dropdown({
                name : 'dropdown',
                label : this.data.label || '- Select an Entity',
                showArrow : true,
                alignment : this.data.alignment || 'bottom',
                className : this.data.className || 'ui-dropdown-styled -lg',
                arrowClassName : '-s10 -color-grey',
                bodyClassName : 'ui-vertical-list hoverable -block'
            })).render(this.el);

            this._createItem(Person.get());

            Person.get().ownedOrganizations.forEach(function(organization) {
                this._createItem(organization);
            }, this);

            this.appendChild(new Widget({
                name : 'buttonRow',
                className : 'button-wrapper'
            }));

            this.appendChild(new CV.UI.Button({
                name : 'doneButton',
                className : 'tiny -m0',
                data : {value: 'Done'}
            })).render(this.buttonRow.element[0]);

            this.dropdown.addContent(this.buttonRow.element[0]);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._doneButtonClickHandlerRef = this._doneButtonClickHandler.bind(this);
            Events.on(this.doneButton.el, 'click', this._doneButtonClickHandlerRef);
            return this;
        },

        /* Creates a dropdown's option.
         * @argument entity <require> [EntityModel]
         */
        _createItem : function _createItem(entity) {
            var label = entity.name + (entity.lastname ? ' ' + entity.lastname : '');

            this.dropdown.addContent(this.appendChild(new CV.UI.Checkbox({
                name : entity.profileName,
                id : entity.id,
                className : 'ui-vertical-list-item -block -p0',
                data : {label : label}
            })).el);

            this._options.push(this[entity.profileName]);
        },

        _doneButtonClickHandler : function _doneButtonClickHandler() {
            this.dispatch('doneButtonClicked');
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this.dropdown.activate();
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this.dropdown.deactivate();
        },

        _enable : function _enable() {
            Widget.prototype._enable.call(this);
            this.dropdown.enable();
        },

        _disable : function _disable() {
            Widget.prototype._disable.call(this);
            this.dropdown.disable();
        },

        destroy : function destroy() {
            Events.off(this.doneButton.el, 'click', this._doneButtonClickHandlerRef);
            this._doneButtonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
