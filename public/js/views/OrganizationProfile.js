Class(CV.Views, 'OrganizationProfile').includes(NodeSupport, CV.WidgetUtils)({
    ANONYMOUS_TEMPLATE : '\
        <div class="ui-has-tooltip">\
            <div class="cv-button-group multiple">\
                <button class="cv-button small disable" disabled>Message</button>\
                <button class="cv-button small disable" disabled>Follow</button>\
            </div>\
            <div class="-inline-block -ml1">\
                <div class="profile-actions-settings-dropdown ui-dropdown ui-dropdown-styled disable -md has-arrow">\
                    <div class="ui-dropdown__head -full-height -clickable">\
                        <span class="ui-dropdown-label">\
                            <svg class="-s16 -color-grey-light">\
                                <use xlink:href="#svg-settings"></use>\
                            </svg>\
                        </span>\
                        <svg class="ui-dropdown-arrow -s8 -color-grey">\
                            <use xlink:href="#svg-arrow-down"></use>\
                        </svg>\
                    </div>\
                </div>\
            </div>\
            <span class="ui-tooltip -top" style="width: 210px;">To message or follow others and to see your messages please turn Anonymous mode off.</span>\
        </div>',

    prototype : {
        /* UserEntityModel.
         * @property entity <required> [Object]
         */
        entity : null,

        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this._setup();

            // if (Person.get()) {
            //     this._actionsElementWrapper = this.el.querySelector('.profile__actions');
            //     this._addActions();
            // }
        },

        _setup : function _setup() {
            console.log(this.entity);

            this.appendChild(new CV.TabsManager({
                name : 'tabs',
                useHash : true,
                nav : document.querySelector('.profile-menu'),
                content : document.querySelector('.profile-menu-content')
            }));

            this.tabs.addTab({
                name : 'voices',
                nav : CV.UserProfileTabNav,
                navData : {label: 'Voices'},
                content : CV.UserProfileVoicesTab,
                contentData : {entity: this.entity}
            });

            this.tabs.addTab({
                name : 'followers',
                nav : CV.UserProfileTabNav,
                navData : {label: 'Followers'},
                content : CV.UserProfileFollowersTab,
                contentData : {entity: this.entity}
            });

            this.tabs.addTab({
                name : 'following',
                nav : CV.UserProfileTabNav,
                navData : {label: 'Following'},
                content : CV.UserProfileFollowingTab,
                contentData : {entity: this.entity}
            });

            this.tabs.addTab({
                name : 'members',
                nav : CV.UserProfileTabNav,
                navData : {label: 'Members'},
                content : CV.OrganizationProfileMembersTab,
                contentData : {entity: this.entity}
            });

            this.tabs.start();

            var t = 1000;
            setTimeout(function() {
                this.tabs.voices.getContent().fetch();
            }.bind(this), t);

            setTimeout(function() {
                this.tabs.followers.getContent().fetch();
            }.bind(this), t);

            setTimeout(function() {
                this.tabs.following.getContent().fetch();
            }.bind(this), t);

            setTimeout(function() {
                this.tabs.members.getContent().fetch();
            }.bind(this), t);

            return this;
        }
    }
});
