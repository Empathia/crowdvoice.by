var NotifyMeData = require('./notifications/notify-me-data');
var EmailDigestsData = require('./notifications/email-digests-data');

Class(CV, 'UserProfileEditNotificationsTab').inherits(Widget)({
    HTML : '\
        <div>\
            <div class="-mb3">\
                <div class="form-field -mb0">\
                    <label class="-p0">Notify Me</label>\
                </div>\
                <div data-notify-me-list></div>\
            </div>\
            <div class="-mb5">\
                <div class="form-field -mb0">\
                    <label class="-p0">Email Digests</label>\
                </div>\
                <div data-email-digests-list></div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.notifyMeList = this.el.querySelector('[data-notify-me-list]');
            this.emailDigestsList = this.el.querySelector('[data-email-digests-list]');

            this._setup();
        },

        _setup : function _setup() {
            this.appendChild(new CV.UI.Button({
                name : 'saveButton',
                className : 'positive small',
                data : {value : 'Save Changes'},
            })).render(this.el);

            NotifyMeData.forEach(function(item, index) {
                this.appendChild(new CV.EditNotificationsNotifyMeItem({
                    name : 'notify-me-item_' + index,
                    className : 'cv-items-list',
                    data : item
                })).render(this.notifyMeList);
            }, this);

            EmailDigestsData.forEach(function(item, index) {
                this.appendChild(new CV.EditNotificationsEmailDigestsItem({
                    name : 'email-digests-item_' + index,
                    className : 'cv-items-list',
                    data : item
                })).render(this.emailDigestsList);
            }, this);

            return this;
        }
    }
});
