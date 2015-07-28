Class(CV, 'PostDetail').inherits(Widget).includes(CV.WidgetUtils, BubblingSupport)({
    create : function create(config) {
        var type = this.prototype.format.capitalizeFirstLetter(config.data.sourceType);
        return new window.CV['PostDetail' + type](config);
    },

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._window = window;
            this._body = document.body;
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

        /* Handle the actions when a PostDetail gets `activated`. Disabled the body scroll.
         * @method _activate <private> [Function]
         */
        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this._body.style.overflow = 'hidden';
        },

        /* Handle the actions when a PostDetail gets `deactivated`. Enable the body scroll.
         * @method _deactivate <private> [Function]
         */
        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this._body.style.overflow = '';
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            this._window.removeEventListener('keydown', this._windowKeydownHandlerRef);
            this._windowKeydownHandlerRef = null;
            this._window = this._body = null;
            return null;
        }
    }
});
