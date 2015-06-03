Class(CV, 'Header').inherits(Widget)({
    prototype : {

        el : null,
        scrollableArea : null,

        HEADER_HEIGHT : 80,
        _lastScrollTop : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element;

            // this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._scrollHandlerRef = this._scrollHandler.bind(this);
            this.scrollableArea.addEventListener('scroll', this._scrollHandlerRef);

            return this;
        },

        _scrollHandler : function _scrollHandler() {
            var y = this.scrollableArea.scrollTop;
            var scrollingUpwards = (y < this._lastScrollTop);

            if (y <= this.HEADER_HEIGHT) {
                this.el.style.transform = 'translateY(' + (-(y) + 'px') + ')';
                this._lastScrollTop = y;

                return;
            }

            if (scrollingUpwards) {
                if (this.el.classList.contains('show')) {
                    this._lastScrollTop = y;

                    return;
                }

                this.el.classList.add('show');
                this.el.classList.remove('hide');
            } else {
                if (this.el.classList.contains('hide')) {
                    this._lastScrollTop = y;

                    return;
                }

                this.el.classList.add('hide');
                this.el.classList.remove('show');
            }

            this._lastScrollTop = y;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
        }
    }
});
