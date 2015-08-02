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
                <span class="ui-checkbox-label">Label</span>\
            </label>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
        }
    }
});
