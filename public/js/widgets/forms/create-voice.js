var Person = require('./../../lib/currentPerson');
var Events = require('./../../lib/events');
var Checkit = require('checkit');

Class(CV, 'CreateVoice').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-form-create-voice -clearfix',
    HTML : '\
        <div>\
            <div class="-col-12">\
                <div data-background class="-col-3 -pr1"></div>\
                <div data-title class="-col-9 -pl1"></div>\
            </div>\
            <div data-row-voice-info class="-col-12">\
                <div data-topics></div>\
                <div data-type></div>\
                <div data-status></div>\
            </div>\
            <div class="-col-12">\
                <div class="-col-6 -pr1 placeholder-twitter"></div>\
                <div class="-col-6 -pl1 placeholder-rss">\
            </div>\
            </div>\
            <div class="-col-12">\
                <div class="-col-6 -pr1 placeholder-latitude"></div>\
                <div class="-col-6 -pl1 placeholder-longitude"></div>\
            </div>\
            <div class="send -col-12 -text-center"></div>\
        </div>\
    ',

    prototype : {
        MAX_TITLE_LENGTH : 65,
        MAX_DESCRIPTION_LENGTH : 140,

        init : function init(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.sendElement = this.el.querySelector('.send');

            this.checkitProps = {
                title : ['required', 'maxLength:' + this.MAX_TITLE_LENGTH],
                description : ['required', 'maxLength:' + this.MAX_DESCRIPTION_LENGTH],
                topicsDropdown : ['array', 'minLength:1'],
                typesDropdown : 'required',
                statusDropdown : 'required',
                hashtags : 'required',
                rssfeed : 'required',
                latitude : 'required',
                longitude : 'required'
            };

            this._setup()._updateInfoRow()._bindEvents();
            this.checkit = new Checkit(this.checkitProps);
        },

        _setup : function _setup() {
            if (Person.anon()) {
                this.appendChild(new CV.Alert({
                    type : 'warning',
                    text : 'You are creating this Voice anonymously. If you wish to make it public then turn Anonymous Mode off.',
                    className : '-mb2'
                })).render(this.el, this.el.firstChild);
            } else {
                this.appendChild(new CV.UI.Checkbox({
                    name : 'checkAnon',
                    className : '-block -pt1 -pb1',
                    data : {label : 'Create Anonymously' }
                })).render(this.sendElement);
            }

            this.appendChild(new CV.Image({
                name : 'backgroundImage',
                data: {title : "Background image"}
            })).render(this.el.querySelector('[data-background]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceTitle',
                data : {
                    label : 'Title',
                    hint : this.MAX_TITLE_LENGTH + ' characters max',
                    attr : {
                        type : 'text',
                        maxlength: this.MAX_TITLE_LENGTH
                    },
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('[data-title]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceDescription',
                data : {
                    isTextArea : true,
                    label : 'Description',
                    hint : '140 characters max',
                    inputClassName : '-lg -block',
                    attr : {
                        rows : 2,
                        maxlength: this.MAX_DESCRIPTION_LENGTH
                    }
                },
            })).render(this.el.querySelector('[data-title]'));

            this.appendChild(new CV.UI.DropdownTopics({
                name : 'voiceTopicsDropdown'
            })).render(this.el.querySelector('[data-topics]'));

            this.appendChild(new CV.UI.DropdownVoiceTypes({
                name : 'voiceTypesDropdown'
            })).render(this.el.querySelector('[data-type]'));

            this.appendChild(new CV.UI.DropdownVoiceStatus({
                name : 'voiceStatusDropdown'
            })).render(this.el.querySelector('[data-status]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceHashtags',
                data : {
                    label : "Twitter hashtags",
                    inputClassName : '-lg -block',
                }
            })).render(this.el.querySelector('.placeholder-twitter'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceRssfeed',
                data : {
                    label : 'Content from rss feed',
                    placeholder : '',
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('.placeholder-rss'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLatitude',
                data: {
                    label : 'Location',
                    placeholder : 'Latitude',
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('.placeholder-latitude'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLongitude',
                data : {
                    placeholder : 'Longitude',
                    label : ' ',
                    inputClassName : '-lg -block',
                }
            })).render(this.el.querySelector('.placeholder-longitude'));

            this.appendChild(new CV.Button({
                name : 'buttonSend',
                type : 'single',
                label : 'Create Voice',
                className : 'primary full'
            })).render(this.sendElement);

            return this;
        },

        /* Checks if currentPerson has owned organization in which case an ownership
         * dropdown is added to the form.
         * @method _updateInfoRow <private>
         */
        _updateInfoRow : function _updateInfoRow() {
            var row = this.el.querySelector('[data-row-voice-info]');

            if (Person.ownsOrganizations()) {
                var owncol = this.dom.create('div');
                this.appendChild(new CV.UI.DropdownVoiceOwnership({
                    name : 'voiceOwnershipDropdown'
                })).render(owncol);
                row.appendChild(owncol);

                this.checkitProps.ownershipDropdown = 'required';
            }

            var l = 12/row.childElementCount;
            [].slice.call(row.children).forEach(function(col, index) {
                var classSelectors = ['-col-' + l];
                if (index >= 1) {
                    classSelectors.push('-pl1');
                }
                this.dom.addClass(col, classSelectors);
            }, this);
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._sendFormHandlerRef = this._sendFormHandler.bind(this);
            Events.on(this.buttonSend.el, 'click', this._sendFormHandlerRef);
            return this;
        },

        _sendFormHandler : function _sendFormHandler() {
            var validate = this.checkit.validateSync(this._getCurrentData());

            if (validate[0]) {
                return this._displayErrors(validate[0].errors);
            }
        },

        _displayErrors : function _displayErrors(errors) {
            Object.keys(errors).forEach(function(propertyName) {
                var widget = 'voice' + this.format.capitalizeFirstLetter(propertyName);
                this[widget].error();
            }, this);
        },

        _getCurrentData : function _getCurrentData() {
            var body = {
                title : this.voiceTitle.getValue(),
                description : this.voiceDescription.getValue(),
                topicsDropdown : this.voiceTopicsDropdown.getSelection(),
                typesDropdown : this.voiceTypesDropdown.getValue(),
                statusDropdown : this.voiceStatusDropdown.getValue(),
                hashtags : this.voiceHashtags.getValue(),
                rssfeed : this.voiceRssfeed.getValue(),
                latitude : this.voiceLatitude.getValue(),
                longitude : this.voiceLongitude.getValue()
            };

            if (this.voiceOwnershipDropdown) {
                body.ownershipDropdown = this.voiceOwnershipDropdown.getValue();
            }

            return body;
        },

        destroy : function destroy() {
            Events.off(this.buttonSend.el, 'click', this._sendFormHandlerRef);
            this._sendFormHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
