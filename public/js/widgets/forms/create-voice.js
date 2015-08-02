var Events = require('./../../lib/events');
var Checkit = require('checkit');

Class(CV, 'CreateVoice').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-form-create-voice -clearfix',
    HTML : '\
        <div>\
            <div class="-col-12">\
                <div class="-col-3 -pr1 placeholder-image"></div>\
                <div class="-col-9 -pl1 placeholder-title placeholder-description"></div>\
            </div>\
            <div class="-col-6 -pr1 placeholder-topics placeholder-twitter"></div>\
            <div class="-col-6 -pl1 placeholder-rss">\
                <div class="placeholder-voice-type"></div>\
            </div>\
            <div class="-col-12">\
                <div class="-col-6 -pr1 placeholder-latitude"></div>\
                <div class="-col-6 -pl1 placeholder-longitude"></div>\
            </div>\
            <div class="send -col-12 -text-center"></div>\
        </div>\
    ',

    prototype : {
        init : function init(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.sendElement = this.element.find('.send');

            this.checkit = new Checkit({
                title : 'required',
                description : 'required',
                hashtags : 'required',
                rssfeed : 'required',
                latitude : 'required',
                longitude : 'required'
            });

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new CV.Image({
                name : 'backgroundImage',
                data: {title : "Background image"}
            })).render(this.element.find('.placeholder-image'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceTitle',
                data : {
                    label : "Title",
                    hint : "65 characters max",
                    attr : {
                        type : 'text',
                        maxlength: 65
                    },
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('.placeholder-title'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceDescription',
                data : {
                    isTextArea : true,
                    label : "Description",
                    hint : "140 characters max",
                    inputClassName : '-lg -block',
                    attr : {
                        rows : 2,
                        maxlength: 140
                    }
                },
            })).render(this.element.find('.placeholder-description'));

            //Checkbox
            var allOptions = {
                "1": {label: 'Myself'},
                "2": {label: 'Organization 01'},
                "3": {label: 'Organization 02'},
                "4": {label: 'Organization 03'}
            };
            new CV.Select({
                type    	: 'check',
                label 		: 'Select at least one',
                name  		: 'selectFollow',
                style 		: 'full',
                options		: allOptions,
                hasTitle 	: true,
                title 		: "Voice topics (?)"
            }).render(this.element.find('.placeholder-topics'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceHashtags',
                data : {
                    label : "Twitter hashtags",
                    inputClassName : '-lg -block',
                }
            })).render(this.element.find('.placeholder-twitter'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLatitude',
                data: {
                    label : 'Location',
                    placeholder : 'Latitude',
                    inputClassName : '-lg -block'
                }
            })).render(this.element.find('.placeholder-latitude'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLongitude',
                data : {
                    placeholder : 'Longitude',
                    label : ' ',
                    inputClassName : '-lg -block',
                }
            })).render(this.element.find('.placeholder-longitude'));

            //voice types
            var allTypes = {
                "1": {label: 'Public', name: 'public'},
                "2": {label: 'Closed', name: 'closed'},
                "3": {label: 'Pending', name : 'pending'}
            };
            new CV.Select({
                label 		: 'Select one',
                name  		: 'select',
                style 		: 'full',
                options 	: allTypes,
                hasTitle 	: true,
                title 		: "Voice type (?)"
            }).render(this.element.find('.placeholder-voice-type'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceRssfeed',
                data : {
                    label : 'Content from rss feed',
                    placeholder : '',
                    inputClassName : '-lg -block'
                }
            })).render(this.element.find('.placeholder-rss'));

            //********** bottom ***********
            this.appendChild(new CV.Check({
                id          : 1,
                label       : "Create Anonymously (?)",
                name        : "checkAnon"
            })).render(this.sendElement);

            this.appendChild(new CV.Button({
                name : 'buttonSend',
                type : 'single',
                label : 'Create Voice',
                className : 'primary full'
            })).render(this.sendElement);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._sendFormHandlerRef = this._sendFormHandler.bind(this);
            Events.on(this.buttonSend.el, 'click', this._sendFormHandlerRef);
            return this;
        },

        _sendFormHandler : function _sendFormHandler() {
            var validate = this.checkit.validateSync({
                title : this.voiceTitle.getValue(),
                description : this.voiceDescription.getValue(),
                hashtags : this.voiceHashtags.getValue(),
                rssfeed : this.voiceRssfeed.getValue(),
                latitude : this.voiceLatitude.getValue(),
                longitude : this.voiceLongitude.getValue()
            });

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

        destroy : function destroy() {
            Events.off(this.buttonSend.el, 'click', this._sendFormHandlerRef);
            this._sendFormHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});
