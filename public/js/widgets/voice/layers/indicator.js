/* jshint multistr: true */
var moment = require('moment');

Class(CV, 'VoicePostIndicator').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="cv-voice-tick-indicator">\
            <span class="cv-voice-tick-indicator-label"></span>\
        </div>\
    ',
    /* Holds the `y` values that are being registed by any instance.
     * We do not want them to overlap each other.
     * There is just one group of indicators now, so can safely us this
     * approach.
     */
    registeredYValues : [],

    ITEM_HEIGHT : 20,

    flushRegisteredYValues : function flushRegisteredYValues() {
        this.registeredYValues = [];
    },

    prototype : {
        /* OPTIONS */
        label : '',
        refElement : null,
        zIndex : 0,

        /* PRIVATE */
        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.labelElement = this.el.querySelector('.cv-voice-tick-indicator-label');

            this.el.dataset.timestamp = moment(this.label).format('x') * 1000;

            this.dom.updateText(this.labelElement, moment(this.label).format('MMM DD, YYYY'));
            this.el.style.zIndex = this.zIndex;
        },

        /* Sets the indicator position and dimensions.
         * Checks if the indicator can be positioned on the same y coord of
         * its CONFIG.refElement reference. This is to avoid collisions with
         * previous indicators. If it cannot be placed on that coord, its
         * `y` position will be calculated summing up its height to the last
         * `y` registed value.
         * @public
         */
        updatePosition : function updatePosition() {
            var y, height, alreadyRegistered;

            y = ~~this.refElement.dataset.y;
            height = ~~this.refElement.dataset.h;

            alreadyRegistered = function(value) {
                return (value == y || y < (value + this.constructor.ITEM_HEIGHT));
            }.bind(this);

            if (this.constructor.registeredYValues.some(alreadyRegistered)) {
                y = (this._getLastYValue() + this.constructor.ITEM_HEIGHT);
            }

            this.constructor.registeredYValues.push(y);

            this.el.style.height = height + 'px';
            this.el.style.top = y + 'px';

            y = height = alreadyRegistered = null;

            return this;
        },

        /* Returns its date as timestamp
         * @public
         */
        getTimestamp : function getTimestamp() {
            return this.el.dataset.timestamp;
        },

        /* Returns the last (which is the greatest) registered y value.
         * @private
         */
        _getLastYValue : function _getLastYValue() {
            return this.constructor.registeredYValues[this.constructor.registeredYValues.length - 1];

        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.constructor.flushRegisteredYValues();

            this.label = null;
            this.refElement = null;
            this.zIndex = null;

            this.el = null;
            this.labelElement = null;
        }
    }
});
