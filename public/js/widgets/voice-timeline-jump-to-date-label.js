Class(CV, 'VoiceTimelineJumpToDateLabel').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'voice-timeline-popover_label',

    prototype : {
        label : '',

        el : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.dom.updateText(this.el, this.label);
        }
    }
});
