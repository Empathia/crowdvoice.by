Class(CV, 'TabNav').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="ui-tab menu-item -menu-tab -inline-block">\
            <p class="-font-bold"></p>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.dom.updateText(
                this.el.getElementsByTagName('p')[0],
                this.title
            );

            this._clickHandlerRef = this._clickHandler.bind(this);
            this.el.addEventListener('click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            this.dispatch('click');
        }
    }
});
