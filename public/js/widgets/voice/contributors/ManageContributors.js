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

    prototype : {
        data : {
            /* UserEntities Models
             * @property users <required> [Array]
             */
            users : null
        },

        /* Holds the data of the selected user.
         */
        _selectedUser : null,

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
            if (!this.data.users) {
                throw Error('ManageContributors require data.users Array.');
            }

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
                    users : this.data.users
                }
            })).render(this.el.querySelector('[data-contributors-list]'));

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._searchKeyUpHandlerRef = this._searchKeyUpHandler.bind(this);
            Events.on(this.searchInput.input.el, 'keyup', this._searchKeyUpHandlerRef);

            this._setSelectedUserRef = this._setSelectedUser.bind(this);
            this.searchInput.bind('results:item:clicked', this._setSelectedUserRef);
        },

        /* Search Input Key Up Handler. Checks if we should call the searchVoices API endpoint.
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

            API.searchVoices({
                query : searchString,
                exclude : []
            }, this._searchUsersResponseHandler.bind(this));
        },

        /* Handles the searchUsers API response.
         */
        _searchUsersResponseHandler : function _searchUsersResponseHandler(err, res) {
            console.log(err);
            console.log(res);

            this.searchInput.results.deactivate().clear();

            if (!res.voices.length) {
                return;
            }

            res.voices.forEach(function(voice) {
                this.searchInput.results.add({
                    element : new CV.VoiceCoverMiniClean({data: voice}).el,
                    data : voice
                });
            }, this);

            this.searchInput.results.activate();
        },

        /* Sets the this._selectedUser data.
         */
        _setSelectedUser : function _setSelectedUser(ev) {
            this._selectedUser = ev.data;

            this.searchInput.button.enable();
            this.searchInput.input.setValue(ev.data.title);
            this.searchInput.results.deactivate().clear();
        },

        destroy : function destroy() {
            if (this.scrollbar) {
                this.scrollbar = this.scrollbar.destroy();
            }

            if (this.searchInput) {
                Events.off(this.searchInput.input.el, 'keyup', this._searchKeyUpHandlerRef);
                this._searchKeyUpHandlerRef = null;
            }

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
