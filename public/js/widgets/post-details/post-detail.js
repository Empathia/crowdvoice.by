var Events = require('./../../lib/events');

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
            Events.on(this._window, 'keydown', this._windowKeydownHandlerRef);
            return this;
        },

        /* Adds the close icon and binds its events
         * @method addCloseButton <protected> [Function]
         * @return [PostCreator]
         */
        addCloseButton : function addCloseButton() {
            this.appendChild(new CV.UI.Close({
                name : 'closeButton',
                className : 'ui-close-button__overlays -abs',
                svgClassName : '-s18 -color-white'
            })).render(this.el, this.el.firstElementChild);

            this._closeButtonClickHanderRef = this._closeButtonClickHander.bind(this);
            this.closeButton.bind('click', this._closeButtonClickHanderRef);

            return this;
        },

        /* Handles the click event on the close button
         * @method _closeButtonClickHander <private> [Function]
         */
        _closeButtonClickHander : function _closeButtonClickHander() {
            this.deactivate();
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
            Events.off(this._window, 'keydown', this._windowKeydownHandlerRef);
            this._windowKeydownHandlerRef = null;
            return null;
        }
    }
});
