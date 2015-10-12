var Labels = require('./notifications/data-notification-labels');
var API = require('./../../lib/api');
var Events = require('./../../lib/events');
var Person = require('./../../lib/currentPerson');

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
        data : {
            notificationSettings : null
        },

        /* Holds the EditNotificationsNotifyMeItem widget references.
         * @property _notifyMeItems <private> [Object]
         */
        _notifyMeItems : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._notifyMeItems = [];

            this._setup()._bindEvents();
        },


        _setup : function _setup() {
            var notifyMeListElement = this.el.querySelector('[data-notify-me-list]');
            var formattedSettings = this._formatSettings(this.data.notificationSettings);

            Object.keys(formattedSettings).forEach(function(setting) {
                this._notifyMeItems.push(this.appendChild(new CV.EditNotificationsNotifyMeItem({
                    name : setting,
                    className : 'cv-items-list',
                    data : {
                        label : Labels[setting] || 'missing description',
                        options : formattedSettings[setting]
                    }
                })).render(notifyMeListElement));
            }, this);

            this.appendChild(new CV.UI.Button({
                name : 'saveButton',
                className : 'positive small',
                data : {value : 'Save Changes'},
            })).render(this.el);

            notifyMeListElement = formattedSettings = null;

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._saveButtonClickHandlerRef = this._saveButtonClickHandler.bind(this);
            Events.on(this.saveButton.el, 'click', this._saveButtonClickHandlerRef);
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

            settingHumanLabel = null;

            return results;
        },

        _saveButtonClickHandler : function _saveButtonClickHandler() {
            API.updateNotificationSettings({
                profileName : Person.get().profileName,
                data : this._dataPresenter()
            }, function(err, res) {
                console.log(err);
                console.log(res);
            });
        },

        /* Formats the data to be sent to the server to update the notification
         * settings based on the interface checkboxes.
         * @method _dataPresenter <private> [Function]
         * @return {webSettings: {...}, emailSettings: {...}}
         */
        _dataPresenter : function _dataPresenter() {
            var data = {};

            this._notifyMeItems.forEach(function(item) {
                item.getSettingsState().forEach(function(option) {
                    if (typeof data[option.type] === 'undefined') {
                        data[option.type] = {};
                    }
                    data[option.type][item.name] = option.checked;
                });
            });

            return data;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            Events.off(this.saveButton.el, 'click', this._saveButtonClickHandlerRef);
            this._saveButtonClickHandlerRef = null;

            return null;
        }
    }
});
