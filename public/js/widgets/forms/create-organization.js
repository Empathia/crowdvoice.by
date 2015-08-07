var Events = require('./../../lib/events');
var Checkit = require('checkit');

Class(CV, 'CreateOrganization').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-form-create-organization',
    HTML : '\
        <div>\
            <div class="-col-12 placeholder-main"></div>\
            <div class="-col-12">\
                <div class="-col-10 -pr1 placeholder-location"></div>\
                <div class="-col-2 -pl1 placeholder-pin">\
                    <div class="form-field">\
                        <label><span></span></label>\
                        <div class="cv-detect-location">Detect</div>\
                    </div>\
                </div>\
            </div>\
            <div class="-col-3 -pr1 placeholder-logo"></div>\
            <div class="-col-9 -pl1 placeholder-background"></div>\
            <div class="-col-12 placeholder-send"></div>\
        </div>\
    ',

    prototype : {
        MAX_TITLE_LENGTH : 65,
        MAX_DESCRIPTION_LENGTH : 180,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.checkit = new Checkit({
                name : ['required', 'maxLength:' + this.MAX_TITLE_LENGTH],
                handler : 'required',
                description : ['required', 'maxLength:' + this.MAX_DESCRIPTION_LENGTH],
                location : 'required'
            });

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new CV.UI.Input({
                name : 'orgName',
                data : {
                    label : 'Organization Name',
                    hint : this.MAX_TITLE_LENGTH + ' characters max',
                    inputClassName : '-lg -block',
                    attr : {
                        type : 'text',
                        maxlength: this.MAX_TITLE_LENGTH
                    },
                }
            })).render(this.el.querySelector('.placeholder-main'));

            this.appendChild(new CV.UI.Input({
                name : 'orgHandler',
                data : {
                    placeholder : 'http://www.crowdvoice.by/@',
                    label : 'Handler',
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('.placeholder-main'));

            this.appendChild(new CV.UI.Input({
                name : 'orgDescription',
                data : {
                    isTextArea : true,
                    label : 'Description',
                    hint : this.MAX_DESCRIPTION_LENGTH + ' characters max',
                    inputClassName : '-lg -block',
                    attr : {
                        rows : 2,
                        maxlength: this.MAX_DESCRIPTION_LENGTH
                    }
                }
            })).render(this.el.querySelector('.placeholder-main'));

            this.appendChild(new CV.UI.Input({
                name : 'orgLocation',
                data : {
                    label : "Location",
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('.placeholder-location'));

            this.appendChild(new CV.Image({
                name : 'orgLogoImage',
                data: {title : 'Logo / badge'}
            })).render(this.el.querySelector('.placeholder-logo'));

            this.appendChild(new CV.Image({
                name : 'orgBackgroundImage',
                data : {title : 'Background'}
            })).render(this.el.querySelector('.placeholder-background'));

            this.appendChild(new CV.Button({
                name  : 'buttonSend',
                className : 'primary full',
                type : 'single',
                label : 'Create Organization'
            })).render(this.el.querySelector('.placeholder-send'));

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._sendFormHandlerRef = this._sendFormHandler.bind(this);
            Events.on(this.buttonSend.el, 'click', this._sendFormHandlerRef);
            return this;
        },

        _sendFormHandler : function _sendFormHandler() {
            var validate = this.checkit.validateSync({
                name : this.orgName.getValue(),
                handler : this.orgHandler.getValue(),
                description : this.orgDescription.getValue(),
                location : this.orgLocation.getValue()
            });

            if (validate[0]) {
                return this._displayErrors(validate[0].errors);
            }
        },

        _displayErrors : function _displayErrors(errors) {
            Object.keys(errors).forEach(function(propertyName) {
                var widget = 'org' + this.format.capitalizeFirstLetter(propertyName);
                this[widget].error();
            }, this);
        },

        destroy : function destroy() {
            Events.off(this.buttonSend.el, 'click', this._sendFormHandlerRef);
            this._sendFormHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
