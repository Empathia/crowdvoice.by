/* Follow Voice Button Widget.
 * Handles its click event, calls the followVoice API endpoint, handles its
 * response and updates the button state.
 */
var API = require('./../../lib/api');
var Person = require('./../../lib/currentPerson');
var Events = require('./../../lib/events');

Class(CV, 'VoiceFollowButton').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '<button class="cv-button tiny">Follow</button>',
    FOLLOW_TEXT : 'Follow Voice',
    UNFOLLOW_TEXT : 'Unfollow Voice',

    prototype : {
        /* Current Voice Model.
         * @property voice <required> [Object]
         */
        voice : null,
        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._updateButtonState()._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
        },

        /* Handles the button click event.
         * Calls the API followVoice endpoint and handles its response.
         * @method _clickHandler <private> [Function]
         * @return undefined
         */
        _clickHandler : function _clickHandler() {
            API.followVoice({
                profileName : this.voice.owner.profileName,
                voiceSlug : this.voice.slug,
                data : {
                    followerId : Person.get().id
                }
            }, function(err, res) {
                if (err) {
                    return;
                }

                if (res.status === "followed") {
                    this.voice.followed = true;
                } else if (res.status === "unfollowed") {
                    this.voice.followed = false;
                }

                this._updateButtonState();
            }.bind(this));
        },

        /* Updates the button's text based on if currentPerson is following the
         * current voice.
         * @method _updateButtonState <private> [Function]
         * @return VoiceFollowButton
         */
        _updateButtonState : function _updateButtonState() {
            if (this.voice.followed) {
                this.dom.updateText(this.el, this.constructor.UNFOLLOW_TEXT);
            } else {
                this.dom.updateText(this.el, this.constructor.FOLLOW_TEXT);
            }

            return this;
        },

        destroy : function destroy() {
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            this.el = null;

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
