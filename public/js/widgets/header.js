var Person = require('./../lib/currentPerson');

Class(CV, 'Header').inherits(Widget).includes(CV.WidgetUtils)({
    // template replication of the original header element for quick visual reference of its main elements,
    // we do not use this, instead we use an already rendered version of it.
    HTML : '\
        <header class="cv-main-header">\
            <div class="-float-left">\
                <a class="cv-main-logo -inline-block"></a>\
                <div class="header-login-actions"></div>\
            </div>\
            <div class="-float-right -text-right">\
                <div class="header-actions"></div>\
            </div>\
        </header>',

    LOGIN_ACTIONS_HTML : '\
        <div class="login-action">\
            <div class="login-actions__list">\
                <a href="/signup" class="action-signup -ctu -ctu-primary">Signup</a> or <a href="/login" class="-ctu -ctu-primary">Login</a>\
            </div>\
        </div>',

    BUTTON_ACTIONS_HTML : '\
        <button class="header-notification-button header-actions-button cv-button small rounded -p0 -rel has-new-notifications">\
            <svg class="header-actions-svg -s17">\
                <use xlink:href="#svg-notifications"></use>\
            </svg>\
            <span class="ui-badge -abs">22</span>\
        </button>',

    prototype : {
        /* private */
        el : null,
        loginActionsWrapper : null,
        buttonActionsWrapper : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.loginActionsWrapper = this.el.querySelector('.header-login-actions');
            this.buttonActionsWrapper = this.el.querySelector('.header-actions');

            if (!Person.get()) {
                this._setupVisitor();
            } else {
                if (Person.anon()) {
                    this._setupAnonymous();
                } else {
                    this._setupForCurrentPerson();
                }
            }

            this.appendChild(new CV.SearchButton({
                name : 'searchButton',
                className : 'header-actions-button'
            })).render(this.buttonActionsWrapper);
        },

        /* Append the ui for not logged in users
         * @method _setupVisitor <private> [Function]
         */
        _setupVisitor : function _setupVisitor() {
            this.loginActionsWrapper.insertAdjacentHTML('afterbegin', this.constructor.LOGIN_ACTIONS_HTML);

            return this;
        },

        _setupAnonymous : function _setupAnonymous() {
            var allMulti = {
                '1' : {name: 'Logout', url: '/logout'}
            };

            this.appendChild(new CV.SelectAccount({
                label         : 'Multiple',
                name          : 'select',
                accountImage  : "/img/sample/avatars/org-00.jpg",
                accountName   : 'Anonymous',
                options       : allMulti
            })).render(this.loginActionsWrapper);

            this.appendChild(new CV.IncognitoButton({
                name : 'incognitoButton'
            })).render(this.buttonActionsWrapper);

            return this;
        },

        /* Append the ui for logged in users.
         * @method _setupForCurrentPerson <private> [Function]
         */
        _setupForCurrentPerson : function _setupForCurrentPerson() {
            // account dropdown
            var itemCounter = 0;
            var allMulti = {
                "1": {name: 'Your Profile', url: '/' + Person.get().profileName},
                "2": {name: 'Manage Account', url: '/' + Person.get().profileName + '/edit'}
            };
            itemCounter = 2;

            Person.get().ownedOrganizations.forEach(function(organization) {
                itemCounter++;
                allMulti[itemCounter] = {
                    name : organization.name,
                    sub : {
                        '0' : {
                            name : 'Profile',
                            url : '/' + organization.profileName
                        },
                        '1' : {
                            name : 'Manage',
                            url : '/' + organization.profileName + '/edit'
                        }
                    }
                };
            }, this);

            itemCounter++;
            allMulti[itemCounter] = {name: 'Logout', url: '/logout'};

            this.appendChild(new CV.SelectAccount({
                label         : 'Multiple',
                name          : 'select',
                accountImage  : Person.getImage('small'),
                accountName   : Person.get().name + ' ' + Person.get().lastname,
                options       : allMulti
            })).render(this.loginActionsWrapper);

            // create new voice / organization dropdown
            var createOptions = {
                "1": {label: 'Voice', name: 'voice'},
                "2": {label: 'Organization', name: 'organization'}
            };

            this.appendChild(new CV.Select({
                className : 'header-create-dropdown -inline-block',
                style: 'primary small',
                label : 'Create New',
                name  : 'createSelect',
                options: createOptions
            })).render(this.buttonActionsWrapper);
            this.createSelect.voice[0].addEventListener('click', this._showCreateVoiceModal.bind(this));
            this.createSelect.organization[0].addEventListener('click', this._showCreateOrganizationModal.bind(this));

            this.appendChild(new CV.IncognitoButton({
                name : 'incognitoButton',
            })).render(this.buttonActionsWrapper);

            // alerts buttons
            this.buttonActionsWrapper.insertAdjacentHTML('beforeend', this.constructor.BUTTON_ACTIONS_HTML);

            return this;
        },

        /* (for logged in users) Display the CreateVoiceModal.
         * @method _showCreateVoiceModal <private> [Function]
         */
        _showCreateVoiceModal : function _showCreateVoiceModal() {
            this.appendChild(new CV.Modal2({
                title       : 'Create a Voice',
                name        : 'createAVoiceModal',
                action      : CV.CreateVoice,
                width       : 960,
            })).render(document.body);
        },

        /* (for logged in users) Display the CreateOrganizationModal.
         * @method _showCreateOrganizationModal <private> [Function]
         */
        _showCreateOrganizationModal : function _showCreateOrganizationModal() {
            this.appendChild(new CV.Modal2({
                title       : 'Create an Organization',
                name        : 'createAnOrganizationModal',
                action      : CV.CreateOrganization,
                width       : 540,
            })).render(document.body);
        }
    }
});
