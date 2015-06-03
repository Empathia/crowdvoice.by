Class(CV, 'VoiceTimelineJumpToDateItem').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS :'voice-timeline-popover_option',

    prototype : {
        label : '',
        date : '',

        el: null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.dom.updateText(this.el, this.label);

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this.clickHandlerRef = this.clickHandler.bind(this);
            this.el.addEventListener('click', this.clickHandlerRef);
        },

        clickHandler : function clickHandler() {
            console.log(this.date);
            CV.VoiceTimelineJumpToDateItem.dispatch('itemClicked', {dateString: this.date});
            this.parent.updateActivateOption(this.date);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el.removeEventListener('click', this.clickHandlerRef);
            this.clickHandlerRef = null;
        }
    }
});
