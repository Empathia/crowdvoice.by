var moment = require('moment');

Class(CV, 'VoiceTimelineJumpToDate').inherits(Widget)({
    prototype : {
        /* OPTIONS */
        totalLayers : 0,
        container : null,
        clockElement : null,

        /* PRIVATE */
        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this._autoSetup()._bindEvents();
        },

        _autoSetup : function _autoSetup() {
            this.appendChild(
                new CV.PopoverBlocker({
                    name : 'jumpToDatePopover',
                    className : 'voice-timeline-popover',
                    title : 'Jump to',
                    placement : 'top',
                    toggler : this.clockElement
                })
            ).render(this.container);

            this.container.classList.add('ui-has-popover');

            this.__createJumpToDateOptions(this.totalLayers);

            return this;
        },

        /* Creates the menu options for all years and months dynamically
         * @method __createJumpToDateOptions <private> [Function]
         */
        __createJumpToDateOptions : function __createJumpToDateOptions(totalLayers) {
            var i = 0;
            var frag = document.createDocumentFragment();
            var _lastYear, date, dateString, year, month;

            for (i = 0; i < totalLayers; i++) {
                date = moment(this.lastPostDate).month(-i);
                dateString = date.format('YYYY-MM');
                year = date.format('YYYY');
                month = date.format('MMMM');

                if (_lastYear !== year) {
                    _lastYear = year;

                    this.appendChild(
                        new CV.VoiceTimelineJumpToDateLabel({
                            name : 'label_' + year,
                            label : year
                        })
                    );

                    frag.appendChild(this['label_' + year].el);
                }

                this.appendChild(
                    new CV.VoiceTimelineJumpToDateItem({
                        name : 'item_' + dateString,
                        label : month,
                        date : dateString
                    })
                );

                frag.appendChild(this['item_' + dateString].el);
            }

            this.jumpToDatePopover.setContent(frag);

            i = frag = _lastYear = null;
        },

        /* Attach event handlers
         * @method _bindEvents <private> [Function]
         */
        _bindEvents : function _bindEvents() {
            this.jumpToDatePopover.bind('activate', this._handleActivate);
            this.jumpToDatePopover.bind('deactivate', this._handleDeactivate);

            return this;
        },

        /* Popover activate handler
         * @method _handleActivate <private> [Function]
         */
        _handleActivate : function _handleActivate() {
            var left = this.el.offsetLeft;
            var width = this.el.offsetWidth;
            var farRight = left + width;
            var w = window.innerWidth;
            var diff = farRight - w;

            if (diff > 0) {
                this.el.style.transform = 'translateX(' + ((diff + 10) * -1) + 'px)';
            }

            if (left < 0) {
                this.el.style.left = '10px';
            }
        },

        /* Popover deactivate handler
         * @method _handleDeactivate <private> [Function]
         */
        _handleDeactivate : function _handleActivate() {
            this.el.style.transform = '';
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.jumpToDatePopover.unbind(this._handleActivate);
            this.jumpToDatePopover.unbind(this._handleDeactivate);

            this.totalLayers = null;
            this.container = null;
            this.clockElement = null;

            this.el = null;
        }
    }
});
