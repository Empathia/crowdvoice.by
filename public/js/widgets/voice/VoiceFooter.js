var Person = require('./../../lib/currentPerson');

Class(CV, 'VoiceFooter').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <footer class="voice-footer">\
            <div class="voice-footer-inner -clearfix">\
                <div class="voice-footer-meta-wrapper -float-left">\
                    <div class="voice-footer-meta-inner">\
                        <div class="voice-footer-stats">\
                            <span class="voice-stat -inline-block" data-stats-post-count></span>\
                            <span class="voice-stat -inline-block" data-stats-followers></span>\
                            <span class="voice-stat -inline-block" data-stats-location></span>\
                        </div>\
                        <div class="voice-footer-owner-data">\
                            <div class="voice-footer-title -font-bold"></div>\
                            <div class="voice-footer-by">\
                                by <a href=""></a>\
                            </div>\
                        </div>\
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

            this._setup();
        },

        _setup : function _setup() {
            this.dom.updateText(this.el.querySelector('.voice-footer-title'), this.voice.title);

            if (this.voice.owner.isAnonymous) {
                this.dom.updateAttr('href', this.byAnchor, '/anonymous');
            } else {
                this.dom.updateAttr('href', this.byAnchor, '/' + this.voice.owner.profileName);
            }

            this.dom.updateAttr('title', this.byAnchor, this.voice.owner.name + '’s profile page');
            if (this.voice.owner.type === 'organization' || this.voice.owner.isAnonymous){
                this.dom.updateText(this.byAnchor, this.voice.owner.name);
            } else {
                this.dom.updateText(this.byAnchor, this.voice.owner.name);
            }

            window.CardHoverWidget.register(this.byAnchor, this.voice.owner);

            this.dom.updateText(this.el.querySelector('[data-stats-post-count]'), this.format.numberUS(this.postCount) + ' posts');
            this.dom.updateText(this.el.querySelector('[data-stats-followers]'), this.format.numberUS(this.followerCount) + ' followers');

            this.appendChild(new CV.VoiceTimelineFeedback({
                name : 'voiceTimelineFeedback',
                firstPostDate : this.voice.firstPostDate,
                lastPostDate : this.voice.lastPostDate,
                scrollableArea : this.voiceScrollableArea
            })).render(this.element);

            this.appendChild(new CV.VoiceFilterPostsDropdown({
                name : 'filterDropdown'
            })).render(this.actionsColumn);

            if (Person.get() && (!Person.anon())) {
                if (Person.get().ownedOrganizations.length) {
                    this.appendChild(new CV.VoiceFollowMultipleButton({
                        name : 'followButton',
                        voice : this.voice,
                        className : '-inline-block'
                    })).render(this.actionsColumn);
                } else {
                    this.appendChild(new CV.VoiceFollowSingleButton({
                        name : 'followButton',
                        voice : this.voice,
                        className : 'tiny'
                    })).render(this.actionsColumn);
                }
            } else {
                this.appendChild(new CV.VoiceFollowSingleButton({
                    name : 'followButton',
                    voice : this.voice,
                    className : 'tiny'
                })).render(this.actionsColumn).disable();
            }

            if (Person.ownerOf('voice', this.voice.id)) {
                this.appendChild(new CV.ManageContributorsButton({
                    name : 'manageContributors',
                    className : 'tiny',
                    data : {
                        value: 'Manage Contributors',
                        voice : this.voice,
                        contributors : this.contributors
                    }
                })).render(this.actionsColumn);
            }

            var relatedVoicesDiv = document.createElement('div');
            relatedVoicesDiv.className = '-inline-block';
            this.appendChild(new CV.RelatedVoicesButton({
                name : 'relatedVoicesButton',
                voice : this.voice,
                className : 'tiny',
                relatedVoices : this.relatedVoices
            })).render(relatedVoicesDiv);
            this.actionsColumn.appendChild(relatedVoicesDiv);

            this.appendChild(new CV.VoiceFooterShareButtonsGroup({
                name : 'shareButtons',
                voice : this.voice
            })).render(this.actionsColumn);

            if (this.voice.type !== CV.VoiceView.TYPE_CLOSED || this.allowPostEditing) {
                this.appendChild(new CV.VoiceModerateButton({
                    name : 'voiceModerate',
                    allowPostEditing : this.allowPostEditing
                })).render(this.actionsColumn);
            }

            if ((Person.ownerOf('voice', this.voice.id) === false) &&
                (this.voice.type === CV.VoiceView.TYPE_CLOSED)) {

                var _showRequestToContribute = false;

                if (this.voice.owner.type === 'organization')  {
                    if (Person.memberOf('organization', this.voice.owner.id) === false) {
                        _showRequestToContribute = true;
                    }
                } else if (Person.memberOf('voice', this.voice.id) === false) {
                    _showRequestToContribute = true;
                }

                if (_showRequestToContribute) {
                    this.appendChild(new CV.VoiceRequestToContribute({
                        name : 'voiceRequestToContribute',
                        voice : this.voice
                    })).render(this.actionsColumn);

                    if (!Person.get()) {
                        this.voiceRequestToContribute.disable();
                    }
                }
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
