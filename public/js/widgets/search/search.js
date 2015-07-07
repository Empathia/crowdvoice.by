/* jshint multistr: true */
Class(CV, 'Search').inherits(Widget)({
    ELEMENT_CLASS : 'cv-search-overlay',

    HTML : '\
        <div>\
            <header class="cv-search-overlay__header">\
                <p>Type in what you’re looking for and press enter to search.</p>\
                <svg class="cv-search-overlay__close -clickable -s18 -abs">\
                    <use xlink:href="#svg-close"></use>\
                </svg>\
            </header>\
            <div class="cv-search-overlay__input"></div>\
            <div class="cv-search-overlay__results"></div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._body = document.body;
            this.inputWrapper = this.el.querySelector('.cv-search-overlay__input');
            this.resultsWrapper = this.el.querySelector('.cv-search-overlay__results');
            this.closeElement = this.el.querySelector('.cv-search-overlay__close');

            this.appendChild(
                new CV.InputClearable({
                    name : 'input',
                    placeholder : 'Search...',
                    inputClass : '-block -lg -br0'
                })
            ).render(this.inputWrapper);

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._closeElementClickHandlerRef = this._closeElementClickHandler.bind(this);
            this.closeElement.addEventListener('click', this._closeElementClickHandlerRef);
            return this;
        },

        _closeElementClickHandler : function _closeElementClickHandler() {
            this.dispatch('close');
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this._body.style.overflow = 'hidden';
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this._body.style.overflow = '';
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.closeElement.removeEventListener('click', this._closeElementClickHandlerRef);
            this._closeElementClickHandlerRef = null;

            return null;
        }
    }
});
