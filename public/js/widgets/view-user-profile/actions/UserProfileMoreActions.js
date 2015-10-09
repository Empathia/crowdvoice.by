var Events = require('./../../../lib/events');

Class(CV, 'UserProfileMoreActions').inherits(Widget)({
    prototype : {
        /* Entity Model
         * @property entity <required> [EntityModel]
         */
        entity : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new CV.Dropdown({
                name : 'settingsDropdown',
                showArrow : true,
                className : 'profile-actions-settings-dropdown ui-dropdown-styled -md',
                arrowClassName : '-s8 -color-grey',
                alignment : 'bottom-right',
                bodyClassName : 'ui-vertical-list hoverable -block'
            })).render(this.el);

            this.settingsDropdown.setLabel('\
                <svg class="-s16">\
                    <use xlink:href="#svg-settings"></use>\
                </svg>');

            this.appendChild(new Widget({
                name : 'dropdownInviteToOrganization',
                className : 'ui-vertical-list-item -block'
            })).element.text('Invite to Organization');

            this.appendChild(new Widget({
                name : 'dropdownInviteToContribute',
                className : 'ui-vertical-list-item -block'
            })).element.text('Invite to Contribute');

            this.settingsDropdown.addContent(this.dropdownInviteToOrganization.element[0]);
            this.settingsDropdown.addContent(this.dropdownInviteToContribute.element[0]);

            return this;
        },

        _bindEvents : function _bindEvents() {
            Events.on(this.dropdownInviteToOrganization.element[0], 'click', this._showInviteToOrganization.bind(this));
            Events.on(this.dropdownInviteToContribute.element[0], 'click', this._showInviteToContribute.bind(this));
        },

        _showInviteToOrganization : function _showInviteToOrganization() {
            var inviteToOrganizationModal = new CV.UI.Modal({
                title : 'Invite to Organization',
                name : 'inviteToOrganizationModal',
                action : CV.InviteToOrganization,
                width : 650,
                data : this.entity
            }).render(document.body);

            requestAnimationFrame(function() {
                inviteToOrganizationModal.activate();
            });
        },

        _showInviteToContribute : function _showInviteToContribute() {
            var inviteToContributeModal = new CV.UI.Modal({
                title : 'Invite to Contribute',
                name : 'inviteToContributeModal',
                action : CV.InviteToContribute,
                width : 650,
                data : this.entity
            }).render(document.body);

            requestAnimationFrame(function() {
                inviteToContributeModal.activate();
            });
        }
    }
});

