var API = require('../../lib/api');

Class(CV, 'CardActionFollowMultiple').inherits(Widget)({
    ELEMENT_CLASS : 'card-actions-item card-actions-follow-button',

    FOLLOW_AS_TEXT : '\
        <svg class="card-activity-svg -s16">\
            <use xlink:href="#svg-user-follow"></use>\
        </svg>\
        <p class="card-actions-label">Follow As...</p>',

    FOLLOWING_AS_TEXT : '\
        <div class="following-button-single-state">\
            <svg class="card-activity-svg -s16">\
                <use xlink:href="#svg-user-following"></use>\
            </svg>\
            <p class="card-actions-label">Following As...</p>\
        </div>',

    prototype : {
        /* Entity Model
         * @property entity <required> [EntityModel]
         */
        entity : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._setup()._bindEvents()._updateButtonState();
        },

        _setup : function _setup() {
            this.appendChild(new CV.UI.CurrentPersonEntitiesCheckboxes({
                name : 'dropdown',
                data : {
                    className : 'dropdown-entities-checkboxes',
                    showArrow : false,
                    alignment : 'top',
                    bodyClassName : 'ui-vertical-list hoverable -block -text-left'
                }
            })).render(this.el);

            this.dropdown.selectValues(this.entity.followersOwnedByCurrentPerson);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._doneButtonClickHandlerRef = this._doneButtonClickHandler.bind(this);
            this.dropdown.bind('doneButtonClicked', this._doneButtonClickHandlerRef);

            this._changeHandlerRef = this._changeHandler.bind(this);
            this.dropdown.bind('changed', this._changeHandlerRef);
            return this;
        },

        _changeHandler : function _changeHandler(ev) {
            API.followEntity({
                profileName : this.entity.profileName,
                data : {followerId : ev.checkbox.id}
            }, this._responseHandler.bind(this, ev.checkbox));
        },

        _responseHandler : function _responseHandler(checkboxWidget, err, res) {
            if (err) {
                /* revert silently without forcing it to dispatch the change event,
                 * since we are listening the change event to tell the server to
                 * update the follow state it may cause an infinite loop if the
                 * errors still firing without end
                 */
                if (checkboxWidget.isChecked()) {
                    checkboxWidget.checkbox.checked = false;
                } else {
                    checkboxWidget.checkbox.checked = true;
                }
            }

            this._updateButtonState();
        },

        /* Just close the dropdown.
         * @method _doneButtonClickHandler <private> [Function]
         * @return undefined
         */
        _doneButtonClickHandler : function _doneButtonClickHandler() {
            this.dropdown.deactivate();
        },

        /* Updates the button's text based on if currentPerson is following the
         * current voice.
         * @method _updateButtonState <private> [Function]
         * @return VoiceFollowButton
         */
        _updateButtonState : function _updateButtonState() {
            if (this.dropdown.getSelection().length) {
                this.dropdown.setLabel(this.constructor.FOLLOWING_AS_TEXT);
            } else {
                this.dropdown.setLabel(this.constructor.FOLLOW_AS_TEXT);
            }
            return this;
        }
    }
});
