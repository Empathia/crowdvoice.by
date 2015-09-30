Class(CV.UI, 'Button').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-button',
    HTML : '<button></button>',
    prototype : {
        data : {
            value : ''
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.updateText(this.data.value);
        },

        updateText : function updateText(text) {
            this.dom.updateText(this.el, text);
        },

        updateHTML : function updateHTML(string) {
            this.dom.updateHTML(this.el, string);
        },

        _enable : function _enable() {
            Widget.prototype._enable.call(this);
            this.el.removeAttribute('disabled');
        },

        _disable : function _disable() {
            Widget.prototype._disable.call(this);
            this.el.setAttribute('disabled', true);
        }
    }
});
