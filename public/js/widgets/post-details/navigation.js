Class(CV, 'PostDetailNavigation').inherits(Widget).includes(CV.WidgetUtils, BubblingSupport)({
    ELEMENT_CLASS : 'cv-post-detail__header-navigation',
    HTML : '\
        <div>\
            <button data-prev class="-clickable">\
                <svg class="-s20">\
                    <use xlink:href="#svg-arrow-left"></use>\
                </svg>\
            </button>\
            <button data-next class="-clickable">\
                <svg class="-s20">\
                    <use xlink:href="#svg-arrow-right"></use>\
                </svg>\
            </button>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.prevButton = this.el.querySelector('[data-prev]');
            this.nextButton = this.el.querySelector('[data-next]');
            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._prevHandlerRef = this._prevHandler.bind(this);
            this.prevButton.addEventListener('click', this._prevHandlerRef);
            this._nextHandlerRef = this._nextHandler.bind(this);
            this.nextButton.addEventListener('click', this._nextHandlerRef);
        },

        _prevHandler : function _prevHandler() {
            this.dispatch('post:details:prev');
        },

        _nextHandler : function _nextHandler() {
            this.dispatch('post:details:next');
        }
    }
});
