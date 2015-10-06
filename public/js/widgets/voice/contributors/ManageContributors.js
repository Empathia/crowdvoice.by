/* Class ManageContributors
 * Handles the Voice Contributors (search-people/add/remove) for a voice.
 * It should receive a `contributors` Array via data to display the current
 * contributors lists. That array will be passed to the ManageContributorsList
 * widget to render them.
 * This Widget also acts as a Controller because it will listen for when a
 * contributor gets removed and it will also handle when a new contributor gets
 * added.
 */
var Events = require('./../../../lib/events');
var API = require('./../../../lib/api');
var GeminiScrollbar = require('gemini-scrollbar');

Class(CV, 'ManageContributors').inherits(Widget)({
    ELEMENT_CLASS : 'cv-manage-contributors',
    HTML : '\
        <div>\
            <div data-main></div>\
            <div data-list-wrapper>\
                <div class="form-field -mt2">\
                    <label><span data-contributors-count>0</span> contributors of the “<span data-voice-name>voice-name</span>”</label>\
                </div>\
                <div>\
                    <div class="cv-manage-contributors__list">\
                        <div class="gm-scrollbar -vertical"><span class="thumb"></span></div>\
                        <div class="gm-scrollbar -horizontal"><span class="thumb"></span></div>\
                        <div data-contributors-list class="gm-scroll-view"></div>\
                    </div>\
                </div>\
            </div>\
        </div>',

    REMOVE_CONTRIBUTOR_EVENT_NAME : 'card-remove-action-clicked',

    prototype : {
        data : {
            /* Current Voice Model.
             * @property voice <required> [Object]
             */
            voice : null,
            /* ContributorsEntities Models
             * @property contributors <required> [Array]
             */
            contributors : null
        },

        /* Holds the data of the selected user.
         */
        _selectedUser : null,

        /* Array of contributors ids (plus currentUser id).
         * Used to exclude this users from searchPeople results.
         * @property _contributorIds <private>
         */
        _contributorIds : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._setup()._bindEvents();
        },

        /* Initialilize the custom scrollbars.
         * @method setup <public>
         */
        setup : function setup() {
            this.scrollbar = new GeminiScrollbar({
                element : this.el.querySelector('.cv-manage-contributors__list'),
                createElements : false
            }).create();
        },

        /* Creates and appends its children.
         * @return ManageRelatedVoices
         */
        _setup : function _setup() {
            if (!this.data.contributors) {
                throw Error('ManageContributors require data.contributors Array.');
            }

            this._contributorIds = this.data.contributors.map(function(user) {
                return user.id;
            });
            this._contributorIds.push(this.data.voice.owner.id);

            this.appendChild(new CV.UI.InputButton({
                name : 'searchInput',
                data : {label : 'Invite Users to Contribute'},
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
                name : 'message',
                data : {
                    label : 'Write a message',
                    inputClassName : '-lg -block',
                    isTextArea : true,
                    attr : {
                        rows : 2
                    }
                }
            })).render(this.el.querySelector('[data-main]'));

            this.appendChild(new CV.ManageContributorsList({
                name : 'list',
                data : {
                    contributors : this.data.contributors
                }
            })).render(this.el.querySelector('[data-contributors-list]'));

            return this;
        },

        /* Subscribe its events.
         * @method _bindEvents <private>
         * @return ManageContributors
         */
        _bindEvents : function _bindEvents() {
            this._searchKeyUpHandlerRef = this._searchKeyUpHandler.bind(this);
            Events.on(this.searchInput.input.el, 'keyup', this._searchKeyUpHandlerRef);

            this._setSelectedUserRef = this._setSelectedUser.bind(this);
            this.searchInput.bind('results:item:clicked', this._setSelectedUserRef);

            this._inviteClickHandlerRef = this._inviteClickHandler.bind(this);
            Events.on(this.searchInput.button.el, 'click', this._inviteClickHandlerRef);

            this._removeContributorRef = this._removeContributor.bind(this);
            this.bind(this.constructor.REMOVE_CONTRIBUTOR_EVENT_NAME, this._removeContributorRef);

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

            API.searchPeople({
                query : searchString,
                exclude : this._contributorIds
            }, this._searchUsersResponseHandler.bind(this));
        },

        /* Handles the searchUsers API response.
         * @method _searchUsersResponseHandler <private> [Function]
         * @return undefined
         */
        _searchUsersResponseHandler : function _searchUsersResponseHandler(err, res) {
            this.searchInput.results.deactivate().clear();

            if (!res.people.length) {
                return;
            }

            res.people.forEach(function(user) {
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
            var userName = ev.data.name + ' ' + ev.data.lastname;

            this.searchInput.button.enable();
            this.searchInput.input.setValue(userName);
            this.searchInput.results.deactivate().clear();
        },

        /* Sends an invitation to _selectedUser to become a voice contributor.
         * @method _inviteClickHandler <private> [Function]
         * @return undefined
         */
        _inviteClickHandler : function _inviteClickHandler() {
            this.searchInput.button.disable();

            if (!this._selectedUser) {
                return;
            }

            API.voiceInviteToContribute({
                profileName : this.data.voice.owner.profileName,
                voiceSlug : this.data.voice.slug,
                data : {
                    personId : this._selectedUser.id,
                    message : this.message.getValue()
                }
            }, this._inviteToContributeResponseHandler.bind(this));
        },

        /* Handles the inviteToContibute API response.
         * @method _inviteToContributeResponseHandler <private> [Function]
         * @return undefined
         */
        _inviteToContributeResponseHandler : function _inviteToContributeResponseHandler(err, res) {
            console.log(res);

            if (err) {
                this.searchInput.button.enable();
                return;
            }

            this._contributorIds.push(this._selectedUser.id);
            this.searchInput.input.setValue('');
            this._selectedUser = null;

            if (this._flashMessage) {
                this._flashMessage = this._flashMessage.destroy();
            }

            this.appendChild(new CV.Alert({
                name : '_flashMessage',
                type : 'positive',
                text : "Invitation was sent, the user will see it on the message box.",
                className : '-mb1'
            })).render(this.el, this.el.firstElementChild);
        },

        _removeContributor : function _removeContributor(ev) {
            ev.stopPropagation();

            var widget = ev.data;
            widget.removeButton.disable();

            API.voiceRemoveContributor({
                profileName : this.data.voice.owner.profileName,
                voiceSlug : this.data.voice.slug,
                data : {personId : widget.data.id}
            }, this._removeContributorResponseHandler.bind(this, widget));
        },

        _removeContributorResponseHandler : function _removeContributorResponseHandler(widget, err, res) {
            console.log(res);

            if (err) {
                widget.removeButton.enable();
                return;
            }

            var index = this._contributorIds.indexOf(widget.data.id);
            if (index > -1) {
                this._contributorIds.splice(index, 1);
            }
            this.list.removeUser(widget);
            this.scrollbar.update();

            this.dispatch('collaborator-removed');
        },

        destroy : function destroy() {
            if (this.scrollbar) {
                this.scrollbar = this.scrollbar.destroy();
            }

            if (this.searchInput) {
                Events.off(this.searchInput.input.el, 'keyup', this._searchKeyUpHandlerRef);
                this._searchKeyUpHandlerRef = null;

                Events.off(this.searchInput.button.el, 'click', this._inviteClickHandlerRef);
                this._inviteClickHandlerRef = null;
            }

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
