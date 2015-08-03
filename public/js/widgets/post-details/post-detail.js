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
            this.el.insertAdjacentHTML('afterbegin', '<svg class="cv-post-creator__close -clickable"><use xlink:href="#svg-close"></use></svg>');
            this.closeButton = this.el.getElementsByClassName('cv-post-creator__close')[0];

            this._closeButtonClickHanderRef = this._closeButtonClickHander.bind(this);
            Events.on(this.closeButton, 'click', this._closeButtonClickHanderRef);

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
            Events.off(this.closeButton, 'click', this._closeButtonClickHanderRef);
            this._windowKeydownHandlerRef = null;
            this._closeButtonClickHanderRef = null;
            return null;
        }
    }
});
