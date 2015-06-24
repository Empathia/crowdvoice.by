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

        _resizeTimer : null,
        _resizeTime : 250,
        _listenScrollEvent : true,
        _lastScrollTop : 0,
        _scrollTimer : null,
        _scrollTime : 250,
        LAYER_CLASSNAME : 'cv-voice-posts-layer',

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
            data.postsCount = Voice.postsCountUnapproved;

            this.appendChild(
                new CV.VoicePostLayersModerateManager(data)
            ).render(this.el).setup().loadDefaultLayer();

            this.appendChild(
                new CV.VoiceModerateFooter({
                    name : 'footer',
                    totalPosts : 322
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

            this._scrollHandlerRef = this._scrollHandler.bind(this);
            this.el.addEventListener('scroll', this._scrollHandlerRef);

            this._resizeHandlerRef = this._resizeHandler.bind(this);
            this._window.addEventListener('resize', this._resizeHandlerRef);

            this._windowKeydownHandlerRef = this._windowKeydownHandler.bind(this);
            this._window.addEventListener('keydown', this._windowKeydownHandlerRef);

            return this;
        },

        /* Handle the scrollableArea scroll event.
         * @method _scrollHandler <private> [Function]
         */
        _scrollHandler : function _scrollHandler() {
            var st = this.el.scrollTop;
            var scrollingUpwards = (st < this._lastScrollTop);
            var y = 1;
            var el;

            if (!this._listenScrollEvent) return;

            if (!scrollingUpwards) y = this.layersManager._windowInnerHeight - 1;

            el = document.elementFromPoint(0, y);

            if (el.classList.contains(this.LAYER_CLASSNAME)) {
                if (el.dataset.date !== this.layersManager._currentMonthString) {
                    this.loadLayer(el.dataset.date, scrollingUpwards);
                }
            }

            this._lastScrollTop = st;

            if (this._scrollTimer) this._window.clearTimeout(this._scrollTimer);

            this._scrollTimer = this._window.setTimeout(function() {
                this.layersManager.loadImagesVisibleOnViewport();
            }.bind(this), this._scrollTime);
        },

        /* Handle the window resize event.
         * @method _resizeHandler <private> [Function]
         */
        _resizeHandler : function _resizeHandler() {
            var _this = this;

            if (this._resizeTimer) this._window.clearTimeout(this._resizeTimer);

            this._resizeTimer = this._window.setTimeout(function() {
                _this.layersManager.update();
            }, this._resizeTime);
        },

        /* Keydown handler, checks if the ESC key has been pressed to destroy the widget.
         * @method _windowKeydownHandler <private> [Function]
         */
        _windowKeydownHandler : function _windowKeydownHandler(ev) {
            var charCode = (typeof ev.which == 'number') ? ev.which : ev.keyCode;
            if (charCode === 27) this.destroy();
        },

        loadLayer : function loadLayer(dateString, scrollDirection) {
            this._listenScrollEvent = false;
            this.layersManager._beforeRequest(dateString, scrollDirection);
            this._listenScrollEvent = true;
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

            this.el.removeEventListener('scroll', this._scrollHandlerRef);
            this._scrollHandlerRef = null;

            this._window.removeEventListener('resize', this._resizeHandlerRef);
            this._resizeHandlerRef = null;

            this._window.removeEventListener('keydown', this._windowKeydownHandlerRef);
            this._windowKeydownHandlerRef = null;

            this.el = null;
            this._window = null;
            this._body = null;

            return null;
        }
    }
});
