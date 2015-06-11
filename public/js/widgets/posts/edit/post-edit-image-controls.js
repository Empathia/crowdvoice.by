/* jshint multistr: true */
Class(CV, 'PostEditImageControls').inherits(Widget)({
    HTML : '\
        <div class="post-edit-image-controls">\
            <div class="post-edit-images-nav ui-btn-group">\
                <button class="images-nav-prev ui-btn -color-bg-white -color-grey -sm">\
                    <svg class="post-edit-images-nav-svg">\
                        <use xlink:href="#svg-arrow-left"></use>\
                    </svg>\
                </button>\
                <button class="images-nav-next ui-btn -color-bg-white -color-grey -sm">\
                    <svg class="post-edit-images-nav-svg">\
                        <use xlink:href="#svg-arrow-right"></use>\
                    </svg>\
                </button>\
            </div>\
            <button class="image-remove ui-btn -color-bg-white -color-grey -sm">\
                Remove\
            </button>\
        </div>\
    ',

    prototype : {
        images : null,

        _imagesLen : 0,
        prevButton : null,
        nextButton : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.imagesNav = this.el.querySelector('.post-edit-images-nav');
            this.imageRemove = this.el.querySelector('.image-remove');
            this._imagesLen = this.images.length - 1;

            if (this._imagesLen > 1) {
                this.imagesNav.classList.add('active');
                this.prevButton = this.el.querySelector('.images-nav-prev');
                this.nextButton = this.el.querySelector('.images-nav-next');
            }

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._removeImageClickHandlerRef = this._removeImageClickHandler.bind(this);
            this.imageRemove.addEventListener('click', this._removeImageClickHandlerRef);

            if (this._imagesLen > 1) {
                this._prevClickHandlerRef = this._prevClickHandler.bind(this);
                this.prevButton.addEventListener('click', this._prevClickHandlerRef);

                this._nextClickHandlerRef = this._nextClickHandler.bind(this);
                this.nextButton.addEventListener('click', this._nextClickHandlerRef);
            }
        },

        _prevClickHandler : function _prevClickHandler(ev) {
            ev.stopPropagation();
            this.dispatch('prevImage');
        },

        _nextClickHandler : function _nextClickHandler(ev) {
            ev.stopPropagation();
            this.dispatch('nextImage');
        },

        _removeImageClickHandler : function _removeImageClickHandler(ev) {
            ev.stopPropagation();
            this.dispatch('removeImages');
        }
    }
});
