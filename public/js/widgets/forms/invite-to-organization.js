var Person = require('./../../lib/currentPerson');
var Events = require('./../../lib/events');
var Checkit = require('checkit');

Class(CV, 'InviteToOrganization').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-form-invite-to-organization -clearfix',
    HTML : '\
        <div>\
            <div class="-col-12 placeholder-main"></div>\
            <div class="-col-12 placeholder-send"></div>\
        </div>',

    prototype : {
        /* Entity Model to invite */
        data : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.checkit = new Checkit({
                message : ['required']
            });

            this._setup()._bindEvents();
        },

        /* Append and render its children components.
         * @method _setup <private>
         */
        _setup : function _setup() {
            var allOrgs = {};

            Person.get().ownedOrganizations.forEach(function(org, index) {
                if (this.data.organizationIds.indexOf(org.id) === -1) {
                    allOrgs[index] = {label : org.name, name : 'org_' + index};
                }
            }, this);

            new CV.Select({
                label : 'Select one',
                name  : 'select',
                style : 'full',
                options : allOrgs,
                hasTitle : true,
                title : "To which of your organizations would you like to invite this user to?"
            }).render(this.element.find('.placeholder-main'));

            this.appendChild(new CV.UI.Input({
                name : 'inviteMessage',
                data : {
                    label : "Write a message",
                    isTextArea : true,
                    inputClassName : '-full-width',
                    attr : {
                        rows : 2
                    }
                }
            })).render(this.element.find('.placeholder-main'));

            this.appendChild(new CV.Button({
                name    : 'buttonSend',
                style   : 'primary full',
                type    : 'single',
                label   : 'Invite Esra\'a Al Shafei'
            })).render(this.element.find('.placeholder-send'));

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._sendClickHandlerRef = this._sendClickHandler.bind(this);
            Events.on(this.buttonSend.el, 'click', this._sendClickHandlerRef);
            return this;
        },

        /* Send button click handler.
         * @method _sendClickHandler <private>
         */
        _sendClickHandler : function _sendClickHandler() {
            var validate = this.checkit.validateSync({
                message : this.inviteMessage.getValue()
            });

            if (validate[0]) {
                return this._displayErrors(validate[0].errors);
            }
        },

        /* Display the current form errors.
         * @method _displayErrors
         */
        _displayErrors : function _displayErrors(errors) {
            Object.keys(errors).forEach(function(propertyName) {
                var widget = 'invite' + this.format.capitalizeFirstLetter(propertyName);
                this[widget].error();
            }, this);
        },

        destroy : function destroy() {
            Events.off(this.buttonSend.el, 'click', this._sendClickHandlerRef);
            this._sendClickHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
