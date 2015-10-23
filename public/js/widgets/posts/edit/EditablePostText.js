Class(CV, 'EditablePostText').inherits(CV.PostText).includes(CV.EditablePost)({
    prototype : {
        _renderHandlerRef : null,

        init : function init(config) {
            CV.PostText.prototype.init.call(this, config);

            this._renderHandlerRef = this._renderHandler.bind(this);
            this.bind('render', this._renderHandlerRef);
        },

        _renderHandler : function _renderHandler() {
            this.setup();
        },

        destroy : function destroy() {
            this.unbind('render', this._renderHandlerRef);
            this._renderHandlerRef = null;

            this.el.parentElement.removeChild(this.el);

            CV.PostText.prototype.destroy.call(this);
            return null;
        }
    }
});
