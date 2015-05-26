var moment = require('moment');
var Velocity = require('velocity-animate');

Class(CV, 'VoiceTimelineFeedback').inherits(Widget)({
    HTML : '\
        <div class="cv-voice-timeline-feedback">\
            <span class="timeline-feedback-h"></span>\
            <span class="timeline-feedback-m"></span>\
        </div>\
    ',

    INDICATOR_CLASSNAME : 'cv-voice-tick-indicator',
    FOOTER_HEIGHT: 56,

    prototype : {
        /* CONFIGURATION OPTIONS */
        firstPostDate : '',
        lastPostDate : '',

        /* PRIVATE : ELEMENT REFERENCES */
        /* Holds a reference to the main widget's HTMLElement */
        el : null,
        /* Holds a reference to window */
        _window : null,
        _scrollableArea : null,
        hourElement : null,
        minutesElement : null,

        /* PRIVATE : PROPERTIES */
        /* CONFIG.firstPostDate in milliseconds */
        _firstDateMS : '',
        /* CONFIG.lastPostDate in milliseconds */
        _lastDateMS : '',
        /* Holds the last value of window.scrollY */
        _lastScrollY : null,
        /* Flag to handle updates per screen update (raf) */
        _scheduledAnimationFrame : null,
        /* Holds the value in pixel units of total scrollable area */
        _totalHeight : 0,
        /* Holds the value in pixel units of the viewport width */
        _clientWidth : 0,
        /* Holds the value in pixel units of the viewport height */
        _clientHeight : 0,
        /* Random-ish value to alter the clock roration based on total height */
        _rotateFactor : 0,
        /* Offset left spacing for the clock available space */
        _timelineOffsetLeft : 10,
        /* Offset rigth spacing for the clock available space */
        _timelineOffsetRight : 30,
        /* Holds the reference to the last date indicator detected */
        _lastScrollDate : '',

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._window = window;
            this._scrollableArea = document.getElementsByClassName('cv-main-content')[0];
            this.hourElement = this.el.querySelector('.timeline-feedback-h');
            this.minutesElement = this.el.querySelector('.timeline-feedback-m');

            this._firstDateMS = moment(this.firstPostDate).format('x') * 1000;
            this._lastDateMS = moment(this.lastPostDate).format('x') * 1000;

            this.updateVars()._bindEvents();
        },

        /* Cache some variable values related to the screen size.
         * This method should be called on init and on whenever the viewport
         * change its dimensions.
         * @public
         */
        updateVars : function _pdateVars() {
            this._totalHeight = this._scrollableArea.offsetHeight;
            this._clientWidth = document.documentElement.clientWidth;
            this._clientHeight = document.documentElement.clientHeight - this.constructor.FOOTER_HEIGHT;
            this._rotateFactor = this._totalHeight / 500;

            return this;
        },

        /* Subscribe and listen to events.
         * @private
         */
        _bindEvents : function _bindEvents() {
            this.readAndUpdateRef = this.readAndUpdate.bind(this);

            this.scrollHandlerRef = this.scrollHandler.bind(this);
            this._window.addEventListener('scroll', this.scrollHandlerRef, false);

            return this;
        },

        /* Handle the window.scroll event
         * @private
         */
        scrollHandler : function scrollHandler() {
            this._lastScrollY = window.scrollY;

            if (this._scheduledAnimationFrame) return;

            this._scheduledAnimationFrame = true;
            requestAnimationFrame(this.readAndUpdateRef);
        },

        /* Updates timeline feedback animation while scrolling.
         * @private
         */
        readAndUpdate : function readAndUpdate() {
            var scrollPercentage, scrollViewportPixels, elem, scaledPercentage, scaledPixels, degs;

            scrollPercentage = 100 * this._lastScrollY / (this._totalHeight - this._clientHeight);
            scrollViewportPixels = scrollPercentage * this._clientHeight / 100;
            elem = document.elementFromPoint(this._clientWidth - 10, scrollViewportPixels);

            if (elem) {
                if (elem.classList.contains(this.constructor.INDICATOR_CLASSNAME)) {
                    this._lastScrollDate = Math.round(elem.dataset.timestamp);
                }
            }

            scaledPercentage = ((100 * (this._lastScrollDate - this._firstDateMS)) / (this._lastDateMS - this._firstDateMS));

            if (scaledPercentage < 0) {
                scaledPercentage = 0;
            }

            scaledPixels = ~~((this._clientWidth - this._timelineOffsetRight) * scaledPercentage / 100)

            if (scaledPixels < this._timelineOffsetLeft) {
                scaledPixels = this._timelineOffsetLeft;
            }

            degs = scaledPercentage * 3.6;

            Velocity(this.hourElement, 'stop', true);
            Velocity(this.hourElement, {
                rotateZ: (degs * (this._rotateFactor / 2)) + 'deg'
            }, {
                easing: 'ease'
            });

            Velocity(this.minutesElement, 'stop', true);
            Velocity(this.minutesElement, {
                rotateZ: (degs * this._rotateFactor) + 'deg'
            }, {
                easing: 'ease'
            });

            Velocity(this.el, 'stop', true);
            Velocity(this.el, {
                translateX: scaledPixels + 'px'
            }, {
                duration: 200,
                easing: 'linear'
            });

            this._scheduledAnimationFrame = false;
        },

        /* Unlisten events, release any HTMLElement reference, free variables...
         * @public
         */
        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this._window.removeEventListener('scroll', this.scrollHandlerRef, false);
            this.scrollHandlerRef = null;
        }
    }
});
