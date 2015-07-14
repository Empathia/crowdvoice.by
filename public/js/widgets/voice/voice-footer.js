Class(CV, 'VoiceFooter').inherits(Widget)({
    prototype : {
        /* OPTIONS */
        id : '',
        voiceType : '',
        firstPostDate : '',
        lastPostDate : '',
        scrollableArea : null,
        allowPosting : false,
        allowPostEditing : false,

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

            if (this.allowPosting) {
                this.appendChild(new CV.VoiceAddContent({
                    name : 'voiceAddContent'
                })).render(this.element);
            }

            this.appendChild(new CV.VoiceFollowButton({
                name : 'followButton'
            })).render(this.actionsColumn);

            this.appendChild(new CV.VoiceRelatedVoices({
                name : 'relatedVoicesButton'
            })).render(this.actionsColumn);

            // currentPerson does not belongs/owns this voice already?
            if (window.currentPerson && (window.currentPerson.voiceIds.indexOf(this.id) === -1)) {
                this.appendChild(new CV.VoiceRequestToContribute({
                    name : 'voiceRequestToContribute'
                })).render(this.actionsColumn);
            }

            this.appendChild(new CV.VoiceFooterShareButtonsGroup({
                name : 'shareButtons'
            })).render(this.actionsColumn);

            if (this.voiceType !== CV.VoiceView.TYPE_CLOSED ||
                this.allowPostEditing) {
                this.appendChild(
                    new CV.VoiceModerate({
                        name : 'voiceModerate',
                        allowPostEditing : this.allowPostEditing
                    })
                ).render(this.actionsColumn);
            }

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
