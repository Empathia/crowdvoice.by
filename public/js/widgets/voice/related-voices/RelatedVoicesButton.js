/* Handles the `See Related Voices` button shown at the voice's footer.
 * No public methods, it will render the ManageRelatedVoices widget inside a
 * Modal when clicked. The ManageRelatedVoices widget will do everything itself.
 */
var Person = require('./../../../lib/currentPerson');
var Events = require('./../../../lib/events');

Class(CV, 'RelatedVoicesButton').inherits(CV.UI.Button)({
    prototype : {
        /* VoiceEntity data.
         * @property voice <required> [Object] (null)
         */
        voice : null,
        relatedVoices : null,

        /* The voice is beign displayed for its owner?
         * @property editMode <optional> [Boolean] (false)
         */
        editMode : false,

        init : function init(config) {
            CV.UI.Button.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        /* Updates the Button text.
         * @method _setup <private>
         * @return RelatedVoicesButton
         */
        _setup : function _setup() {
            this.editMode = (Person.get() && !Person.anon() && Person.memberOf('voice', this.voice.id));
            var buttonText  = '';

            if (this.editMode) {
                buttonText = 'Manage Related Voices';
            } else {
                buttonText = 'See Related Voices';
            }

            this.updateText(buttonText);

            return this;
        },

        /* Subscribe its events.
         * @method _bindEvents <private>
         */
        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
        },

        /* Button click handler.
         * @method _clickHandler <private>
         */
        _clickHandler : function _clickHandler() {
            if (this.relatedVoicesModal) {
                this.relatedVoicesModal = this.relatedVoicesModal.destroy();
            }

            if (this.editMode) {
                this.appendChild(new CV.UI.Modal({
                    name : 'relatedVoicesModal',
                    title : 'Manage Related Voices',
                    action : CV.ManageRelatedVoices,
                    width : 900,
                    data : {
                        relatedVoices : this.relatedVoices,
                        editMode : true,
                        voice : this.voice
                    }
                })).render(document.body);

                this.relatedVoicesModal.bubbleAction.setup();
            } else {
                this.appendChild(new CV.PopoverBlocker({
                    name : 'relatedVoicesModal',
                    title : 'Related Voices',
                    placement : 'bottom',
                    showCloseButton : true,
                    className : 'voice-related-voices-bubble',
                    content : new CV.ManageRelatedVoices({
                        data : {
                            relatedVoices : this.relatedVoices,
                            editMode : false,
                            voice : this.voice
                        }
                    }).el,
                })).render(this.el.parentElement).activate();
            }

            requestAnimationFrame(function() {
                this.relatedVoicesModal.activate();
            }.bind(this));
        },

        /* Unsubscribe its events, nullify DOM references, destroy children, etc.
         * @method destroy <public> (inherited from Widget)
         */
        destroy : function destroy() {
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            CV.UI.Button.prototype.destroy.call(this);
            return null;
        }
    }
});
