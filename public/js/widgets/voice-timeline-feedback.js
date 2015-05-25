var moment = require('moment');

Class(CV, 'VoiceTimelineFeedback').inherits(Widget)({
    HTML : '\
        <div class="cv-voice-timeline-feedback"></div>\
    ',

    INDICATOR_CLASSNAME : 'cv-voice-tick-indicator',

    prototype : {
        /* OPTIONS */
        firstPostDate : '',
        lastPostDate : '',

        _window : null,
        _lastScrollY : null,
        _scheduledAnimationFrame : null,

        _totalHeight : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._window = window;

            this.firstDateMS = moment(this.firstPostDate).format('x');
            this.lastDateMS = moment(this.lastPostDate).format('x');

            this._updateVars();

            this._bindEvents();
        },

        _updateVars : function _updateVars() {
            this._totalHeight = document.documentElement.offsetHeight;
            this._clientWidth = document.documentElement.clientWidth;
            this._clientHeight = document.documentElement.clientHeight;
            this._rotateFactor = this._totalHeight / 500;
        },

        _bindEvents : function _bindEvents() {
            this.readAndUpdateRef = this.readAndUpdate.bind(this);

            this.scrollHandlerRef = this.scrollHandler.bind(this);
            this._window.addEventListener('scroll', this.scrollHandlerRef, false);
        },

        scrollHandler : function scrollHandler() {
            this._lastScrollY = window.scrollY;

            if (this._scheduledAnimationFrame) return;

            this._scheduledAnimationFrame = true;
            requestAnimationFrame(this.readAndUpdateRef);
        },

        readAndUpdate : function readAndUpdate() {
            var scrollPercentage, scrollViewportPixels, elem;
            var current;

            scrollPercentage = 100 * this._lastScrollY / (this._totalHeight - this._clientHeight);
            scrollViewportPixels = scrollPercentage * this._clientHeight / 100;
            elem = document.elementFromPoint(this._clientWidth - 40, scrollViewportPixels);

            if (elem) {
                if (elem.classList.contains(this.constructor.INDICATOR_CLASSNAME)) {
                    current = Math.round(elem.dataset.timestamp);
                }
            }

            var scaledPercentage = ((100 * (current - this.firstDateMS)) / (this.lastDateMS - this.firstDateMS));
            var scaledPixels = ~~(this._clientWidth * scaledPercentage / 100)

            this.el.style.transform = 'translateX(' + scaledPixels + 'px)';

            this._scheduledAnimationFrame = false;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this._window.removeEventListener('scroll', this.scrollHandlerRef, false);
            this.scrollHandlerRef = null;
        }
    }
});
