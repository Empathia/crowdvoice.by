/* jshint multistr: true */
var moment = require('moment');

// <iframe width="560" height="315" src="https://www.youtube.com/embed/Opktm709TJo" frameborder="0" allowfullscreen></iframe>
// <iframe src="https://player.vimeo.com/video/20729832?title=0&byline=0&portrait=0" width="500" height="272" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
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
        <div class="post-card-info">\
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
    reYT : new RegExp('v=((\\w+-?)+)'),
    reV : new RegExp('[0-9]+'),

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

            if (this.image) {
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
            this.addVideoHandler = this.addVideo.bind(this);
            this.imageWrapperElement.addEventListener('click', this.addVideoHandler);
        },

        addVideo : function() {
            var id;

            this.imageWrapperElement.removeEventListener('click', this.addVideoHandler);

            var iframe = document.createElement('iframe');
            this.dom.updateAttr('frameborder', iframe, 0);
            this.dom.updateAttr('allowfullscreen', iframe, true);

            if (this.sourceService === 'youtube') {
                id = this.sourceUrl.match(this.constructor.reYT)[1];
                this.dom.updateAttr('src', iframe, 'https://www.youtube.com/embed/' + id + '?autoplay=1');
            }

            if (this.sourceService === 'vimeo') {
                id = this.sourceUrl.match(this.constructor.reV)[0];
                this.dom.updateAttr('src', iframe, 'https://player.vimeo.com/video/' + id + '?autoplay=1');
            }

            this.imageWrapperElement.appendChild(iframe);
        },

        /* Implementation for the destroy method.
         * This is run by the destroy method on CV.Post
         * @method __destroy <private> [Function]
         */
        __destroy : function __destroy() {
            this.imageWrapperElement.removeEventListener('click', this.addVideoHandler);
            this.addVideoHandler = null;

            this.el = null;
            this.imageWrapperElement = null;
            this.sourceElement = null;
            this.dateTimeElement = null;
        }
    }
});
