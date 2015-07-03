/* jshint multistr: true */
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
        <button class="header-actions-button cv-button small rounded -p0">\
            <svg class="header-actions-svg -s19">\
                <use xlink:href="#svg-incognito"></use>\
            </svg>\
        </button>\
        <button class="header-notification-button header-actions-button cv-button small rounded -p0 -rel has-new-notifications">\
            <svg class="header-actions-svg -s17">\
                <use xlink:href="#svg-notifications"></use>\
            </svg>\
            <span class="ui-badge -abs">22</span>\
        </button>',

    SEARCH_BUTTON_HTML : '\
        <button class="header-actions-button cv-button small rounded -p0">\
          <svg class="header-actions-svg header-search-svg -s14">\
            <use xlink:href="#svg-search"></use>\
          </svg>\
        </button>',

    prototype : {
        /* options */
        currentPerson : null,

        /* private */
        el : null,
        loginActionsWrapper : null,
        buttonActionsWrapper : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.loginActionsWrapper = this.el.querySelector('.header-login-actions');
            this.buttonActionsWrapper = this.el.querySelector('.header-actions');

            if (this.currentPerson) this._setupForCurrentPerson();
            else this._setupVisitor();

            this.buttonActionsWrapper.insertAdjacentHTML('beforeend', this.constructor.SEARCH_BUTTON_HTML);
        },

        /* Append the ui for not logged in users
         * @method _setupVisitor <private> [Function]
         */
        _setupVisitor : function _setupVisitor() {
            this.loginActionsWrapper.insertAdjacentHTML('afterbegin', this.constructor.LOGIN_ACTIONS_HTML);

            return this;
        },

        /* Append the ui for logged in users.
         * @method _setupForCurrentPerson <private> [Function]
         */
        _setupForCurrentPerson : function _setupForCurrentPerson() {
            // account dropdown
            var allMulti = {
                "1": {name: 'Your Profile'},
                "2": {name: 'Manage Account'},
                "3": {
                    name: 'Organization 01',
                    sub: {
                        "0": {name: 'Profile'},
                        "1": {name: 'Manage'}
                    }
                },
                "4": {
                    name: 'Organization 02',
                    sub: {
                        "0": {name: 'Profile'},
                        "1": {name: 'Manage'}
                    }
                },
                "5": {
                    name: 'Organization 03',
                    sub: {
                        "0": {name: 'Profile'},
                        "1": {name: 'Manage'}
                    }
                },
                "6": {name: 'Logout', url: '/logout'}
            };

            this.appendChild(
                new CV.SelectAccount({
                    label         : 'Multiple',
                    name          : 'select',
                    accountImage  : "/img/sample/avatars/org-00.jpg",
                    accountName   : this.currentPerson.name + ' ' + this.currentPerson.lastname,
                    options       : allMulti
                })
            ).render(this.loginActionsWrapper);

            // create new voice / organization dropdown
            var createOptions = {
              "1": {label: 'Voice', name: 'voice'},
              "2": {label: 'Organization', name: 'organization'}
            };

            this.appendChild(
                new CV.Select({
                    className : 'header-create-dropdown -inline-block',
                    style: 'primary small',
                    label : 'Create New',
                    name  : 'createSelect',
                    options: createOptions
                })
            ).render(this.buttonActionsWrapper);

            // incognito + alerts buttons
            this.buttonActionsWrapper.insertAdjacentHTML('beforeend', this.constructor.BUTTON_ACTIONS_HTML);

            return this;
        }
    }
});
