var Events = require('./../../lib/events');

Class(CV, 'PopoverLeave').inherits(Widget)({
    HTML : '\
        <ul class="ui-vertical-list hoverable -list-clean">\
            <li class="ui-vertical-list-item -color-negative" data-action="leave">Leave</li>\
            <li class="ui-vertical-list-item" data-action="cancel">Cancel</li>\
        </ul>',

    prototype : {
        el : null,
        leaveButton : null,
        cancelButton : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.leaveButton = this.el.querySelector('[data-action="leave"]');
            this.cancelButton = this.el.querySelector('[data-action="cancel"]');
            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._leaveClickHandlerRef = this._leaveClickHandler.bind(this);
            Events.on(this.leaveButton, 'click', this._leaveClickHandlerRef);

            this._cancelClickHanlderRef = this._cancelClickHanlder.bind(this);
            Events.on(this.cancelButton, 'click', this._cancelClickHanlderRef);

            return this;
        },

        /* Leave Option Click Handler.
         * @method _leaveClickHandler <private> [Function]
         */
        _leaveClickHandler : function _leaveClickHandler() {
            this.dispatch('leave');
        },

        /* Cancel Option Click Handler
         * @method _cancelClickHanlder <private> [Function]
         */
        _cancelClickHanlder : function _cancelClickHanlder() {
            this.dispatch('cancel');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            Events.off(this.leaveButton, 'click', this._leaveClickHandlerRef);
            this._leaveClickHandlerRef = null;

            Events.off(this.cancelButton, 'click', this._cancelClickHanlderRef);
            this._cancelClickHanlderRef = null;

            return null;
        }
    }
});
