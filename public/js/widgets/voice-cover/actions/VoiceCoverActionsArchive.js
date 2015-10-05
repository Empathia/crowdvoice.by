/* Globals App */
var Events = require('./../../../lib/events');
var API = require('./../../../lib/api');

Class(CV, 'VoiceCoverActionsArchive').inherits(CV.UI.Button)({
    ELEMENT_CLASS : 'cv-button micro -color-negative -mr1',
    prototype : {
        voiceEntity : null,
        init : function init (config){
            CV.UI.Button.prototype.init.call(this, config);
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler(){
            this.disable();

            API.voiceArchive({
                profileName : this.voiceEntity.owner.profileName,
                voiceSlug : this.voiceEntity.slug
            }, this._responseHandler.bind(this));
        },

        _responseHandler : function _responseHandler (err, res){
            this.enable();

            if (err) {
                this.dom.updateHTML(this.el, 'Archive (' + res.status + ' ' + res.statusText + ')');
                return;
            }

            this.dom.updateHTML(this.el, 'Archived');
        },

        destroy : function destroy(){
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            CV.UI.Button.prototype.destroy.call(this);
            return null;
        }
    }
});
