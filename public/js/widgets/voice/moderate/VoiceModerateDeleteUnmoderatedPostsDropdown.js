/* globals App */
var API = require('./../../../lib/api');
var moment = require('moment');

Class(CV, 'VoiceModerateDeleteUnmoderatedPostsDropdown').inherits(Widget)({
    prototype : {
        scrollableArea : null,

        olderThanDates : [
            {label: '+3 years', name: '3y', subtract: [3, 'years']},
            {label: '2 years',  name: '2y', subtract: [2, 'years']},
            {label: '1 year',   name: '1y', subtract: [1, 'years']},
            {label: '6 months', name: '6m', subtract: [6, 'months']},
            {label: '3 months', name: '3m', subtract: [3, 'months']},
            {label: '1 month',  name: '1m', subtract: [1, 'months']},
            {label: '1 week',   name: '1w', subtract: [1, 'weeks']}
        ],

        _options : null,
        _errorAlert : null,
        _successAlert : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._options = [];

            this._setup()._bindEvents();
        },

        /* Creates the dropdown and its options.
         * @return VoiceModerateDeleteUnmoderatedPostsDropdown
         */
        _setup : function _setup() {
            this.appendChild(new CV.Dropdown({
                name : 'dropdown',
                label : 'Delete unmoderated posts older than...',
                showArrow : true,
                alignment : 'top',
                className : 'ui-dropdown-styled -sm dark',
                arrowClassName : '-s10',
                bodyClassName : 'ui-vertical-list hoverable -block'
            })).render(this.el);

            this.olderThanDates.forEach(function(date) {
                this.dropdown.addContent(this.appendChild(new Widget({
                    name : 'delete' + date.name,
                    className : 'ui-vertical-list-item -block'
                })).element[0]);
                this['delete' + date.name].element.text(date.label);
                this['delete' + date.name].element[0].setAttribute('data-subtract-number', date.subtract[0]);
                this['delete' + date.name].element[0].setAttribute('data-subtract-string', date.subtract[1]);
                this._options.push(this['delete' + date.name]);
            }, this);

            this.dropdown.addContent(this.appendChild(new Widget({
                name : 'deleteAll',
                className : 'moderate-dropdown-delete-all-option ui-vertical-list-item -block'
            })).element[0]);
            this.deleteAll.element.text('All unmoderated posts');

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this._options.forEach(function(option) {
                option.element.on('click', this._clickHandlerRef);
            }, this);

            this._deleteAllClickHandlerRef = this._deleteAllClickHandler.bind(this);
            this.deleteAll.element.on('click', this._deleteAllClickHandlerRef);
            return this;
        },

        _clickHandler : function _clickHandler(ev) {
            var subtractNumber = ~~ev.target.getAttribute('data-subtract-number');
            var subtractString = ev.target.getAttribute('data-subtract-string');
            var olderThanDate = moment().subtract(subtractNumber, subtractString);

            API.deletePostsOlderThan({
                profileName : App.Voice.data.owner.profileName,
                voiceSlug : App.Voice.data.slug,
                data : {olderThanDate: olderThanDate.format()}
            }, function(err, res) {
                // {status: "ok", deletedPostsCount: 115}
                if (err) {
                    this._displayErrorAlert('There was a problem trying to remove the indicated Posts.');
                    return;
                }

                if (res.status === 'ok') {
                    this._displaySuccessAlert(res.deletedPostsCount + ' Posts were deleted. The page will be refreshed in a couple of seconds.');

                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                }
            }.bind(this));
        },

        _deleteAllClickHandler : function _deleteAllClickHandler() {
            API.deleteAllUnmoderatedPosts({
                profileName : App.Voice.data.owner.profileName,
                voiceSlug : App.Voice.data.slug
            }, function(err, res) {
                // {status: "ok", deletedPostsCount: 115}
                if (err) {
                    this._displayErrorAlert('There was a problem trying to remove the indicated Posts.');
                    return;
                }

                if (res.status === 'ok') {
                    this._displaySuccessAlert(res.deletedPostsCount + ' Posts were deleted. The page will be refreshed in a couple of seconds.');

                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                }
            }.bind(this));
        },

        /* Displays a success alert, if already exists it will update the message.
         * @method _displaySuccessAlert <private> [Function]
         * @argument message <required> [String] the message to display.
         * @return undefined
         */
        _displaySuccessAlert : function _displaySuccessAlert(message) {
            this.scrollableArea.scrollTop = 0;

            if (this._successAlert) {
                return this._successAlert.update(message);
            }

            this.appendChild(new CV.Alert({
                name : '_successAlert',
                type : 'positive',
                text : message,
                className : '-mt1 -mr1 -ml1'
            })).render(this.scrollableArea, this.scrollableArea.firstElementChild);
        },

        /* Displays an error alert, if already exists it will update the message.
         * @method _displayErrorAlert <private> [Function]
         * @argument message <required> [String] the message to display.
         * @return undefined
         */
        _displayErrorAlert : function _displayErrorAlert(message) {
            this.scrollableArea.scrollTop = 0;

            if (this._errorAlert) {
                return this._errorAlert.update(message);
            }

            this.appendChild(new CV.Alert({
                name : '_errorAlert',
                type : 'negative',
                text : message,
                className : '-mt1 -mr1 -ml1'
            })).render(this.scrollableArea, this.scrollableArea.firstElementChild);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this._options.forEach(function(option) {
                option.element.off('click', this._clickHandlerRef);
            }, this);
            this._clickHandlerRef = null;

            this.deleteAll.element.off('click', this._deleteAllClickHandlerRef);
            this._deleteAllClickHandlerRef = null;

            return null;

        }
    }
});
