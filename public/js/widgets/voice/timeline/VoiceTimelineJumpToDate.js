var moment = require('moment');
var GeminiScrollbar = require('gemini-scrollbar');
var Events = require('./../../../lib/events');
var inlineStyle = require('./../../../lib/inline-style');

Class(CV, 'VoiceTimelineJumpToDate').inherits(Widget)({
    prototype : {
        /* OPTIONS */
        postsCount : 0,
        container : null,

        /* PRIVATE */
        el : null,
        _optionChilds : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._optionChilds = [];

            this._autoSetup()._bindEvents();
        },

        _autoSetup : function _autoSetup() {
            this.appendChild(new CV.PopoverBlocker({
                name : 'jumpToDatePopover',
                className : 'voice-timeline-popover -color-border-grey-light',
                title : 'Jump to',
                placement : 'bottom',
                showCloseButton : true,
                hasScrollbar : true
            })).render(this.container);

            this.__createJumpToDateOptions(this.postsCount);

            return this;
        },

        /* Creates the menu options for all years and months including the total post counters.
         * @method __createJumpToDateOptions <private> [Function]
         */
        __createJumpToDateOptions : function __createJumpToDateOptions(postsCount) {
            var frag = document.createDocumentFragment();
            var _lastYear, optionWidget;

            this.postsCount.forEach(function(yearItem) {
                var year = yearItem.year;

                yearItem.months.forEach(function(monthItem) {
                    var date = moment(year + '-' + monthItem.month + '-01', 'YYYY-MM-DD');
                    var dateString = date.format('YYYY-MM');
                    var month = date.format('MMMM');

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

                    optionWidget = new CV.VoiceTimelineJumpToDateItem({
                        name : 'item_' + dateString,
                        label : month,
                        date : dateString,
                        totalPosts : monthItem.total
                    });

                    this.appendChild(optionWidget);
                    this._optionChilds.push(optionWidget);

                    frag.appendChild(optionWidget.el);

                    dateString = month = null;
                }, this);

                year = null;
            }, this);

            this.jumpToDatePopover.getContent().className += ' ui-vertical-list hoverable';
            this.jumpToDatePopover.setContent(frag);
            this.scrollbar = new GeminiScrollbar({
                element : this.jumpToDatePopover.getContent()
            }).create();

            frag = _lastYear = optionWidget = null;
        },

        /* Attach event handlers
         * @method _bindEvents <private> [Function]
         */
        _bindEvents : function _bindEvents() {
            this._activatePopoverRef = this._activatePopover.bind(this);
            Events.on(this.container, 'click', this._activatePopoverRef);
            this._handleActivateRef = this._handleActivate.bind(this);
            this.bind('jumpto:popover:position', this._handleActivateRef);
            this._handleDeactivateRef = this._handleDeactivate.bind(this);
            this.jumpToDatePopover.bind('deactivate', this._handleDeactivateRef);

            return this;
        },

        _activatePopover : function _activatePopover(ev) {
            var popover = this.jumpToDatePopover.el;

            this.jumpToDatePopover.activate();

            inlineStyle(this.jumpToDatePopover.el, {
                left: ev.pageX + 'px'
            });

            this.dispatch('jumpto:popover:position');
        },

        /* Popover activate handler
         * @method _handleActivate <private> [Function]
         */
        _handleActivate : function _handleActivate() {
            var popover = this.jumpToDatePopover.el;
            var left = popover.offsetLeft;
            var width = popover.offsetWidth;
            var farRight = left + width;
            var w = window.innerWidth;
            var diff = farRight - w;

            if (diff > 0) {
                var transform = 'translateX(' + ((diff + 10) * -1) + 'px)';
                inlineStyle(popover, {
                    msTransform: transform,
                    webkitTransform: transform,
                    transform: transform
                });
            }

            if (left < 0) {
                popover.style.left = '10px';
            }

            this.parent.activate();
            this.scrollbar.update();
        },

        /* Popover deactivate handler
         * @method _handleDeactivate <private> [Function]
         */
        _handleDeactivate : function _handleActivate() {
            this.parent.deactivate();
            this.jumpToDatePopover.el.style.msTransform = '';
            this.jumpToDatePopover.el.style.webkitTransform = '';
            this.jumpToDatePopover.el.style.transform = '';
            this.jumpToDatePopover.arrowElement.style.transform = '';
        },

        /* Deactivate any active option and activate the one that matches the passed string by name.
         * @method updateActivateOption <public> [Function]
         * @argument date <required> [String] (undefined) ex. '1987-07'
         * @return [CV.VoiceTimelineJumpToDate]
         */
        updateActivateOption : function updateActivateOption(date) {
            this._optionChilds.forEach(function(child) {
                child.deactivate();
            });

            this['item_' + date].activate();

            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.jumpToDatePopover.unbind('activate', this._handleActivateRef);
            this._handleActivateRef = null;
            this.jumpToDatePopover.unbind('deactivate', this._handleDeactivateRef);
            this._handleDeactivateRef = null;

            this.postsCount = null;
            this.container = null;

            this.el = null;
            this._optionChilds = [];
        }
    }
});