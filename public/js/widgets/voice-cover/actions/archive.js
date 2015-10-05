/* Globals App */
var Events = require('./../../../lib/events');
var API = require('./../../../lib/api');

Class(CV, 'VoiceCoverActionsArchive').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : '-color-positive -mr1',
    HTML : '<a href="">Archive</a>',
    prototype : {
        voiceEntity : null,
        init : function init (config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler(ev){
            ev.preventDefault();

            API.voiceArchive({                 
                profileName : this.voiceEntity.owner.profileName,
                voiceSlug : this.voiceEntity.slug
            },this._ResponseHandler.bind(this));
        },

        _ResponseHandler : function _ResponseHandler (err, res){
            console.log(res);
        },

        destroy : function destroy(){
            Widget.prototype.destroy.call(this);
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;

            return null;
        }
    }
});