Class(CV, 'VoiceHeader').inherits(Widget)({
    prototype : {

        el : null,
        footerVoiceTitle : null,
        scrollableArea : window,

        HEADER_HEIGHT : 74,
        DELTA : 5,
        _lastScrollTop : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element;

            this._bindEvents();
        },

        /* Subscribe to the scroll event to show/hide the header nav.
         * @method _bindEvents <private> [Function]
         * @return [CV.Header]
         */
        _bindEvents : function _bindEvents() {
            this._scrollHandlerRef = this._scrollHandler.bind(this);
            this.scrollableArea.addEventListener('scroll', this._scrollHandlerRef);

            return this;
        },

        /* Handle the scroll event.
         * @method _scrollHandler <private> [Function]
         */
        _scrollHandler : function _scrollHandler() {
            var y = this.scrollableArea.scrollY;
            var scrollingDown = (y > this._lastScrollTop);

            if (Math.abs(this._lastScrollTop - y) <= this.DELTA) {
                return;
            }

            if (scrollingDown && y > this.HEADER_HEIGHT) {
                this.el.classList.add('hide');
                this.footerVoiceTitle.classList.add('active');
                this._lastScrollTop = y;
                return;
            }

            if (y + this.scrollableArea.innerHeight < document.height || document.body.clientHeight) {
                this.el.classList.remove('hide');
                this.footerVoiceTitle.classList.remove('active');
                this._lastScrollTop = y;
            }
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.scrollableArea.removeEventListener('scroll', this._scrollHandlerRef);
            this._scrollHandlerRef = null;
        }
    }
});
