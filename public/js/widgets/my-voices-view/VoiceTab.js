/* global App */
var Events = require('./../../lib/events');

Class(CV, 'MyVoicesTab').inherits(Widget)({
    prototype : {
        /* Flag to indicate if the content has already been rendered.
         * @property _rendered <private> [Boolean]
         */
        _rendered : false,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
        },

        /* Checks if the content is already rendered, if so it does nothing,
         * otherwise it will render the corrent content (onboarding or voices).
         * @method _update <private> [Function]
         * @return MyVoicesTab
         */
        _update : function _update() {
            if (this._rendered === true) {
                return this;
            }

            if (this.data.voices.length === 0) {
                return this._renderOnboardingMessage();
            }

            return this._renderVoices();
        },

        /* Renders the onboading message.
         * @method _renderOnboardingMessage <private> [Function]
         * @return MyVoicesTab
         */
        _renderOnboardingMessage : function _renderOnboardingMessage() {
            while(this.el.firstChild) {
                this.el.removeChild(this.el.firstChild);
            }

            this.el.insertAdjacentHTML('beforeend', '\
                <p class="onboarding-message">\
                    You have no '+ this.data.name +'. <a href="#">Create a Voice</a>.\
                </p>');

            Events.on(this.el.getElementsByTagName('a')[0], 'click', function(ev) {
                ev.preventDefault();
                App.showCreateVoiceModal();
            });

            this._rendered = true;
            return this;
        },

        /* Renders the voices.
         * @method _renderVoices <private> [Function]
         * @return MyVoicesTab
         */
        _renderVoices : function _renderVoices() {
            var fragment = document.createDocumentFragment();
            this.data.voices.forEach(function(voice, index) {
                this.appendChild(new CV.VoiceCoverMini({
                    name : 'voice_' + index,
                    className : 'my-voices-item-list',
                    data : voice
                })).addActions();
                fragment.appendChild(this['voice_' + index].el);
            }, this);

            this.el.appendChild(fragment);
            this._rendered = true;
            return this;
        },

        /* Calls the _update method everytime the tab is activated.
         * @inherithed from Widget
         * @method _activate <private> [Function]
         * @return undefined
         */
        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this._update();
        }
    }
});
