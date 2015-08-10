Class(CV, 'VoiceCoverActionsDelete').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : '-color-negative',
    HTML : '<a href="">Delete</a>',
    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
        }
    }
});
