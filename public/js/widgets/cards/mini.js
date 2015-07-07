/* jshint multistr: true */
/* Mini Card Widget.
 * @argument person <required> [Object]
 * @argument person.avatar <required> [String]
 * @argument person.fullname <required> [String]
 * @argument person.username <required> [String]
 */
Class(CV, 'CardMini').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'card-mini',

    HTML : '\
        <article role="article">\
            <img class="card-mini-avatar -rounded -float-left" alt="{{person.full_name}}’s avatar image" width="36" height="36"/>\
            <div class="card-mini-info">\
                <p class="card-mini-fullname -font-semi-bold"></p>\
                <p class="card-mini-username"></p>\
            </div>\
        </article>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.avatarElement = this.el.querySelector('.card-mini-avatar');
            this.fullNameElement = this.el.querySelector('.card-mini-fullname');
            this.usernameElement = this.el.querySelector('.card-mini-username');

            this._setup();
        },

        _setup : function _setup() {
            this.dom.updateAttr('src', this.avatarElement, this.person.avatar);
            this.dom.updateAttr('alt', this.avatarElement, this.person.fullname + "’s avatar image");

            this.dom.updateText(this.fullNameElement, this.person.fullname);

            this.dom.updateText(this.usernameElement, "@" + this.person.username);

            return this;
        }
    }
});

