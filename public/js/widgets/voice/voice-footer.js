Class(CV, 'VoiceFooter').inherits(Widget)({
    prototype : {
        /* OPTIONS */
        firstPostDate : '',
        lastPostDate : '',
        scrollableArea : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.actionsColumn = this.el.querySelector('.voice-footer-right');

            this.appendChild(
                new CV.VoiceTimelineFeedback({
                    name : 'voiceTimelineFeedback',
                    firstPostDate : this.firstPostDate,
                    lastPostDate : this.lastPostDate,
                    scrollableArea : this.scrollableArea
                })
            ).render(this.element);

            // @TODO:
            // add condition based on the user type and or privilegies (ACL)
            // and or based on the voice type (open|close)
            this.appendChild(
                new CV.VoiceAddContent({
                    name : 'voiceAddContent'
                })
            ).render(this.element);

            this.appendChild(
                new CV.VoiceFollowButton({
                    name : 'followButton'
                })
            ).render(this.actionsColumn);

            this.appendChild(
                new CV.VoiceRelatedVoices({
                    name : 'relatedVoicesButton'
                })
            ).render(this.actionsColumn);

            this.appendChild(
                new CV.VoiceRequestToContribute({
                    name : 'voiceRequestToContribute'
                })
            ).render(this.actionsColumn);

            this.appendChild(
                new CV.VoiceModerate({
                    name : 'voiceModerate'
                })
            ).render(this.actionsColumn);

        },

        /* Sets the Timeline's inital date.
         * @method setTimelineInitialDate <public> [Function]
         */
        setTimelineInitialDate : function setTimelineInitialDate(timestamp) {
            this.voiceTimelineFeedback.setInitialFeedbackDate(timestamp);

            return this;
        },

        /* Updates the timeline's screen size related variables values.
         * @method updateTimelineVars <public> [Function]
         */
        updateTimelineVars : function updateTimelineVars() {
            this.voiceTimelineFeedback.updateVars();

            return this;
        },

        /* Updates the 'jump to date' popover, activating the current option
         * @method updateTimelineDatesMenu <public> [Function]
         */
        updateTimelineDatesMenu : function updateTimelineDatesMenu(dateString) {
            this.voiceTimelineFeedback.activateJumpToDateOption(dateString);
        },

        /* Instantiate and append the jump to date widget on its timeline chidlren.
         * @method createJumpToDateBubble <public> [Function]
         */
        createJumpToDateBubble : function createJumpToDateBubble(totalLayers) {
            this.voiceTimelineFeedback.createJumpToDateBubble(totalLayers);
        }
    }
});
