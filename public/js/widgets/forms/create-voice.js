var Person = require('./../../lib/currentPerson');
var API = require('./../../lib/api');
var Events = require('./../../lib/events');
var Checkit = require('checkit');
var Slug = require('slug');
Slug.defaults.modes.pretty.lower = true;

Class(CV, 'CreateVoice').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-form-create-voice -clearfix',
    HTML : '\
        <div>\
            <div class="-col-12">\
                <div data-background class="-col-3 -pr1"></div>\
                <div class="-col-9">\
                    <div class="-col-12">\
                        <div data-title class="-col-6"></div>\
                        <div data-slug class="-col-6 -pl1"></div>\
                    </div>\
                    <div class="-col-12">\
                        <div data-description></div>\
                    </div>\
                </div>\
            </div>\
            <div data-row-voice-info class="-col-12">\
                <div data-topics></div>\
                <div data-type></div>\
                <div data-status></div>\
            </div>\
            <div class="-col-12">\
                <div data-twitter class="-col-6"></div>\
                <div data-rss class="-col-6 -pl1">\
            </div>\
            </div>\
            <div data-location-wrapper class="-col-12 -rel">\
                <div data-location class="-col-4"></div>\
                <div data-latitude class="-col-4 -pl1"></div>\
                <div data-longitude class="-col-4 -pl1"></div>\
            </div>\
            <div class="send -col-12 -text-center"></div>\
        </div>\
    ',

    prototype : {
        MAX_TITLE_LENGTH : 65,
        MAX_DESCRIPTION_LENGTH : 140,
        _autoGenerateSlug : true,

        init : function init(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.sendElement = this.el.querySelector('.send');

            this.checkitProps = {
                title : ['required', 'maxLength:' + this.MAX_TITLE_LENGTH],
                slug : ['required', 'alphaDash', 'maxLength:' + this.MAX_TITLE_LENGTH],
                description : ['required', 'maxLength:' + this.MAX_DESCRIPTION_LENGTH],
                topicsDropdown : ['array', 'minLength:1'],
                typesDropdown : 'required',
                statusDropdown : 'required',
                hashtags : 'required',
                rssfeed : 'required'
            };

            this._setup()._updateInfoRow()._bindEvents();
            this.checkit = new Checkit(this.checkitProps);
        },

        /* Create and append the form element widgets.
         * @method _setup <private>
         */
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
                name : 'voiceSlug',
                data : {
                    label : 'Slug',
                    hint : this.MAX_TITLE_LENGTH + ' characters max',
                    attr : {
                        type : 'text',
                        maxlength: this.MAX_TITLE_LENGTH
                    },
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('[data-slug]'));

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
            })).render(this.el.querySelector('[data-description]'));

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
            })).render(this.el.querySelector('[data-twitter]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceRssfeed',
                data : {
                    label : 'Content from rss feed',
                    placeholder : '',
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('[data-rss]'));

            this.appendChild(new CV.DetectLocation({
                name : 'detectLocation',
                label : 'Detect Location',
                requireGoogleMaps : true
            })).render(this.el.querySelector('[data-location-wrapper]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLocation',
                data: {
                    label : 'Location Name',
                    placeholder : 'Location name',
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('[data-location]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLatitude',
                data: {
                    label : 'Latitude',
                    placeholder : 'Latitude',
                    inputClassName : '-lg -block'
                }
            })).render(this.el.querySelector('[data-latitude]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLongitude',
                data : {
                    label : 'Longitude',
                    placeholder : 'Longitude',
                    inputClassName : '-lg -block',
                }
            })).render(this.el.querySelector('[data-longitude]'));

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

            if (!Person.anon() && Person.ownsOrganizations()) {
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
            this._getGeocodingRef = this._getGeocoding.bind(this);
            this._getLocationRef = this._getLocation.bind(this);
            this.detectLocation.bind('location', this._getLocationRef);

            this._sendFormHandlerRef = this._sendFormHandler.bind(this);
            Events.on(this.buttonSend.el, 'click', this._sendFormHandlerRef);

            this._slugAvailabilityHandlerRef = this._slugAvailabilityHandler.bind(this);

            if (this._autoGenerateSlug) {
                this._generateSlugRef = this._generateSlug.bind(this);
                Events.on(this.voiceTitle.getInput(), 'keyup', this._generateSlugRef);

                this._letFreeSlugRef = this._letFreeSlug.bind(this);
                Events.on(this.voiceSlug.getInput(), 'keyup', this._letFreeSlugRef);
            }

            return this;
        },

        _generateSlug : function _generateSlug() {
            var slug = Slug(this.voiceTitle.getValue());
            this.voiceSlug.setValue(slug);
            this._checkSlugAvailability(slug);
        },

        _checkSlugAvailability : function _checkSlugAvailability(slug) {
            this.voiceSlug.clearState().updateHint();

            if (!slug.length) {
                return void 0;
            }

            API.isSlugAvailable({
                profileName : Person.get().profileName,
                slug : slug
            }, this._slugAvailabilityHandlerRef);
        },

        _slugAvailabilityHandler : function _slugAvailabilityHandler(err, res) {
            if (err) {
                return void 0;
            }

            if (res.status === "taken") {
                this.voiceSlug.clearState().error();
                return this.voiceSlug.updateHint({
                    hint : '(slug is already taken)',
                    className : '-color-danger'
                });
            }

            this.voiceSlug.clearState().success();
        },

        _letFreeSlug : function _letFreeSlug() {
            if (Slug(this.voiceTitle.getValue()) !== this.voiceSlug.getValue()) {
                this._autoGenerateSlug = false;

                Events.off(this.voiceTitle.getInput(), 'keyup', this._generateSlugRef);
                this._generateSlugRef = null;

                Events.off(this.voiceSlug.getInput(), 'keyup', this._letFreeSlugRef);
                this._letFreeSlugRef = this._sanitizeSlugHandler.bind(this);
                Events.on(this.voiceSlug.getInput(), 'keyup', this._letFreeSlugRef);
                this._lastFreeSlug = this.voiceSlug.getValue();
            }
        },

        _sanitizeSlugHandler : function _sanitizeSlugHandler() {
            var slug = this.voiceSlug.getValue();

            if (slug !== this._lastFreeSlug) {
                slug = Slug(slug);
                this._lastFreeSlug = slug;
                this.voiceSlug.setValue(slug);
                this._checkSlugAvailability(slug);
            }
        },

        _getLocation : function _getLocation(ev) {
            this.voiceLatitude.setValue(ev.data.coords.latitude);
            this.voiceLongitude.setValue(ev.data.coords.longitude);
            this.detectLocation.getGeocoding(ev.data.coords.latitude, ev.data.coords.longitude, this._getGeocodingRef);
        },

        _getGeocoding : function _getGeocoding(err, res) {
            if (err) {
                // @TODO: handle error
                console.log(err);
                return void 0;
            }

            if (!res[0]) {
                // @TODO: handle case
                console.log('asjfas');
                return void 0;
            }

            var r = res[0];
            var address = [];

            r.address_components.forEach(function(c) {
                if (
                    (c.types[0] === "locality") ||
                    (c.types[0] === "administrative_area_level_1") ||
                    (c.types[0] === "country")
                ) {
                    address.push(c.long_name);
                }
            });

            this.voiceLocation.setValue(address.join(', ') + '.');
            this.voiceLatitude.setValue(r.geometry.location.G);
            this.voiceLongitude.setValue(r.geometry.location.K);
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
                title : this.voiceTitle.getValue().trim(),
                slug : this.voiceSlug.getValue().trim(),
                description : this.voiceDescription.getValue().trim(),
                topicsDropdown : this.voiceTopicsDropdown.getSelection(),
                typesDropdown : this.voiceTypesDropdown.getValue(),
                statusDropdown : this.voiceStatusDropdown.getValue(),
                hashtags : this.voiceHashtags.getValue().trim(),
                rssfeed : this.voiceRssfeed.getValue().trim()
            };

            if (this.voiceOwnershipDropdown) {
                body.ownershipDropdown = this.voiceOwnershipDropdown.getValue();
            }

            return body;
        },

        destroy : function destroy() {
            Events.off(this.buttonSend.el, 'click', this._sendFormHandlerRef);
            this._sendFormHandlerRef = null;

            if (this._autoGenerateSlug) {
                Events.off(this.voiceTitle.getInput(), 'keyup', this._generateSlugRef);
                this._generateSlugRef = null;

                Events.off(this.voiceSlug.getInput(), 'keyup', this._letFreeSlugRef);
                this._letFreeSlugRef = null;
            }

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});
