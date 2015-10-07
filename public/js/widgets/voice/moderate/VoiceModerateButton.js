/* globals App */
Class(CV, 'VoiceModerateButton').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
    <button class="cv-button tiny ui-has-tooltip">\
        <svg class="voice-footer-svg">\
            <use xlink:href="#svg-moderate"></use>\
        </svg>\
        <span class="ui-tooltip -bottom-right -nw">Moderate Content</span>\
    </button>',

    prototype : {
        el : null,
        allowPostEditing : false,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            if (App.Voice.postsCountUnapproved.length) {
                this._bindEvents();
            } else {
                this.disable();
            }
        },

        /* Subscribes to the button click event
         * @method _bindEvents <private>
         */
        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this.el.addEventListener('click', this._clickHandlerRef);
            return this;
        },

        /* Button click handler. It creates a new instance of VoiceModerateManager
         * @method _clickHandler <private> [Function]
         */
        _clickHandler : function _clickHandler() {
            if (this.moderateManager) {
                this.moderateManager = this.moderateManager.destroy();
            }

            this.appendChild(new CV.VoiceModerateManager({
                name : 'moderateManager',
                allowPostEditing : this.allowPostEditing
            })).render(document.body).setup();
        },

        disable : function(){
            Widget.prototype.disable.call(this);
            this.dom.updateAttr('disabled', this.el, true);
            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el.removeEventListener('click', this._clickHandlerRef);
            this._clickHandlerRef = null;

            this.el = null;

            return null;
        }
    }
});
