Class(CV.UI, 'Checkbox').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="ui-checkbox">\
            <label>\
                <input class="ui-checkbox-checkbox" type="checkbox"/>\
                <span class="ui-checkbox-element">\
                    <svg class="-s8">\
                        <use xlink:href="#svg-checkmark"></use>\
                    </svg>\
                </span>\
                <span class="ui-checkbox-label"></span>\
            </label>\
        </div>',

    prototype : {
        data : {
            label : '',
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.checkbox = this.el.querySelector('.ui-checkbox-checkbox');
            this.labelElement = this.el.querySelector('.ui-checkbox-label');
            this._setup();
        },

        _setup : function _setup() {
            if (this.data.label) {
                this.dom.updateText(this.labelElement, this.data.label);
            }
            return this;
        },

        isChecked : function isChecked() {
            return this.checkbox.checked;
        },

        check : function check() {
            this.checkbox.checked = true;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
        }
    }
});
