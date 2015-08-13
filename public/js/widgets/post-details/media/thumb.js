var Events = require('./../../../lib/events');

Class(CV, 'PostDetailMediaThumb').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="cv-post-detail-media__header-thumb -rel">\
            <div class="cv-post-detail-media__header-thumb-inner">\
                <img/>\
            </div>\
        </div>',

    PLAY_ICON_HTML : '\
        <div class="cv-post-detail-media__header-thumb-play-icon -abs -text-center">\
            <svg class="thumb-play-icon-svg -s12 -color-white">\
                <use xlink:href="#svg-play"></use>\
            </svg>\
        </div>',

    prototype : {
        data : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.imageElement = this.el.querySelector('img');
            this._image = new Image();

            this.dom.updateAttr('src', this.imageElement, this.data.postImages.small.url);
            this.dom.updateAttr('width', this.imageElement, this.data.imageMeta.small.width);
            this.dom.updateAttr('height', this.imageElement, this.data.imageMeta.small.height);

            if (this.data.sourceType === 'video') {
                this.el.insertAdjacentHTML('beforeend', this.constructor.PLAY_ICON_HTML);
            }

            this._bindEvents();
            this.dom.updateAttr('src', this._image, this.imageElement.src);
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);

            this._imageLoadHandlerRef = this._imageLoadHandler.bind(this);
            Events.on(this._image, 'load', this._imageLoadHandlerRef);
            Events.on(this._image, 'error', this._imageLoadHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            this.dispatch('click', {data: this.data});
        },

        _imageLoadHandler : function _imageLoadHandler() {
            this.dispatch('image:loaded');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            Events.off(this._image, 'load', this._imageLoadHandlerRef);
            Events.off(this._image, 'error', this._imageLoadHandlerRef);
            this._imageLoadHandlerRef = null;
            return null;
        }
    }
});

