var transitionEnd = require('./../../lib/ontransitionend');

Class(CV.UI, 'Modal').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-modal-container ui-modal',

    HTML : '\
        <div>\
            <div class="cv-modal">\
                <div class="header">\
                    <h3 class="title"></h3>\
                    <div class="line"></div>\
                    <svg class="close">\
                        <use xlink:href="#svg-close"></use>\
                    </svg>\
                </div>\
                <div class="body-wrapper">\
                    <div class="body -clear-after"></div>\
                </div>\
            </div>\
        </div>\
    ',

    prototype : {
        title : null,
        action : null,
        data : null,
        width : null,
        modalElement : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.modalElement = this.el.querySelector('.cv-modal');
            this.closeElement = this.el.querySelector('.close');

            this.appendChild(new this.action({
                data : this.data,
                name : 'bubbleAction',
            })).render(this.el.querySelector('.body'));

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            if (this.width) {
                this.modalElement.style.width = this.width + 'px';
            }

            this.dom.updateText(this.el.querySelector('.title'), this.title);
            return this;
        },

        _bindEvents : function _bindEvents() {
            var modal = this;
            this._destroyRef = this._beforeDestroyHandler.bind(this);

            this.closeElement.addEventListener('click', this._destroyRef);
            this.bubbleAction.bind('close', this._destroyRef);

            this.element.bind('click', function(e) {
                if (e.target !== this){
                    return;
                }
                modal._beforeDestroyHandler();
            });
        },

        _beforeDestroyHandler : function _beforeDestroyHandler() {
            this.deactivate();

            transitionEnd(this.modalElement, function() {
                this.destroy();
            }.bind(this));
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            this.closeElement.removeEventListener('click', this._destroyRef);
            this._destroyRef = this.closeElement = this.modalElement = this.el = null;
            return false;
        }
    }
});
