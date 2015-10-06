/* globals App */
var Events = require('./../../../lib/events');

Class(CV, 'VoiceCoverActionsEdit').inherits(CV.UI.Button)({
    ELEMENT_CLASS : 'cv-button micro -color-positive -mr1',
    prototype : {
        voiceEntity : null,

        init : function init(config) {
            CV.UI.Button.prototype.init.call(this, config);
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            App.showCreateVoiceModal(this.voiceEntity);
        },

        destroy : function destroy() {
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            CV.UI.Button.prototype.destroy.call(this);
            return null;
        }
    }
});
