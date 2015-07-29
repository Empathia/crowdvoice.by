/* jshint multistr: true */
var moment = require('moment');

Class(CV, 'PostVideo').inherits(CV.Post)({
    HTML : '\
    <article class="post-card video">\
        <div class="post-card-image-wrapper">\
            <div class="post-card-play-button">\
                <svg class="post-card-svg-play">\
                    <use xlink:href="#svg-play"></use>\
                </svg>\
            </div>\
        </div>\
        <div class="post-card-info -text-left">\
            <div class="post-card-meta">\
                <span class="post-card-meta-source"></span>\
                on <time class="post-card-meta-date" datetime=""></time>\
            </div>\
            <h2 class="post-card-title"></h2>\
            <p class="post-card-description"></p>\
            <div class="post-card-activity">\
                <div class="post-card-activity-saved -inline-block">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-save-outline"></use>\
                    </svg>\
                    <span class="post-card-activity-label">0</span>\
                </div>\
            </div>\
        </div>\
    </article>\
    ',

    ICON : '<svg class="post-card-meta-icon"><use xlink:href="#svg-play"></use></svg>',

    prototype : {
        /* PRIVATE properties */
        el : null,
        titleElement : null,
        descriptionElement : null,
        imageWrapperElement : null,
        sourceElement : null,
        dateTimeElement : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.titleElement = this.el.querySelector('.post-card-title');
            this.descriptionElement = this.el.querySelector('.post-card-description');
            this.sourceElement = this.el.querySelector('.post-card-meta-source');
            this.dateTimeElement = this.el.querySelector('.post-card-meta-date');
            this.imageWrapperElement = this.el.querySelector('.post-card-image-wrapper');

            if (this.hasCoverImage()) {
                this.setImageHeight(this.imageMeta.medium.height);
            } else {
                this.imageLoaded = true;
            }

            // if (this.sourceUrl && this.sourceService) {
            //     var a = this.dom.create('a');
            //     this.dom.updateAttr('href', a, this.sourceUrl);
            //     this.dom.updateText(a, this.sourceService + " ");
            //     this.dom.updateText(this.sourceElement, 'from ');
            //     this.sourceElement.appendChild(a);
            // } else {
                this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.ICON);
                this.dom.updateText(this.sourceElement, 'posted ');
            // }

            this.dom.updateText(this.dateTimeElement, moment(this.publishedAt).format('MMM DD, YYYY'));
            this.dom.updateAttr('datetime', this.dateTimeElement, this.publishedAt);

            this.dom.updateText(this.titleElement, this.title);
            this.dom.updateText(this.descriptionElement, this.description);

            this.dom.updateText(this.el.querySelector('.post-card-activity-saved .post-card-activity-label'), this.totalSaves);

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickImageHandlerRef = this._clickImageHandler.bind(this);
            this.imageWrapperElement.addEventListener('click', this._clickImageHandlerRef);
            return this;
        },

        _clickImageHandler : function _bindEvents() {
            this.dispatch('post:display:detail', {data: this});
        },

        /* Implementation for the destroy method.
         * This is run by the destroy method on CV.Post
         * @method __destroy <private> [Function]
         */
        __destroy : function __destroy() {
            this.imageWrapperElement.removeEventListener('click', this._clickImageHandlerRef);
            this._clickImageHandlerRef = null;

            this.el = null;
            this.imageWrapperElement = null;
            this.sourceElement = null;
            this.dateTimeElement = null;
        }
    }
});
