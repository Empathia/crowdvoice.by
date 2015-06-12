/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesDropdownOption').inherits(Widget)({

    ELEMENT_CLASS : 'from-sources-dropdown-option',

    HTML : '\
        <div>\
            <span class="from-sources-dropdown-option-label -font-semi-bold"></span>\
        </div>\
    ',

    ICON_HTML : '\
        <svg class="from-sources-dropdown-option-svg -s18 -color-grey-light">\
            <use xlink:href="#svg-{{ICON_ID}}"></use>\
        </svg>\
    ',

    prototype : {

        iconID : null,
        label : '',
        source : '',

        el : null,
        labelElement : null,
        iconElement : null,

        init : function init(config)  {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.labelElement = this.el.querySelector('.from-sources-dropdown-option-label');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            if (this.iconID) {
                this.el.insertAdjacentHTML('afterbegin', this.constructor.ICON_HTML.replace(/{{ICON_ID}}/, this.iconID));
                this.iconElement = this.el.querySelector('.from-sources-dropdown-option-svg');
            }

            this.labelElement.insertAdjacentHTML('beforeend', this.label);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this.el.addEventListener('click', this._clickHandlerRef);
            return this;
        },

        _clickHandler : function _clickHandler() {
            this.dispatch('click');
        },

        getIcon : function getIcon() {
            return this.iconElement;
        },

        getSource : function getSource() {
            return this.source;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el.removeEventListener('click', this._clickHandlerRef);
            this._clickHandlerRef = null;

            return null;
        }
    }
});
