var moment = require('moment');

Class(CV, 'PostImage').inherits(CV.Post)({
    HTML : '\
    <article class="post-card image">\
        <div class="post-card-image-wrapper"></div>\
        <div class="post-card-info">\
            <div class="post-card-meta">\
                <span class="post-card-meta-source"></span>\
                <time class="post-card-meta-date" datetime=""></time>\
            </div>\
            <h2 class="post-card-title"></h2>\
            <p class="post-card-description"></p>\
            <div class="post-card-activity">\
                <div class="post-card-activity-repost -inline-block -mr1">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-repost"></use>\
                    </svg>\
                    <span class="post-card-activity-label">0</span>\
                </div>\
                <div class="post-card-activity-saved -inline-block">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-save"></use>\
                    </svg>\
                    <span class="post-card-activity-label">0</span>\
                </div>\
            </div>\
        </div>\
    </article>\
    ',

    ICON : '<svg class="post-card-meta-icon"><use xlink:href="#svg-image"></use></svg>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.imageWrapperElement = this.el.querySelector('.post-card-image-wrapper');
            this.sourceElement = this.el.querySelector('.post-card-meta-source');
            this.dateTimeElement = this.el.querySelector('.post-card-meta-date');

            this.el.insertAdjacentHTML('beforeend', this.constructor.ACTIONS_HTML);

            if (this.image) {
                this.imageWrapperElement.style.height = this.imageHeight + 'px';
                this.imageWrapperElement.style.display = 'block';
            }

            if (this.sourceUrl && this.sourceService) {
                var a = this.dom.create('a');
                this.dom.updateAttr('href', a, this.sourceUrl);
                this.dom.updateText(a, this.sourceService + " ");
                this.dom.updateText(this.sourceElement, 'from ');
                this.sourceElement.appendChild(a);
            } else {
                this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.ICON);
                this.dom.updateText(this.sourceElement, 'posted ');
            }

            this.dom.updateText(this.dateTimeElement, "on " + moment(this.created_at).format('MMM DD, YYYY'));
            this.dom.updateAttr('datetime', this.dateTimeElement, this.created_at);

            this.dom.updateText(this.el.querySelector('.post-card-title'), this.title);
            this.dom.updateText(this.el.querySelector('.post-card-description'), this.description);

            this.dom.updateText(this.el.querySelector('.post-card-activity-repost .post-card-activity-label'), this.total_reposts);
            this.dom.updateText(this.el.querySelector('.post-card-activity-saved .post-card-activity-label'), this.total_saves);
        }
    }
});
