Class(CV, 'VoiceRelatedVoices').inherits(Widget)({

    HTML : '<button class="cv-button tiny primary">Related Voices</button>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
