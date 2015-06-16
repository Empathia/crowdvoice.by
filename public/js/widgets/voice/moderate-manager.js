/* jshint multistr: true */
Class(CV, 'VoiceModerateManager').inherits(Widget).includes(CV.VoiceHelper, NodeSupport)({
    HTML : '\
        <div class="voice-moderate-wrapper">\
            <div class="voice-posts"></div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._renderHandlerRef = this._renderHandler.bind(this);
            this.bind('render', this._renderHandlerRef);

            this._destroyHandlerRef = this._destroyHandler.bind(this);
            this.bind('destroy', this._destroyHandlerRef);

            return this;
        },

        _renderHandler : function _renderHandler() {
            document.body.style.overflow = 'hidden';
        },

        _destroyHandler : function _destroyHandler() {
            document.body.style.overflow = '';
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.unbind('render', this._renderHandlerRef);
            this._renderHandlerRef = null;

            this.unbind('destroy', this._destroyHandlerRef);
            this._destroyHandlerRef = null;

            return null;
        }
    }
});
