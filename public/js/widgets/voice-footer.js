Class(CV, 'VoiceFooter').inherits(Widget)({
    prototype : {
        /* OPTIONS */
        firstPostDate : '',
        lastPostDate : '',

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.appendChild(
                new CV.VoiceTimelineFeedback({
                    name : 'voiceTimelineFeedback',
                    firstPostDate : this.firstPostDate,
                    lastPostDate : this.lastPostDate
                })
            ).render(this.element);
        }
    }
});
