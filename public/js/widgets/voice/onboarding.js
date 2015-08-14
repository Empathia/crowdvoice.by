Class(CV, 'VoiceOboarding').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-voice-onboarding',
    HTML : '\
        <div>\
            <p class="cv-voice-onboarding__title -font-bold">Great!</p>\
            <p class="cv-voice-onboarding__desc"><i>You can now start adding content by clicking this big round button.</i></p>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});

