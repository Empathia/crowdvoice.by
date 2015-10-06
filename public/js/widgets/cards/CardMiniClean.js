/* Mini Card Clean Widget.
 * @argument person <required> [Object]
 * @argument person.avatar <required> [String]
 * @argument person.fullname <required> [String]
 * @argument person.username <required> [String]
 */

var moment = require('moment');

Class(CV, 'CardMiniClean').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'card-mini',

    HTML : '\
        <article role="article">\
            <img class="card-mini-avatar -rounded -float-left" alt="{{person.full_name}}’s avatar image" width="36" height="36"/>\
            <div class="card-mini-info">\
                <div>\
                    <p class="card-mini-fullname -font-semi-bold -tdn"></p>\
                    <p class="card-mini-username"></p>\
                </div>\
            </div>\
        </article>\
    ',

    META_HTML : '\
        <div class="card-info-meta">\
            <span data="location"></span>\
            <span data="joined-at"></span>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.avatarElement = this.el.querySelector('.card-mini-avatar');
            this.fullNameElement = this.el.querySelector('.card-mini-fullname');
            this.usernameElement = this.el.querySelector('.card-mini-username');

            this._setup();
        },

        /* Replace the widget contents with the config received on config.
         * @method _setup <private> [Function]
         */
        _setup : function _setup() {
            this.dom.updateAttr('src', this.avatarElement, this.data.images && this.data.images.small && this.data.images.small.url);

            var fullname = this.data.name + (this.data.lastname ? (' ' + this.data.lastname) : '');
            this.dom.updateAttr('alt', this.avatarElement, this.data.profileName + "’s avatar image");
            this.dom.updateText(this.fullNameElement, fullname);

            this.dom.updateText(this.usernameElement, "@" + this.data.profileName);

            return this;
        },

        /* Show the location, joined at and inline name, username
         * @method showMeta <public> [Function]
         */
        showMeta : function showMeta() {
            this.el.classList.add('has-meta');
            this.usernameElement.insertAdjacentHTML('afterbegin', ' · ');

            this.el.querySelector('.card-mini-info').insertAdjacentHTML('beforeend', this.constructor.META_HTML);

            if (this.data.location) {
                this.dom.updateText(this.el.querySelector('[data="location"]'), this.data.location + ' · ');
            }

            this.dom.updateText(
                this.el.querySelector('[data="joined-at"]'),
                'Joined on ' + moment(this.data.createdAt).format('MMM, YYYY')
            );
        }
    }
});
