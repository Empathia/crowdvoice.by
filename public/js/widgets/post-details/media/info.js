var moment = require('moment');

Class(CV, 'PostDetailMediaInfo').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-post-detail-media__info',
    HTML : '\
        <div>\
            <div class="cv-post-detail-media__info-media"></div>\
            <div class="cv-post-detail-media__info-text">\
                <p>\
                    <span>on <time data-date datetime></time></span>\
                </p>\
                <p data-title>title</p>\
                <p data-description>description</p>\
                <div>\
                    <div class="-inline-block">\
                        <svg class="-s16">\
                            <use xlink:href="#svg-save-outline"></use>\
                            <span data-saved></span>\
                        </svg>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',

    reYT : new RegExp('v=((\\w+-?)+)'),
    reV : new RegExp('[0-9]+'),

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.mediaElement = this.el.querySelector('.cv-post-detail-media__info-media');
            this.dateElement = this.el.querySelector('[data-date]');
            this.titleElement = this.el.querySelector('[data-title]');
            this.descriptionElement = this.el.querySelector('[data-description]');
            this.savedElement = this.el.querySelector('[data-saved]');
        },

        update : function update(data) {
            this.dom.updateText(this.dateElement, moment(data.publishedAt).format('MMM DD, YYYY'));
            this.dom.updateAttr('datetime', this.dateElement, data.publishedAt);
            this.dom.updateText(this.titleElement, data.title);
            this.dom.updateText(this.descriptionElement, data.description);
            this.dom.updateText(this.savedElement, data.totalSaves || 0);

            // @TODO : refactor this part, e.g. move to a widget to handle this
            // <iframe width="560" height="315" src="https://www.youtube.com/embed/Opktm709TJo" frameborder="0" allowfullscreen></iframe>
            // <iframe src="https://player.vimeo.com/video/20729832?title=0&byline=0&portrait=0" width="500" height="272" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            this.mediaElement.innerHTML = '';

            if (data.sourceType === 'image') {
                this.mediaElement.insertAdjacentHTML('afterbegin', '<img src="' + data.image + '"/>');
            }

            if (data.sourceType === 'video') {
                var id = '';
                this.mediaElement.insertAdjacentHTML('afterbegin', '<iframe frameborder="0" allowfullscreen="true"></iframe>');
                var iframe = this.mediaElement.querySelector('iframe');

                if (data.sourceService === 'youtube') {
                    id = data.sourceUrl.match(this.constructor.reYT)[1];
                    this.dom.updateAttr('src', iframe, 'https://www.youtube.com/embed/' + id + '?autoplay=1');
                }

                if (this.sourceService === 'vimeo') {
                    id = data.sourceUrl.match(this.constructor.reV)[0];
                    this.dom.updateAttr('src', iframe, 'https://player.vimeo.com/video/' + id + '?autoplay=1');
                }
            }
        }
    }
});
