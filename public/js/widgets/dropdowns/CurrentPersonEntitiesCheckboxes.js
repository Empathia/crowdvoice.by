var Person = require('./../../lib/currentPerson');

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
            this._setup();
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

            return this;
        },

        /* Updates the dropdown's label.
         * @method setLabel <public> [Function]
         * @argument label <required> [String]
         * @return CurrentPersonEntitiesCheckboxes
         */
        setLabel : function setLabel(label) {
            this.dropdown.setLabel(label);
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
        }
    }
});
