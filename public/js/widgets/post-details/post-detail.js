Class(CV, 'PostDetail').inherits(Widget).includes(CV.WidgetUtils, BubblingSupport)({
    create : function create(config) {
        var type = this.prototype.format.capitalizeFirstLetter(config.data.sourceType);
        return new window.CV['PostDetail' + type](config);
    },

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._window = window;
        },

        /* Subscribe general events shared by any PostDetail
         * @method _bindEvents <private> [Function]
         */
        _bindEvents : function _bindEvents() {
            this._windowKeydownHandlerRef = this._windowKeydownHandler.bind(this);
            this._window.addEventListener('keydown', this._windowKeydownHandlerRef);
            return this;
        },

        /* Keydown handler.
         * @method _windowKeydownHandler <private> [Function]
         */
        _windowKeydownHandler : function _windowKeydownHandler(ev) {
            var charCode = (typeof ev.which === 'number') ? ev.which : ev.keyCode;
            if (charCode === 27) { // ESC
                this.deactivate();
            }
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            this._window.removeEventListener('keydown', this._windowKeydownHandlerRef);
            this._windowKeydownHandlerRef = null;
            this._window = null;
            return null;
        }
    }
});
