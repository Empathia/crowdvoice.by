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
        </div>',

    REDIRECT_DELAY : 4000,

    prototype : {
        /* Voice data for Edit. Is null it assumes you are creating a new Voice,
         * if other than null assumes you are editing an existing Voice.
         */
        data : null,
        _flashMessage : null,

        MAX_TITLE_LENGTH : 65,
        MAX_DESCRIPTION_LENGTH : 180,
        _autoGenerateSlug : true,
        isAdmin     : null,
        token : $('meta[name="csrf-token"]').attr('content'),


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
                statusDropdown : 'required'
            };

            this._setup()._updateInfoRow();

            // Edit voice
            if (this.data) {
                this._autoGenerateSlug = false;
                this._fillForm(this.data);
            }

            this._bindEvents();
            this.checkit = new Checkit(this.checkitProps);
        },

        /* Fills the form using this.data values (Edit Voice).
         * Whem this.data prop is passed (truthy) it should contain the voice
         * entity data to be edited.
         */
        _fillForm : function _fillForm(voice) {
            if (voice.images.card) {
                this.voiceBgImage.setImage(voice.images.card.url);
            }
            this.voiceTitle.setValue(voice.title);
            this.voiceSlug.setValue(voice.slug);
            this.voiceDescription.setValue(
                this.format.truncate(voice.description, this.MAX_DESCRIPTION_LENGTH)
            );
            this.voiceTopicsDropdown.selectValues(voice.topics);
            this.voiceTypesDropdown.selectByValue(voice.type);
            this.voiceStatusDropdown.selectByValue(voice.status);
            if (this.isAdmin) {
                //this.voiceOwnershipDropdownAdmin.selectByEntity(voice.owner);
            }else{
                this.voiceOwnershipDropdown.selectByEntity(voice.owner);
            }
            this.voiceHashtags.setValue(voice.twitterSearch);
            this.voiceRssfeed.setValue(voice.rssUrl);
            this.voiceLocation.setValue(voice.locationName);
            this.voiceLatitude.setValue(voice.latitude);
            this.voiceLongitude.setValue(voice.longitude);
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
                name : 'voiceBgImage',
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
            this.voiceTypesDropdown.selectByValue(CV.VoiceView.TYPE_PUBLIC);

            this.appendChild(new CV.UI.DropdownVoiceStatus({
                name : 'voiceStatusDropdown'
            })).render(this.el.querySelector('[data-status]'));
            this.voiceStatusDropdown.selectByValue(CV.VoiceView.STATUS_DRAFT);

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
                    inputClassName : '-lg -block',
                    attr : {
                        placeholder : 'Location name'
                    }
                }
            })).render(this.el.querySelector('[data-location]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLatitude',
                data: {
                    label : 'Latitude',
                    inputClassName : '-lg -block',
                    attr : {
                        placeholder : 'Latitude'
                    }
                }
            })).render(this.el.querySelector('[data-latitude]'));

            this.appendChild(new CV.UI.Input({
                name : 'voiceLongitude',
                data : {
                    label : 'Longitude',
                    inputClassName : '-lg -block',
                    attr : {
                        placeholder : 'Longitude'
                    }
                }
            })).render(this.el.querySelector('[data-longitude]'));

            var buttonLabel = 'Create Voice';

            if (this.data) {
              buttonLabel = 'Update Voice';
            }

            this.appendChild(new CV.Button({
                name : 'buttonSend',
                type : 'single',
                label : buttonLabel,
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

            if (this.isAdmin){

                var owncol = document.createElement('div');
                this.appendChild(new CV.UI.DropdownVoiceOwnershipAdmin({
                    name : 'voiceOwnershipDropdown',
                    owner : this.data.owner,
                })).render(owncol);

                this.voiceOwnershipDropdown.selectByEntity(this.data.owner);
                row.appendChild(owncol);

                this.checkitProps.ownershipDropdown = 'required';

            } else {
                if (!Person.anon() && Person.ownsOrganizations()) {
                    var owncol = document.createElement('div');
                    this.appendChild(new CV.UI.DropdownVoiceOwnership({
                        name : 'voiceOwnershipDropdown'
                    })).render(owncol);

                    this.voiceOwnershipDropdown.selectByEntity(Person.get());
                    row.appendChild(owncol);

                    this.checkitProps.ownershipDropdown = 'required';
                }
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
            this._getLocationRef = this._getLocationHandler.bind(this);
            this.detectLocation.bind('location', this._getLocationRef);

            this._sendFormHandlerRef = this._sendFormHandler.bind(this);
            Events.on(this.buttonSend.el, 'click', this._sendFormHandlerRef);

            if (this._autoGenerateSlug) {
                this._generateSlughandlerRef = this._generateSlugHandler.bind(this);
                Events.on(this.voiceTitle.getInput(), 'keyup', this._generateSlughandlerRef);
            }

            this._letFreeSlugRef = this._letFreeSlug.bind(this);
            Events.on(this.voiceSlug.getInput(), 'keyup', this._letFreeSlugRef);

            return this;
        },

        /* Watch the voiceTitle input change event, auto-generates a valid slug
         * and updates the voiceSlug input with the genereted slug string
         * @method _generateSlugHandler <private>
         */
        _generateSlugHandler : function _generateSlugHandler() {
            var slug = Slug(this.voiceTitle.getValue());
            this.voiceSlug.setValue(slug);
            this._checkSlugAvailability(slug);
        },

        /* Calls the API isSlugAvailable endpoint to validate if the current
         * slug is available or taken.
         * @method _checkSlugAvailability <private>
         */
        _checkSlugAvailability : function _checkSlugAvailability(slug) {
            this.voiceSlug.clearState().updateHint();

            if (!slug.length) {
                return void 0;
            }

            var options = {
                profileName : Person.get().profileName,
                slug : slug
            };

            if (this.data) {
              options.voiceSlug = this.data.slug;
            }

            API.isSlugAvailable(options, this._slugAvailabilityHandler.bind(this));
        },

        /* API's isSlugAvailable response handler
         * @method _slugAvailabilityHandler <private>
         */
        _slugAvailabilityHandler : function _slugAvailabilityHandler(err, res) {
            if (err) {
                return void 0;
            }

            if (res.status === "taken") {
                this.voiceSlug.clearState().error();
                return this.voiceSlug.updateHint({
                    hint : '(slug is already taken)',
                    className : '-color-negative'
                });
            }

            this.voiceSlug.clearState().success();
        },

        /* When the user changes the voiceSlug input value manually we have to
         * stop `watching` the voiceTitle input change event, so we do not auto
         * generate the slug anymore but let the user enter whatever slug she
         * wants.
         * This method checks if we should stop watching the title input.
         * @method _letFreeSlug <private>
         */
        _letFreeSlug : function _letFreeSlug() {
            if (Slug(this.voiceTitle.getValue()) !== this.voiceSlug.getValue()) {
                this._autoGenerateSlug = false;

                Events.off(this.voiceTitle.getInput(), 'keyup', this._generateSlughandlerRef);
                this._generateSlughandlerRef = null;

                Events.off(this.voiceSlug.getInput(), 'keyup', this._letFreeSlugRef);
                this._letFreeSlugRef = this._sanitizeSlugHandler.bind(this);
                Events.on(this.voiceSlug.getInput(), 'keyup', this._letFreeSlugRef);
                this._lastFreeSlug = this.voiceSlug.getValue();
            }
        },

        /* voiceSlug input keyup handler.
         * Validates that only alpa-numeric values and dashes can be entered on
         * the voiceSlug input manually.
         * @method _sanitizeSlugHandler <private>
         */
        _sanitizeSlugHandler : function _sanitizeSlugHandler() {
            var slug = this.voiceSlug.getValue();

            if (slug !== this._lastFreeSlug) {
                slug = Slug(slug);
                this._lastFreeSlug = slug;
                this.voiceSlug.setValue(slug);
                this._checkSlugAvailability(slug);
            }
        },

        /* Listens to detectLocation widget 'location' custom event.
         * Updates the latitude and longitude with the response and calls the
         * getGeocoding method on it.
         */
        _getLocationHandler : function _getLocationHandler(ev) {
            this.voiceLatitude.setValue(ev.data.coords.latitude);
            this.voiceLongitude.setValue(ev.data.coords.longitude);
            this.detectLocation.getGeocoding(ev.data.coords.latitude, ev.data.coords.longitude, this._getGeocoding.bind(this));
        },

        /* detectLocation.getGeocoding method callback
         * Updates the locationName input field
         * @method _getGeocoding <private>
         */
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

            if(this.isAdmin){

                this.buttonSend.disable();
                var createVoice = this;

                $.ajax({
                    type : 'PUT',
                    url : '/admin/voices/' + this.data.id,
                    headers : {'csrf-token' : this.token},
                    data : this._dataPresenterAdmin(),
                    dataType : 'json',
                    success : function success(data) {
                        console.log('success');
                        if (createVoice._flashMessage) {
                            createVoice._flashMessage = createVoice._flashMessage.destroy();
                        }
                        createVoice.appendChild(new CV.Alert({
                            name : '_flashMessage',
                            type : 'positive',
                            text : "Voice edited succesfully, redirecting to voices list.",
                            className : '-mb1'
                        })).render(createVoice.el, createVoice.el.firstElementChild);
                        window.setTimeout(function() {
                            window.location = '/admin/voices';
                        }, 2000);
                    },
                    error : function error(err) {
                        if (createVoice._flashMessage) {
                            createVoice._flashMessage = createVoice._flashMessage.destroy();
                        }
                        createVoice.appendChild(new CV.Alert({
                            name : '_flashMessage',
                            type : 'negative',
                            text : "Could not update voice try again please.",
                            className : '-mb1'
                        })).render(createVoice.el, createVoice.el.firstElementChild);
                        this.buttonSend.enable();
                    }
                });

            } else {
                this._setSendingState();

                // Edit
                if (this.data) {
                    var profileName;
                    if (Person.anon() || this.checkAnon.isChecked()) {
                        profileName = 'anonymous';
                    } else {
                        profileName = this.data.owner.profileName;
                    }

                    API.voiceEdit({
                        profileName : profileName,
                        voiceSlug : this.data.slug,
                        data : this._dataPresenter()
                    }, this._createVoiceHandler.bind(this));

                    return void 0;
                }

                // Create
                API.voiceCreate({
                    data: this._dataPresenter()
                }, this._createVoiceHandler.bind(this));

            }

        },

        _createVoiceHandler : function _createVoiceHandler(err, res) {
            if (err) {
                this._setErrorState(res.status + ': ' + res.statusText);
                return;
            }

            this._setSuccessState(res);
        },

        /* Display the current form errors.
         * @method _displayErrors
         */
        _displayErrors : function _displayErrors(errors) {
            console.log(errors);
            Object.keys(errors).forEach(function(propertyName) {
                var widget = 'voice' + this.format.capitalizeFirstLetter(propertyName);
                this[widget].error();
            }, this);
        },

        /* Sending state, disable the send button.
         * @message _setSendingState <private>
         */
        _setSendingState : function _setSendingState() {
            this.buttonSend.disable();
            return this;
        },

        /* Sets the error state of the form.
         * @method _setErrorState <private>
         */
        _setErrorState : function _setErrorState(message) {
            this.buttonSend.enable();

            if (this._flashMessage) {
                this._flashMessage = this._flashMessage.destroy();
            }

            this.appendChild(new CV.Alert({
                name : '_flashMessage',
                type : 'negative',
                text : message,
                className : '-mb1'
            })).render(this.el, this.el.firstElementChild);
        },

        /* Sets the success state of the form.
         * @method _setSuccessState <private>
         */
        _setSuccessState : function _setSuccessState(res) {
            var message;

            if (this._flashMessage) {
                this._flashMessage = this._flashMessage.destroy();
            }

            if (this.data) {
                message = "“" + res.title + '” was updated! You will be redirected to your profile in a couple of seconds.';

                window.setTimeout(function() {
                    window.location = '/';
                }, this.constructor.REDIRECT_DELAY);
            } else {
                message = "“" + res.title + '” was created! You will be redirected to its profile in a couple of seconds.';

                window.setTimeout(function() {
                    window.location.replace('/' + res.owner.profileName + '/' + res.slug);
                }, this.constructor.REDIRECT_DELAY);
            }

            this.appendChild(new CV.Alert({
                name : '_flashMessage',
                type : 'positive',
                text : message,
                className : '-mb1'
            })).render(this.el, this.el.firstElementChild);

            return this;
        },

        /* Returns the data to be validated using Checkit module
         * @method _getCurrentData <private>
         */
        _getCurrentData : function _getCurrentData() {
            var body = {
                title : this.voiceTitle.getValue().trim(),
                slug : this.voiceSlug.getValue().trim(),
                description : this.voiceDescription.getValue().trim(),
                topicsDropdown : this.voiceTopicsDropdown.getSelection(),
                typesDropdown : this.voiceTypesDropdown.getValue(),
                statusDropdown : this.voiceStatusDropdown.getValue()
            };

            if (this.voiceOwnershipDropdown) {
                body.ownershipDropdown = this.voiceOwnershipDropdown.getValue();
            }

            return body;
        },

        /* Returns the data to be sent to server to create a new Voice.
         * @method _dataPresenter <private> [Function]
         */
        _dataPresenter : function _dataPresenter() {
            var data = new FormData();

            data.append('image', this.voiceBgImage.getFile());
            data.append('title', this.voiceTitle.getValue().trim());

            data.append('slug', this.voiceSlug.getValue().trim());
            data.append('description', this.voiceDescription.getValue().trim());
            data.append('topics', this.voiceTopicsDropdown.getSelection().map(function(topic) {return topic.id;}));
            data.append('type', this.voiceTypesDropdown.getValue());
            data.append('status', this.voiceStatusDropdown.getValue());
            data.append('twitterSearch', this.voiceHashtags.getValue().trim());
            data.append('rssUrl', this.voiceRssfeed.getValue().trim());
            data.append('locationName', this.voiceLocation.getValue().trim());
            data.append('latitude', this.voiceLatitude.getValue().trim());
            data.append('longitude', this.voiceLongitude.getValue().trim());

            if (Person.anon()) {
                data.append('anonymously', true);
            } else {
                data.append('anonymously', this.checkAnon.isChecked());
            }

            if (this.voiceOwnershipDropdown) {
                data.append('ownerId', this.voiceOwnershipDropdown.getValue());
            } else {
                data.append('ownerId', Person.get().id);
            }
            window.tmp = this;
            console.log(data);
            return data;
        },

        /* Returns the data to be sent to server to edit a Voice as admin.
         * @method _dataPresenterAdmin <private> [Function]
         */
        _dataPresenterAdmin : function _dataPresenterAdmin() {
            var data = {};

            data['image'] = this.voiceBgImage.getFile();
            data['title'] = this.voiceTitle.getValue().trim();
            data['slug'] = this.voiceSlug.getValue().trim();
            data['description'] = this.voiceDescription.getValue().trim();
            data['topics'] = this.voiceTopicsDropdown.getSelection().map(function(topic) {return topic.id;});
            data['type'] = this.voiceTypesDropdown.getValue();
            data['status'] = this.voiceStatusDropdown.getValue();
            data['twitterSearch'] = this.voiceHashtags.getValue().trim();
            data['rssUrl'] = this.voiceRssfeed.getValue().trim();
            data['locationName'] = this.voiceLocation.getValue().trim();
            data['latitude'] = this.voiceLatitude.getValue().trim();
            data['longitude'] = this.voiceLongitude.getValue().trim();
            data['anonymously'] = this.checkAnon.isChecked();
            data['ownerId'] = this.voiceOwnershipDropdown.getValue();

            window.tmp = this;
            return data;
        },

        destroy : function destroy() {
            Events.off(this.buttonSend.el, 'click', this._sendFormHandlerRef);
            this._sendFormHandlerRef = null;

            if (this._autoGenerateSlug) {
                Events.off(this.voiceTitle.getInput(), 'keyup', this._generateSlughandlerRef);
                this._generateSlughandlerRef = null;

                Events.off(this.voiceSlug.getInput(), 'keyup', this._letFreeSlugRef);
                this._letFreeSlugRef = null;
            }

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});
