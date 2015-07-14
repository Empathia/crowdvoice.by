/* Class CV.CardInviteToPopover
 * Displays the 'Cotribute in voice...' bubble-item is currentPerson has any voices to invite to.
 * Displays the 'Become a member...' bubble-item if currentPerson has any organization to invite to.
 * In any case it will also instantiate the appropiate form Modal to render when clicked.
 * Each Modal handles its own logic.
 */
Class(CV, 'CardInviteToPopover').inherits(Widget)({
    ELEMENT_CLASS : 'ui-vertical-list hoverable -list-clean',
    HTML : '<ul></ul>',
    HTML_VOICE_ITEM : '<li class="ui-vertical-list-item -nw" data-action="contribute">Contribute in voice&hellip;</li>',
    HTML_ORGANIZATION_ITEM : '<li class="ui-vertical-list-item -nw" data-action="member">Become a member of&hellip;</li>',

    prototype : {
        el : null,

        /* indicates if currentPerson has voices [Boolean] */
        _hasVoices : false,
        contributeItem : null,
        _toVoiceClickHandlerRef : null,

        /* indicates if currentPerson own at least one organization */
        _ownOrganizations : false,
        memberButton : null,
        _toOrgClickHandlerRef : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            // has voices to invite to?
            this._hasVoices = window.currentPerson.voicesCount;
            if (this._hasVoices) {
                this._setInviteToVoice();
            }

            // own any organization to invite to?
            this._ownOrganizations = window.currentPerson.ownedOrganizations.length;
            if (this._ownOrganizations) {
                this._setInviteToOrganization();
            }
        },

        /* Sets the 'Contribute in voice' item to be displayed on the ui,
         * instantiate its modal and register its events.
         * @method _setInviteToVoice <private> [Function]
         */
        _setInviteToVoice : function _setInviteToVoice() {
            this.el.insertAdjacentHTML('beforeend', this.constructor.HTML_VOICE_ITEM);
            this.contributeItem = this.el.querySelector('[data-action="contribute"]');

            this.appendChild(new CV.Modal({
                title       : 'Invite to Contribute',
                name        : 'inviteToContributeModal',
                action      : CV.InviteToContribute,
                width       : 650,
                anchorEl    : $(this.contributeItem)
            }));

            this._toVoiceClickHandlerRef = this._toVoiceClickHandler.bind(this);
            this.contributeItem.addEventListener('click', this._toVoiceClickHandlerRef);
        },

        /* Sets the 'Become a member of' item on the ui, instantiate its modal
         * and register its events.
         * @method _setInviteToOrganization <private> [Function]
         */
        _setInviteToOrganization : function _setInviteToOrganization() {
            this.el.insertAdjacentHTML('beforeend', this.constructor.HTML_ORGANIZATION_ITEM);
            this.memberButton = this.el.querySelector('[data-action="member"]');

            this.appendChild(new CV.Modal({
                title       : 'Invite to Organization',
                name        : 'inviteToOrganizationModal',
                action      : CV.InviteToOrganization,
                width       : 650,
                anchorEl    : $(this.memberButton)
            }));

            this._toOrgClickHandlerRef = this._toOrgClickHandler.bind(this);
            this.memberButton.addEventListener('click', this._toOrgClickHandlerRef);
        },

        /* Render the inviteToContributeModal
         * @method _toVoiceClickHandler <private> [Function]
         */
        _toVoiceClickHandler : function _contributecioVoteer() {
            this.inviteToContributeModal.show();
        },

        /* Render the inviteToOrganizationModal
         * @method _toOrgClickHandler <private> [Function]
         */
        _toOrgClickHandler : function _toOrgClickHandler() {
            this.inviteToOrganizationModal.show();
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el = null;

            if (this._hasVoices) {
                this._hasVoices = null;
                this.contributeItem = null;
                this.contributeItem.removeEventListener('click', this._toVoiceClickHandlerRef);
                this._toVoiceClickHandlerRef = null;
            }

            if (this._ownOrganizations) {
                this._ownOrganizations = null;
                this.memberButton = null;
                this.memberButton.removeEventListener('click', this._toOrgClickHandlerRef);
                this._toOrgClickHandlerRef = null;
            }

            return null;
        }
    }
});
