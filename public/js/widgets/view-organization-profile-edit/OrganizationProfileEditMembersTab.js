var API = require('./../../lib/api');
var Person = require('./../../lib/currentPerson');
var Events = require('./../../lib/events');

Class(CV, 'OrganizationProfileEditMembersTab').inherits(Widget)({
    ELEMENT_CLASS : 'organization-profile-members-tab',
    HTML : '\
        <div>\
            <div data-main></div>\
            <div data-list-wrapper>\
                <div class="form-field -mt2">\
                    <label>members of this organization</label>\
                </div>\
                <div>\
                    <div data-members-list></div>\
                </div>\
            </div>\
        </div>',

    REMOVE_MEMBER_EVENT_NAME : 'card-remove-action-clicked',

    prototype : {
        data: {entity : null},

        /* Holds the data of the selected user.
         */
        _selectedUser : null,

        _flashMessage : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._setup()._bindEvents();
        },

        /* Creates and appends its children.
         * @return OrganizationProfileEditMembersTab
         */
        _setup : function _setup() {
            API.getOrganizationMembers({
                profileName : this.data.entity.profileName
            }, function(err,res) {
                this.appendChild(new CV.OrganizationProfileEditMembersList({
                    name : 'list',
                    data : {
                        members : res
                    }
                })).render(this.el.querySelector('[data-members-list]'));
            }.bind(this));

            this.appendChild(new CV.UI.InputButton({
                name : 'searchInput',
                data : {label : 'Invite Users to Join this Organization'},
                inputData : {
                    inputClassName : '-lg -block -btrr0 -bbrr0',
                    attr : {
                        placeholder : 'Search users...',
                        autofocus : true
                    }
                },
                buttonData : {
                    value : 'Invite',
                    className : 'primary'
                }
            })).render(this.el.querySelector('[data-main]')).button.disable();

            this.appendChild(new CV.UI.Input({
                name : 'messageInput',
                data : {
                    label : 'Write a message',
                    inputClassName : '-lg -block',
                    isTextArea : true,
                    attr : {
                        rows : 2
                    }
                }
            })).render(this.el.querySelector('[data-main]'));

            return this;
        },

        /* Subscribe its events.
         * @method _bindEvents <private>
         * @return OrganizationProfileEditMembersTab
         */
        _bindEvents : function _bindEvents() {
            this._searchKeyUpHandlerRef = this._searchKeyUpHandler.bind(this);
            Events.on(this.searchInput.input.el, 'keyup', this._searchKeyUpHandlerRef);

            this._setSelectedUserRef = this._setSelectedUser.bind(this);
            this.searchInput.bind('results:item:clicked', this._setSelectedUserRef);

            this._inviteClickHandlerRef = this._inviteClickHandler.bind(this);
            Events.on(this.searchInput.button.el, 'click', this._inviteClickHandlerRef);

            this._removeMemberRef = this._removeMember.bind(this);
            this.bind(this.constructor.REMOVE_MEMBER_EVENT_NAME, this._removeMemberRef);

            return this;
        },

        /* Search Input Key Up Handler. Checks if we should call the
         * searchPeople API endpoint.
         * @method _searchKeyUpHandler <private> [Function]
         */
        _searchKeyUpHandler : function  _searchKeyUpHandler(ev) {
            if (ev.which === 40 || ev.which === 38 || ev.which === 13) {
                return;
            }

            var searchString = ev.target.value.trim().toLocaleLowerCase();
            if (!searchString || (searchString.length < 2)) {
                return;
            }

            this.searchInput.button.disable();
            this._selectedUser = null;

            API.searchPeopleToInvite({
                profileName : Person.get().profileName,
                data: {query: searchString}
            }, this._searchUsersResponseHandler.bind(this));
        },

        /* Handles the searchUsers API response.
         * @method _searchUsersResponseHandler <private> [Function]
         * @return undefined
         */
        _searchUsersResponseHandler : function _searchUsersResponseHandler(err, res) {
            this.searchInput.results.deactivate().clear();

            if (!res.length) {
                return;
            }

            res.forEach(function(user) {
                this.searchInput.results.add({
                    element : new CV.CardMiniClean({data: user}).el,
                    data : user
                });
            }, this);

            this.searchInput.results.activate();
        },

        /* Sets the this._selectedUser data.
         * @method _setSelectedUser <private> [Function]
         * @return undefined
         */
        _setSelectedUser : function _setSelectedUser(ev) {
            this._selectedUser = ev.data;
            var userName = ev.data.name;

            this.searchInput.button.enable();
            this.searchInput.input.setValue(userName);
            this.searchInput.results.deactivate().clear();
        },

        /* Sends an invitation to _selectedUser to become a voice contributor.
         * @method _inviteClickHandler <private> [Function]
         * @return undefined
         */
        _inviteClickHandler : function _inviteClickHandler() {
            if (this.messageInput.getValue().trim().length === 0) {
                this.messageInput.error().getInput().focus();
                return;
            }

            this.searchInput.button.disable();

            if (!this._selectedUser) {
                return;
            }

            API.sendMessage({
                profileName : Person.get().profileName,
                data : {
                    type : 'invitation_organization',
                    senderEntityId : Person.get().id,
                    receiverEntityId : this._selectedUser.id,
                    organizationId : this.data.entity.id,
                    message : this.messageInput.getValue()
                }
            }, this._inviteToContributeResponseHandler.bind(this));
        },

        /* Handles the inviteToContibute API response.
         * @method _inviteToContributeResponseHandler <private> [Function]
         * @return undefined
         */
        _inviteToContributeResponseHandler : function _inviteToContributeResponseHandler(err) {
            if (err) {
                this.searchInput.button.enable();
                return;
            }

            this.searchInput.input.setValue('');
            this.messageInput.setValue('');
            this._selectedUser = null;

            if (this._flashMessage) {
                return this._flashMessage.update({
                    type : 'positive',
                    text : "Invitation was sent, the user will see it on the message box."
                }).shake();
            }

            this.appendChild(new CV.Alert({
                name : '_flashMessage',
                type : 'positive',
                text : "Invitation was sent, the user will see it on the message box.",
                className : '-mb1'
            })).render(this.el, this.el.firstElementChild);
        },

        _removeMember : function _removeMember(ev) {
            ev.stopPropagation();

            var widget = ev.data;
            widget.removeButton.disable();

            API.removeEntityFromOrganization({
                profileName : this.data.entity.profileName,
                data : {
                    entityId : widget.data.id,
                    orgId : this.data.entity.id
                }
            }, this._removeContributorResponseHandler.bind(this, widget));
        },

        _removeContributorResponseHandler : function _removeContributorResponseHandler(widget, err) {
            if (err) {
                widget.removeButton.enable();
                return;
            }

            this.list.removeUser(widget);
        }
    }
});
