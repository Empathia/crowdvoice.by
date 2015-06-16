/* jshint multistr: true */
Class(CV, 'VoiceModerate').inherits(Widget)({

    HTML : '\
    <button class="cv-button tiny primary -color-white ui-has-tooltip">\
        <svg class="voice-footer-svg">\
            <use xlink:href="#svg-moderate"></use>\
        </svg>\
        <span class="ui-tooltip -top-right -nw">Moderate Content</span>\
    </button>',

    prototype : {

        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this.el.addEventListener('click', this._clickHandlerRef);
            return this;
        },

        _clickHandler : function _clickHandler() {
            if (this.moderateManager) this.moderateManager.destroy();

            this.appendChild(
                new CV.VoiceModerateManager({
                    name : 'moderateManager'
                })
            ).render(document.body);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el.removeEventListener('click', this._clickHandlerRef);
            this._clickHandlerRef = null;

            this.el = null;
        }
    }
});
