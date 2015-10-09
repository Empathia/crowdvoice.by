var API = require('./../../lib/api');

Class(CV, 'UserProfileVoicesTab').inherits(Widget)({
    HTML : '\
        <div>\
            <h2 class="profile-subheading -font-bold -m0">Voices</h2>\
            <hr>\
            <div data-container class="responsive-width-voice-covers -rel"></div>\
        </div>',

    NO_CONTENT_MESSAGE : '\
        <div class="-text-center -pt5" style="font-size: 14px">\
            @{profileName} hasn’t created voices yet.\
        </div>',

    prototype : {
        _fetching : false,
        _fetched : false,

        /* Holds the ResponsiveWidth instance reference.
         * @property _responsiveWidth <private>
         */
        _responsiveWidth : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.containerElement = this.el.querySelector('[data-container]');

            this.loader = new CV.Loader().render(this.containerElement);
        },

        fetch : function fetch() {
            if ((this._fetching === true) || (this._fetched === true)) {
                return;
            }

            this._fetching = true;
            console.time('vr');
            console.log('%cvoices request', 'color: red');
            API.getEntityVoices({
                profileName : this.data.entity.profileName,
            }, this._handleFetchResults.bind(this));
        },

        _handleFetchResults : function _handleFetchResults(err, res) {
            this._fetching = false;

            if (err) {
                console.log(err);
                return;
            }

            this._fetched = true;
            this._renderResults(res);
        },

        _renderResults : function _renderResults(voices) {
            this.parent.parent.nav.updateCounter(voices.length);

            if (voices.length) {
                voices.forEach(function(voice, index) {
                    this.appendChild(new CV.VoiceCover({
                        name : 'voice_' + index,
                        data : voice
                    })).render(this.containerElement);
                }, this);

                this._responsiveWidth = new CV.ResponsiveWidth({
                    container : this.containerElement,
                    items : this.children.map(function(ch) {return ch.el;}),
                    minWidth : 300
                }).setup();
            } else {
                this.containerElement.insertAdjacentHTML('beforeend', this.constructor.NO_CONTENT_MESSAGE.replace(/{profileName}/, this.data.entity.profileName));
            }

            this.loader.disable();

            console.timeEnd('vr');
            console.log('%cvoices rendered', 'color: red');
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            if ((this._fetching === false) && (this._fetched === false)) {
                return this.fetch();
            }

            this._responsiveWidth && this._responsiveWidth.update();
        }
    }
});
