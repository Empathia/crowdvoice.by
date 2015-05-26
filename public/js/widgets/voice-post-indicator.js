var moment = require('moment');

Class(CV, 'VoicePostIndicator').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-voice-tick-indicator',

    prototype : {
        /* OPTIONS */
        label : '',
        refElement : null,
        zIndex : 0,

        /* PRIVATE */
        el : null,
        y : 0,
        height : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.el.dataset.timestamp = moment(this.label).format('x') * 1000;

            this.dom.updateText(this.el, moment(this.label).format('MMM DD, YYYY'));
            this.el.style.zIndex = this.zIndex;
        },

        /* Set the indicator position and dimensions, taking as reference the
         * element we pass (`refElement`) as prop.
         * @public
         */
        updatePosition : function updatePosition() {
            this.y = this.refElement.offsetTop;
            this.height = this.refElement.offsetHeight;

            this.el.style.height = this.height + 'px';
            this.el.style.top = this.y + 'px';

            return this;
        }
    }
});
