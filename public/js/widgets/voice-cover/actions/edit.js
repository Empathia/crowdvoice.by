/* globals App */
var Events = require('./../../../lib/events');

Class(CV, 'VoiceCoverActionsEdit').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : '-color-positive -mr1',
    HTML : '<a href="">Edit</a>',
    prototype : {
        voiceEntity : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler(ev) {
            ev.preventDefault();
            App.showCreateVoiceModal(this.voiceEntity);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            return null;
        }
    }
});
