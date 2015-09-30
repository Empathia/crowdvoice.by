Class(CV, 'PostModerateRemoveButton').inherits(Widget).includes(BubblingSupport)({
    HTML : '\
        <button class="post-moderate-remove-btn cv-button primary tiny -abs">\
            <svg class="-s16">\
                <use xlink:href="#svg-trash"></use>\
            </svg>\
        </button>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this._bindEditEvents();
        },

        _bindEditEvents : function _bindEditEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this.el.addEventListener('click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            this.disable();
            this.dispatch('post:moderate:delete', {data: this});
        },

        _disable : function _disable() {
            Widget.prototype._disable.call(this);
            this.el.classList.add('-muted');
            this.el.setAttribute('disabled', true);
        },

        _enable : function _enable() {
            Widget.prototype._enable.call(this);
            this.el.classList.remove('-muted');
            this.el.removeAttribute('disabled');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el.removeEventListener('click', this._clickHandlerRef);
            this._clickHandlerRef = null;

            return null;
        }
    }
});
