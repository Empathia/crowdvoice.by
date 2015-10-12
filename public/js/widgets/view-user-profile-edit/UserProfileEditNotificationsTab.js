var Settings = require('./notifications/data-notification-settings');
var Labels = require('./notifications/data-notification-labels');

Class(CV, 'UserProfileEditNotificationsTab').inherits(Widget)({
    HTML : '\
        <div>\
            <div class="-mb5">\
                <div class="form-field -mb0">\
                    <label class="-p0">Notify Me</label>\
                </div>\
                <div data-notify-me-list></div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this._setup();
        },

        _setup : function _setup() {
            var notifyMeListElement = this.el.querySelector('[data-notify-me-list]');
            var formattedSettings = this._formatSettings(Settings);

            Object.keys(formattedSettings).forEach(function(setting, index) {
                this.appendChild(new CV.EditNotificationsNotifyMeItem({
                    name : 'notify-me-item_' + index,
                    className : 'cv-items-list',
                    data : {
                        label : Labels[setting] || 'missing description',
                        options : formattedSettings[setting]
                    }
                })).render(notifyMeListElement);
            }, this);

            this.appendChild(new CV.UI.Button({
                name : 'saveButton',
                className : 'positive small',
                data : {value : 'Save Changes'},
            })).render(this.el);

            return this;
        },

        /* Format notifications settings data to handle and display the interface.
         * The output will be something like this for each setting.
         *  {entityFollowsEntity :  [
         *      {label: 'webSettings',   checked: true},
         *      {label: 'emailSettings', checked: true }
         *  ]}, ...
         * @method _formatSettings <private>
         * @return formatedData
         */
        _formatSettings : function _formatSettings(settings) {
            var results = {};
            var settingHumanLabel;

            Object.keys(settings).forEach(function(settingsType) {
                settingHumanLabel = (settingsType === 'webSettings') ? 'Web' : 'Email';

                Object.keys(settings[settingsType]).forEach(function(settingType) {
                    if (typeof results[settingType] === 'undefined') {
                        results[settingType] = [];
                    }

                    results[settingType].push({
                        settingsType: settingsType,
                        label: settingHumanLabel,
                        checked: settings[settingsType][settingType]
                    });
                });
            });
            return results;
        }
    }
});
