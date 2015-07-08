/* jshint multistr: true */
Class(CV, 'SearchButton').inherits(Widget)({
    HTML : '\
    <button class="cv-button small rounded -p0">\
        <svg class="header-actions-svg header-search-svg -s14">\
            <use xlink:href="#svg-search"></use>\
        </svg>\
    </button>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.appendChild(
                new CV.Search({
                    name : 'search'
                })
            ).render(document.querySelector('main[role="main"]'));

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickElementRef = this.toggle.bind(this);
            this.el.addEventListener('click', this._clickElementRef);

            this.search.bind('close', this._clickElementRef);

            return this;
        },

        toggle : function toggle() {
            if (this.active) {
                this.deactivate();
                return false;
            }

            this.activate();
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this.search.activate();
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this.search.deactivate();
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.search.unbind('close', this._clickElementRef);

            this.el.removeEventListener('click', this._clickElementRef);
            this._clickElementRef = null;

            return null;
        }
    }
});
