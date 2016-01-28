Class(CV, 'EditablePostTweet').inherits(CV.PostTweet).includes(CV.EditablePost)({
  prototype: {
    init: function init(config) {
      CV.PostTweet.prototype.init.call(this, config);
      this._renderHandlerRef = this._renderHandler.bind(this);
      this.bind('render', this._renderHandlerRef);
    },

    _renderHandler : function _renderHandler() {
      this.setup();
    },

    destroy: function destroy() {
      this.unbind('render', this._renderHandlerRef);
      this._renderHandlerRef = null;
      this.el.parentElement.removeChild(this.el);
      CV.PostTweet.prototype.destroy.call(this);
      return null;
    }
  }
});
