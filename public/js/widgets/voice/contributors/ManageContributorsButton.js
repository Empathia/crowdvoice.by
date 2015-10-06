var Events = require('./../../../lib/events');

Class(CV, 'ManageContributorsButton').inherits(CV.UI.Button)({
    BUTTON_TEXT_TEMPLATE : 'Manage Contributors ({count})',

    prototype : {
        data : {
            /* Initial button text.
             * @property value <optional> [String]
             */
            value : null,
            /* Current Voice Model.
             * @property voice <required> [Object]
             */
            voice : null,
            /* Array of VoiceContributors Models.
             * @property contributors <required> [Array]
             */
            contributors : null
        },

        init : function init(config) {
            CV.UI.Button.prototype.init.call(this, config);
            this._updateButtonText(this.data.contributors.length);
            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
            return this;
        },

        /* Updates the button text using the BUTTON_TEXT_TEMPLATE string.
         * It requires a number to be pass as param to display the total of
         * contributors.
         * @method _updateButtonText <private> [Function]
         * @argument count <required> [Number]
         * @return ManageContributorsButton
         */
        _updateButtonText : function _updateButtonText(count) {
            var text = this.constructor.BUTTON_TEXT_TEMPLATE;
            text = text.replace(/{count}/, count || 0);
            this.updateText(text);
            return this;
        },

        /* Handles the button click.
         * Instantiate a new ManageContributors Modal and renders it.
         * @method _clickHandler <private> [Function]
         * @return undefined
         */
        _clickHandler : function _clickHandler() {
            if (this.manageContributorsModal) {
                this.manageContributorsModal = this.manageContributorsModal.destroy();
            }

            this.appendChild(new CV.UI.Modal({
                name : 'manageContributorsModal',
                title : 'Manage Contributors',
                action : CV.ManageContributors,
                width : 900,
                data : {
                    voice : this.data.voice,
                    contributors : this.data.contributors
                }
            })).render(document.body);

            this.manageContributorsModal.bubbleAction.setup();

            requestAnimationFrame(function() {
                this.manageContributorsModal.activate();
            }.bind(this));
        },

        destroy : function destroy() {
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            CV.UI.Button.prototype.destroy.call(this);
            return null;
        }
    }
});
