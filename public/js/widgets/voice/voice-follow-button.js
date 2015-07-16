var API = require('../../lib/api');

Class(CV, 'VoiceFollowButton').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '<button class="cv-button tiny">Follow</button>',
    FOLLOW_TEXT : 'Follow Voice',
    UNFOLLOW_TEXT : 'Unfollow Voice',

    prototype : {
        voice : null,
        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this._updateButtonState()._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this.el.addEventListener('click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            API.followVoice({
                profileName : this.voice.owner.profileName,
                voiceSlug : this.voice.slug
            }, function(err, res) {
                if (err) {
                    console.log(err);
                    return void 0;
                }

                if (res.status === "followed") {
                    this.voice.followed = true;
                } else if (res.status === "unfollowed") {
                    this.voice.followed = false;
                }

                this._updateButtonState();
            }.bind(this));
        },

        _updateButtonState : function _updateButtonState() {
            if (this.voice.followed) {
                this.dom.updateText(this.el, this.constructor.UNFOLLOW_TEXT);
            } else {
                this.dom.updateText(this.el, this.constructor.FOLLOW_TEXT);
            }

            return this;
        }
    }
});
