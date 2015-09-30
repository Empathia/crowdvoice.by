var Person = require('./../../lib/currentPerson');

Class(CV, 'VoiceFooter').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <footer class="voice-footer">\
            <div class="voice-footer-inner -clearfix">\
                <div class="voice-footer-meta-wrapper -float-left">\
                    <div class="voice-footer-title -font-bold"></div>\
                    <div class="voice-footer-by -color-grey">\
                        by <a href=""></a>\
                    </div>\
                </div>\
                <div class="voice-footer-right -float-right"></div>\
            </div>\
        </footer>',

    prototype : {
        /* OPTIONS */
        voice : null,
        voiceScrollableArea : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.actionsColumn = this.el.querySelector('.voice-footer-right');
            this.byAnchor = this.el.querySelector('.voice-footer-by > a');

            this.dom.updateText(this.el.querySelector('.voice-footer-title'), this.voice.title);

            if (this.voice.owner.isAnonymous) {
              this.dom.updateAttr('href', this.byAnchor, '/anonymous');
            } else {
              this.dom.updateAttr('href', this.byAnchor, '/' + this.voice.owner.profileName);
            }

            this.dom.updateAttr('alt', this.byAnchor, this.voice.owner.name + ' ' + this.voice.owner.lastname + '’s profile page');
            if (this.voice.owner.type === 'organization' || this.voice.owner.isAnonymous){
                this.dom.updateText(this.byAnchor, this.voice.owner.name);
            } else {
                this.dom.updateText(this.byAnchor, this.voice.owner.name + ' ' + this.voice.owner.lastname);
            }

            this.appendChild(new CV.VoiceTimelineFeedback({
                name : 'voiceTimelineFeedback',
                firstPostDate : this.voice.firstPostDate,
                lastPostDate : this.voice.lastPostDate,
                scrollableArea : this.voiceScrollableArea
            })).render(this.element);

            if (this.allowPosting) {
                this.appendChild(new CV.VoiceAddContent({
                    name : 'voiceAddContent',
                    voice : this.voice
                })).render(this.element);
            }

            if ((!Person.anon()) && (!Person.memberOf('voice', this.voice.id))) {
                this.appendChild(new CV.VoiceFollowButton({
                    name : 'followButton',
                    voice : this.voice
                })).render(this.actionsColumn);
            }

            if (Person.is(this.voice.owner.id)) {
                this.appendChild(new CV.ManageContributorsButton({
                    name : 'manageContributors'
                })).render(this.actionsColumn);
            }

            this.appendChild(new CV.RelatedVoicesButton({
                name : 'relatedVoicesButton',
                editMode : (Person.get() && !Person.anon() && Person.memberOf('voice', this.voice.id)),
                voice : this.voice
            })).render(this.actionsColumn);

            // currentPerson does not belongs/owns this voice already?
            if ((!Person.anon()) && (!Person.memberOf('voice', this.voice.id))) {
                this.appendChild(new CV.VoiceRequestToContribute({
                    name : 'voiceRequestToContribute'
                })).render(this.actionsColumn);
            }

            this.appendChild(new CV.VoiceFooterShareButtonsGroup({
                name : 'shareButtons'
            })).render(this.actionsColumn);

            if (this.voice.type !== CV.VoiceView.TYPE_CLOSED || this.allowPostEditing) {
                this.appendChild(new CV.VoiceModerateButton({
                    name : 'voiceModerate',
                    allowPostEditing : this.allowPostEditing
                })).render(this.actionsColumn);
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
