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
                    lastPostDate : this.lastPostDate,
                    scrollableArea : document.getElementsByClassName('cv-main-content')[0]
                })
            ).render(this.element);
        },

        /* Sets the Timeline's inital date.
         * @public
         */
        setTimelineInitialDate : function setTimelineInitialDate(timestamp) {
            this.voiceTimelineFeedback.setInitialFeedbackDate(timestamp);

            return this;
        },

        /* Updates the timeline's screen size related variables values.
         * @public
         */
        updateTimelineVars : function updateTimelineVars() {
            this.voiceTimelineFeedback.updateVars();

            return this;
        }
    }
});
