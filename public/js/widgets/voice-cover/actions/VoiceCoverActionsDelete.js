var Events = require('./../../../lib/events');
var API = require('./../../../lib/api');

Class(CV, 'VoiceCoverActionsDelete').inherits(CV.UI.Button)({
    ELEMENT_CLASS : 'cv-button tiny -color-negative -mr1',
    prototype : {
        voiceEntity : null,
        init : function init (config){
            CV.UI.Button.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        _setup: function _setup(){
            this.appendChild(new CV.PopoverConfirm({
                name : 'confirmPopover',
                data : {
                    confirm : {
                        label : 'Delete Voice',
                        className : '-color-negative'
                    }
                }
            }));

            this.appendChild(new CV.PopoverBlocker({
                name : 'popover',
                className : 'delete-voice-popover  -text-left -nw',
                placement : 'left',
                content : this.confirmPopover.el
            }));

            return this;
        },

        _bindEvents: function _bindEvents(){
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);

            this._popOverConfirmClickHandlerRef = this._popOverConfirmClickHandler.bind(this);
            this.confirmPopover.bind('confirm', this._popOverConfirmClickHandlerRef);

            this._popOverCancelClickHandlerRef = this._popOverCancelClickHandler.bind(this);
            this.confirmPopover.bind('cancel', this._popOverCancelClickHandlerRef);

            return this;
        },

        _clickHandler : function _clickHandler(ev){
            ev.stopPropagation();
            this.popover.render(ev.currentTarget).activate();
        },

        /* Handles the popover 'cancel' custom event.
         * Just close the popover.
         * @method _popOverCancelClickHandler <private> [Function]
         * @return undefined
         */
        _popOverCancelClickHandler : function _popOverCancelClickHandler(ev) {
            ev.stopPropagation();
            this.popover.deactivate();
        },

        /* Handles the popover 'confirm' custom event.
         * @method _popOverConfirmClickHandler <private> [Function]
         * @return undefined
         */
        _popOverConfirmClickHandler : function _popOverConfirmClickHandler(ev) {
            ev.stopPropagation();
            this.popover.deactivate();
            API.voiceDelete({
                profileName : this.voiceEntity.owner.profileName,
                voiceSlug : this.voiceEntity.slug
            }, this._responseHandler.bind(this));
        },

        _responseHandler : function _responseHandler (err, res){
            if (err) {
                this.dom.updateHTML(this.el, 'Delete (' + res.status + ' ' + res.statusText + ')');
                this.enable();
                return;
            }

            this.dom.removeClass(this.el, ['-color-negative']);
            this.dom.addClass(this.el, ['-color-positive']);
            this.dom.updateHTML(this.el, 'Deleted');
            this.disable();
        },

        destroy : function destroy(){
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            CV.UI.Button.prototype.destroy.call(this);
            return null;
        }
    }
});
