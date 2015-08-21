/* bind `results:item:clicked`
 */
var Events = require('./../../lib/events');

Class(CV.UI, 'InputButton').inherits(Widget).includes(CV.WidgetUtils, BubblingSupport)({
    HTML : '\
        <div class="ui-form-field cv-input-search ">\
            <div data-container class="-clearfix -rel"></div>\
        </div>',

    LABEL_HTML : '\
        <label class="-block">\
            <span class="ui-input__label -upper -font-bold"></span>\
            <span class="cv-caption"></span>\
        </label>',

    prototype : {
        data : {
            label : '',
            hint : ''
        },
        inputData : {},
        buttonData : {},

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.containerElement = this.el.querySelector('[data-container]');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new CV.UI.Button({
                name : 'button',
                className : '-float-right -m0 -brtl0 -brbl0 ' + this.buttonData.className,
                value : this.buttonData.value || 'Submit'
            })).render(this.containerElement);

            this.appendChild(new CV.UI.Input({
                name : 'input',
                className : '-overflow-hidden -mb -mb0',
                data : {
                    inputClassName : '-lg -block -btrr0 -bbrr0',
                    placeholder : this.inputData.placeholder
                }
            })).render(this.containerElement);

            this.appendChild(new CV.UI.InputButtonResults({
                name : 'results'
            })).render(this.el);

            if (this.data.label || this.data.hint) {
                this.el.insertAdjacentHTML('afterbegin', this.constructor.LABEL_HTML);
                this.dom.updateText(this.el.getElementsByClassName('ui-input__label')[0], this.data.label);
                this.dom.updateText(this.el.getElementsByClassName('cv-caption')[0], this.data.hint);
            }

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._inputKeyDownHandlerRef = this._inputKeyDownHandler.bind(this);
            Events.on(this.input.el, 'keyup', this._inputKeyDownHandlerRef);
        },

        _inputKeyDownHandler : function _inputKeyDownHandler(ev) {
            if (ev.which === 40) { // keydown
                return this.results.selectNext();
            }

            if (ev.which === 38) { // keyup
                return this.results.selectPrev();
            }

            if (ev.which === 13) { // enter
                var selected = this.results.getSelectedElement();
                if (selected) {
                    selected.click();
                }
            }
        }
    }
});
