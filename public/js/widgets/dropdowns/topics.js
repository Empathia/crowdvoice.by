var Topics = require('./../../lib/registers/topics');

Class(CV.UI, 'DropdownTopics').inherits(Widget)({
    HTML : '\
        <div class="ui-form-field">\
            <label class="-block">\
                <span class="ui-input__label -upper -font-bold">Voice Topics</span>\
            </label>\
        </div>\
    ',

    prototype : {
        _options : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._options = [];

            this.appendChild(new CV.Dropdown({
                name : 'dropdown',
                label : '- Select at least one',
                showArrow : true,
                className : 'dropdown-topics ui-dropdown-styled -lg',
                arrowClassName : '-s10 -color-grey',
                bodyClassName : 'ui-vertical-list hoverable -full-width'
            })).render(this.el);

            Topics.get().forEach(function(topic) {
                this.dropdown.addContent(this.appendChild(new CV.UI.Checkbox({
                    name : topic.slug,
                    id : topic.id,
                    className : 'ui-vertical-list-item -block -p0',
                    data : {label : topic.name}
                })).el);

                this._options.push(this[topic.slug]);
            }, this);
        },

        selectValues : function selectValues(topics) {
            var topicsIds = topics.map(function(topic) {
                return topic.id;
            });

            this._options.forEach(function(topic) {
                if (topicsIds.indexOf(topic.id) !== -1) {
                    topic.check();
                }
            });

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

        /* Sets the error state on the dropdown.
         * @method error <public>
         */
        error : function error() {
            this.dropdown.error();
            return this;
        }
    }
});
