/* jshint multistr: true */
Class(CV, 'VoiceModerateFooter').inherits(Widget)({
    HTML : '<footer class="voice-moderate-footer"></footer>',

    prototype : {

        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(
                new CV.VoiceModerateDoneButton({
                    name : 'button'
                })
            ).render(this.el);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._buttonClickHandlerRef = this._buttonClickHandler.bind(this);
            this.button.bind('click', this._buttonClickHandlerRef);

            return this;
        },

        _buttonClickHandler : function _buttonClickHandler() {
            this.dispatch('done');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this._buttonClickHandlerRef = null;
            this.el = null;

            return null;
        }
    }
});


