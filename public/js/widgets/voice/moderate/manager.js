/* jshint multistr: true */

/* Handles the modetate window ui. Uses VoicePostLayersManager to create the layers and fill them with posts.
 */
Class(CV, 'VoiceModerateManager').inherits(Widget)({
    HTML : '<div class="voice-moderate-wrapper"></div>',

    prototype : {

        el : null,
        layersManager : null,
        _window : null,
        _body : null,
        /* socket io instance holder */
        _socket : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._window = window;
            this._body = document.body;
        },

        /* Public method to start the thing after being rendered.
         */
        setup : function setup() {
            var data = {
                name : 'layersManager',
                scrollableArea : this.el,
                _socket : Voice._socket
            };
            Object.keys(voiceInfo).forEach(function(propertyName) {
                data[propertyName] = voiceInfo[propertyName];
            });
            data.postsCount = Voice.postsCount;

            this.appendChild(
                new CV.VoicePostLayersManager(data)
            ).render(this.el).setup().loadDefaultLayer();

            this.appendChild(
                new CV.VoiceModerateFooter({
                    name : 'footer'
                })
            ).render(this.el);

            return this._bindEvents();
        },

        /* Subscribe the event handlers.
         * - footer done custom event
         * - ESC to close the widget
         */
        _bindEvents : function _bindEvents() {
            this.footer.bind('done', this.destroy.bind(this));

            this._windowKeydownHandlerRef = this._windowKeydownHandler.bind(this);
            this._window.addEventListener('keydown', this._windowKeydownHandlerRef);

            return this;
        },

        /* Keydown handler, checks if the ESC key has been pressed to destroy the widget.
         * @method _windowKeydownHandler <private> [Function]
         */
        _windowKeydownHandler : function _windowKeydownHandler(ev) {
            var charCode = (typeof ev.which == 'number') ? ev.which : ev.keyCode;
            if (charCode === 27) this.destroy();
        },

        /* Render method to remove scrollbars from body. It does not override Widget's render method.
         * @method render <public> [Function]
         * @return this
         */
        render : function render(element, beforeElement) {
            Widget.prototype.render.call(this, element, beforeElement);

            this._body.style.overflow = 'hidden';

            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this._body.style.overflow = '';

            this._window.addEventListener('keydown', this._windowKeydownHandlerRef);
            this._windowKeydownHandlerRef = null;

            this.el = null;
            this._window = null;
            this._body = null;

            return null;
        }
    }
});
