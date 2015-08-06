/* @usage
 * new CV.Alert({
 *      text : 'Notification message'
 * }).render(...);
 */
Class(CV, 'Alert').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-alert',
    HTML : '\
        <div>\
            <div class="cv-alert__info">\
                <span class="cv-alert__info-text"></span>\
            </div>\
            <div class="cv-alert__close -clickable -abs -full-height">\
                <svg class="-s9">\
                    <use xlink:href="#svg-close"></use>\
                </svg>\
            </div>\
        </div>',

    HTML_CHECKMARK_ICON : '<svg class="cv-alert__info-svg -s14"><use xlink:href="#svg-checkmark"></use></svg>',
    HTML_WARING_ICON : '<svg class="cv-alert__info-svg -s14"><use xlink:href="#svg-warning"></use></svg>',

    prototype : {
        /* @property type <optional> [String] (default: 'info') ['positive', 'warning', 'negative']
         */
        type : 'info',
        text : '',
        html : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.infoElement = this.el.querySelector('.cv-alert__info');
            this.textElement = this.el.querySelector('.cv-alert__info-text');
            this.closeElement = this.el.querySelector('.cv-alert__close');

            this._setup().update(this.text, this.html)._bindEvents();
        },

        _setup : function _setup() {
            this.el.classList.add('-' + this.type);
            if (this.type === "positive") {
                this.infoElement.insertAdjacentHTML('afterbegin', this.constructor.HTML_CHECKMARK_ICON);
            }

            if (this.type === "warning" || this.type === "negative") {
                this.infoElement.insertAdjacentHTML('afterbegin', this.constructor.HTML_WARING_ICON);
            }

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this.closeElement.addEventListener('click', this._clickHandlerRef);
            return this;
        },

        /* Updates the main text displayed.
         * @method update <public> [Function]
         */
        update : function update(text, html) {
            if ( this.html ) {
                this.textElement.innerHTML = html;
            } else {
                this.dom.updateText(this.textElement, text);
            }
            return this;
        },

        /* Handle the click on the far-right close icon.
         * Clicking that icon will call the destroy method of the widget.
         */
        _clickHandler : function _clickHandler() {
            this.dispatch('destroyed');
            this.destroy();
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            this.closeElement.removeEventListener('click', this._clickHandlerRef);
            this._clickHandlerRef = null;

            this.el = this.closeElement = this.type = this.text = null;
            return null;
        }
    }
});
