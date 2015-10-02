/* This version of the button replaces the default one when the user is a also
 * an Organization Owner. The user then has to decide to follow a Voice, User
 * or Organization as him/herself or as the organization.
 * @inherits Widget
 */
var API = require('./../../../lib/api');

Class(CV, 'VoiceFollowMultipleButton').inherits(Widget).includes(CV.WidgetUtils)({
    FOLLOW_AS_TEXT : 'Follow Voice As..',
    FOLLOWING_AS_TEXT : '\
        <svg class="-s10 -vam">\
            <use xlink:href="#svg-checkmark"></use>\
        </svg>\
        <span style="padding-left:.4em;">Following Voice As...</span>',

    prototype : {
        /* Current Voice Model.
         * @property voice <required> [Object]
         */
        voice : null,

        _followerIds : null,
        _requestsPending : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._setup()._bindEvents()._updateButtonState();
        },

        _setup : function _setup() {
            this.appendChild(new CV.UI.CurrentPersonEntitiesCheckboxes({
                name : 'dropdown',
                data : {
                    className : 'dropdown-entities-checkboxes ui-dropdown-styled -sm'
                }
            })).render(this.el);

            this._followerIds = this.voice.followersOwnedByCurrentPerson.slice();
            this.dropdown.selectValues(this._followerIds);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._doneButtonClickHandlerRef = this._doneButtonClickHandler.bind(this);
            this.dropdown.bind('doneButtonClicked', this._doneButtonClickHandlerRef);
            return this;
        },

        _doneButtonClickHandler : function _doneButtonClickHandler() {
            this.dropdown.deactivate();
            this.dropdown.disable();

            var A = this._followerIds;
            var B = this.dropdown.getSelection().map(function(option) {
                return option.id;
            });

            var unfollow = A.filter(function(x) {return B.indexOf(x) < 0;});
            var follow = B.filter(function(x) {return A.indexOf(x) < 0;});

            /* update this._followerIds local copy of voice.followersOwnedByCurrentPerson array */
            unfollow.forEach(function(id) {
                var index = this._followerIds.indexOf(id);
                if (index > -1) {
                    this._followerIds.splice(index, 1);
                }
            }, this);

            follow.forEach(function(id) {
                var index = this._followerIds.indexOf(id);
                if (index < 0) {
                    this._followerIds.push(id);
                }
            }, this);

            /* merge the values from both arrays and toggle its state (follow/unfollow) using the API's endpoint */
            var toggleIds = unfollow.concat(follow);
            this._requestsPending = toggleIds.length;

            toggleIds.forEach(function(id) {
                this._sendRequestById(id);
            }, this);
        },

        _sendRequestById : function _sendRequestById(id) {
            API.followVoice({
                profileName : this.voice.owner.profileName,
                voiceSlug : this.voice.slug,
                data : {followerId : id}
            }, this._responseHandler.bind(this));
        },

        /* API response handler.
         * @method _responseHandler <private> [Function]
         * @return undefined
         */
        _responseHandler : function _responseHandler(err, res) {
            console.log(err);
            console.log(res);
            this._requestsPending--;

            if (!this._requestsPending) {
                this._updateButtonState();
                this.dropdown.enable();
            }
        },

        /* Updates the button's text based on if currentPerson is following the
         * current voice.
         * @method _updateButtonState <private> [Function]
         * @return VoiceFollowButton
         */
        _updateButtonState : function _updateButtonState() {
            if (this._followerIds.length) {
                this.dropdown.setLabel(this.constructor.FOLLOWING_AS_TEXT);
            } else {
                this.dropdown.setLabel(this.constructor.FOLLOW_AS_TEXT);
            }

            return this;
        }
    }
});
