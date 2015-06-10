Class(CV, 'PostCreator').inherits(Widget).includes(CV.WidgetUtils)({

    /* Creates a new instance of a specific PostCreator using the `type` prop passed.
     * @method create <static, public> [Function]
     * @return PostCreator[type] [Class] (undefined)
     */
    create : function create(config) {
        var type = config.type;

        if (!type) {
            console.warn('PostCreator, you need to pass a `type` prop.');
            return;
        }

        return new window.CV['PostCreator' + type](config);
    },

    prototype : {
        _window : null,
        _body : null,
        closeButton : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this._window = window;
            this._body = document.body;
        },

        /* Subscribe general events shared by any PostCreator.
         * To run this function you need to called from inside any PostCreator.
         * If the other PostCreator has a _bindEvents method too, call CV.PostCreator.prototype._bindEvents.call(this) instead.
         * @method _bindEvents <private> [Function]
         */
        _bindEvents : function _bindEvents() {
            this._windowKeydownHandlerRef = this._windowKeydownHandler.bind(this);
            this._window.addEventListener('keydown', this._windowKeydownHandlerRef);

            return this;
        },

        /* Adds the close icon and binds its events
         * @method addCloseButton <public> [Function]
         * @return [PostCreator]
         */
        addCloseButton : function addCloseButton() {
            this.el.insertAdjacentHTML('afterbegin', '<svg class="cv-post-creator__close -clickable"><use xlink:href="#svg-close"></use></svg>');
            this.closeButton = this.el.getElementsByClassName('cv-post-creator__close')[0];

            this._closeButtonClickHanderRef = this._closeButtonClickHander.bind(this);
            this.closeButton.addEventListener('click', this._closeButtonClickHanderRef);

            return this;
        },

        _windowKeydownHandler : function _windowKeydownHandler(ev) {
            var charCode = (typeof ev.which == 'number') ? ev.which : ev.keyCode;

            if (charCode === 27) { // ESC
                this.deactivate();
            }
        },

        /* Handles the click event on the close button
         * @method _closeButtonClickHander <private> [Function]
         */
        _closeButtonClickHander : function _closeButtonClickHander() {
            this.deactivate();
        },

        /* Handle the actions when a PostCreator gets `activated`. Disabled the body scroll.
         * @method _activate <private> [Function]
         */
        _activate : function _activate() {
            Widget.prototype._activate.call(this);

            this._body.style.overflow = 'hidden';
        },

        /* Handle the actions when a PostCreator gets `deactivated`. Enable the body scroll.
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

            if (this.closeButton) {
                this.closeButton.removeEventListener('click', this._closeButtonClickHanderRef);
                this._closeButtonClickHanderRef = null;
            }

            this._window = null;
            this._body = null;
            this.closeButton = null;

            return null;
        }
    }
});

