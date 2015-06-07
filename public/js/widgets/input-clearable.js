/* jshint multistr: true */
Class(CV, 'InputClearable').inherits(Widget).includes(CV.WidgetUtils)({

    ELEMENT_CLASS : 'cv-input-clearable',

    HTML : '\
    <div>\
        <input class="ui-input" placeholder=""/>\
        <svg class="cv-input-clearable__clear -abs -clickable">\
            <use xlink:href="#svg-circle-x"></use>\
        </svg>\
    </div>\
    ',

    ACTIVE_CLASSNAME : 'active',

    prototype : {

        placeholder : '',
        inputClass : '',

        el : null,
        clearButton : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.inputElement = this.el.getElementsByTagName('input')[0];
            this.clearButton = this.el.querySelector('.' + this.constructor.ELEMENT_CLASS + '__clear');

            this._autoSetup()._bindEvents();
        },

        _autoSetup : function _autoSetup() {
            if (this.placeholder) {
                this.dom.updateAttr('placeholder', this.inputElement, this.placeholder);
            }

            if (this.inputClass) {
                this.inputClass.split(' ').forEach(function(className) {
                    this.inputElement.classList.add(className);
                }, this);
            }

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._keyDownHandlerRef = this._keyDownHandler.bind(this);
            this.inputElement.addEventListener('keyup', this._keyDownHandlerRef);

            this._clearClickHandlerRef = this._clearClickHandler.bind(this);
            this.clearButton.addEventListener('click', this._clearClickHandlerRef);

            return this;
        },

        _keyDownHandler : function _keyDownHandler() {
            var x = this.getValue() ? 'add' : 'remove';

            this.clearButton.classList[x](this.constructor.ACTIVE_CLASSNAME);
        },

        _clearClickHandler : function _clearClickHandler() {
            this.inputElement.value = "";
            this.clearButton.classList.remove(this.constructor.ACTIVE_CLASSNAME);
            this.inputElement.focus();
        },

        /* Returns the value of the input element
         * @method getValue <public> [Function]
         * @return this.inputElement.value [String]
         */
        getValue : function getValue() {
            return this.inputElement.value;
        },

        /* Returns the inputElement
         * @method getElement <public> [Function]
         * @return this.inputElement
         */
        getElement : function getElement() {
            return this.inputElement;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.inputElement.addEventListener('keyup', this._keyDownHandlerRef);
            this._keyDownHandlerRef = null;

            this.clearButton.addEventListener('click', this._clearClickHandlerRef);
            this._clearClickHandlerRef = null;

            this.placeholder = null;
            this.inputClass = null;

            this.el = null;
            this.clearButton = null;

            return null;
        }
    }
});
