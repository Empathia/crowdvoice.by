Class(CV, 'VoiceFollowButton').inherits(Widget)({

    HTML : '<button class="cv-button tiny primary">Follow Voice</button>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
