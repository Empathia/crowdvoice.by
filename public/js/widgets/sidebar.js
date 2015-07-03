Class(CV, 'Sidebar').inherits(Widget)({

    IS_EXPANDED_CLASSNAME : '-is-expanded',
    IS_PAUSED_CLASSNAME : '-is-paused',

    prototype : {

        el : null,
        _body : null,
        _yield : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element;
            this._body = document.body;
            this._yield = this._body.querySelector('.yield');

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._mouseEnterHandlerRef = this._mouseEnterHandler.bind(this);
            this.el.addEventListener('mouseenter', this._mouseEnterHandlerRef);

            this._mouseLeaveHandlerRef = this._mouseLeaveHandler.bind(this);
            this.el.addEventListener('mouseleave', this._mouseLeaveHandlerRef);
        },

        _mouseEnterHandler : function _mouseEnterHandler() {
            this._body.style.overflow = 'hidden';
            this._yield.classList.add(this.constructor.IS_PAUSED_CLASSNAME);
            this.el.classList.add(this.constructor.IS_EXPANDED_CLASSNAME);
        },

        _mouseLeaveHandler : function _mouseLeaveHandler() {
            this._body.style.overflow = '';
            this._yield.classList.remove(this.constructor.IS_PAUSED_CLASSNAME);
            this.el.classList.remove(this.constructor.IS_EXPANDED_CLASSNAME);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el.removeEventListener('mouseenter', this._mouseEnterHandlerRef);
            this._mouseEnterHandlerRef = null;

            this.el.removeEventListener('mouseleave', this._mouseLeaveHandlerRef);
            this._mouseLeaveHandlerRef = null;

            this.el = null;
            this._body = null;
            this._yield = null;

            return null;
        }
    }
});
