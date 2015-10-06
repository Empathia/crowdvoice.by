var Events = require('./../../lib/events');
var transitionEnd = require('./../../lib/ontransitionend');

Class(CV.UI, 'Modal').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-modal-container ui-modal',

    HTML : '\
        <div>\
            <div class="cv-modal__backdrop"></div>\
            <div class="cv-modal__inner">\
                <div class="cv-modal">\
                    <div class="header">\
                        <h3 class="title"></h3>\
                        <div class="line"></div>\
                    </div>\
                    <div class="body-wrapper">\
                        <div class="body -clear-after"></div>\
                    </div>\
                </div>\
            </div>\
        </div>',

    prototype : {
        title : null,
        action : null,
        data : null,
        width : null,
        modalElement : null,
        isAdmin : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.innerElement = this.el.querySelector('.cv-modal__inner');
            this.modalElement = this.el.querySelector('.cv-modal');

            this.appendChild(new this.action({
                data : this.data,
                name : 'bubbleAction',
                isAdmin : this.isAdmin
            })).render(this.el.querySelector('.body'));

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new CV.UI.Close({
                name : 'closeButton',
                className : '-abs -color-bg-white',
                svgClassName : '-s16'
            })).render(this.el.querySelector('.header'));

            if (this.width) {
                this.modalElement.style.width = this.width + 'px';
            }

            this.dom.updateText(this.el.querySelector('.title'), this.title);
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._destroyRef = this._beforeDestroyHandler.bind(this);
            this._clickHandlerRef = this._clickHandler.bind(this);

            this.bubbleAction.bind('close', this._destroyRef);
            Events.on(this.innerElement, 'click', this._clickHandlerRef);
            this.closeButton.bind('click', this._destroyRef);
            return this;
        },

        _clickHandler : function _clickHandler(ev) {
            if (ev.target === this.innerElement) {
                return this._beforeDestroyHandler();
            }
        },

        _beforeDestroyHandler : function _beforeDestroyHandler() {
            this.deactivate();
            transitionEnd(this.modalElement, function() {
                this.destroy();
            }.bind(this));
        },

        destroy : function destroy() {
            Events.off(this.innerElement, 'click', this._clickHandlerRef);
            this._destroyRef = this.modalElement = this.el = null;
            Widget.prototype.destroy.call(this);
            return false;
        }
    }
});
