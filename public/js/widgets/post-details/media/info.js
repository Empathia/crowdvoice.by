var moment = require('moment');

Class(CV, 'PostDetailMediaInfo').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-post-detail-media__info -full-height -pt5 -pb5 -text-center',
    HTML : '\
        <div>\
            <div class="cv-post-detail-media__info-media"></div>\
            <div class="cv-post-detail-media__info-text -text-left -pl3">\
                <p class="cv-post-detail-media__info-meta">\
                    <span>on <time data-date datetime></time></span>\
                </p>\
                <p data-title class="cv-post-detail-media__info-title -color-white -font-bold">title</p>\
                <p data-description class="cv-post-detail-media__info-desc -mb1">description</p>\
                <div class="cv-post-detail-media__info-activity -mb1">\
                    <svg class="-s16">\
                        <use xlink:href="#svg-save-outline"></use>\
                        <span data-saved></span>\
                    </svg>\
                </div>\
                <div class="cv-post-detail-actions">\
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

            this.appendChild(new CV.PostDetailActionsSave({
                name : 'actionSave'
            })).render(this.el.querySelector('.cv-post-detail-actions'));
        },

        update : function update(data) {
            this.dom.updateText(this.dateElement, moment(data.publishedAt).format('MMM DD, YYYY'));
            this.dom.updateAttr('datetime', this.dateElement, data.publishedAt);
            this.dom.updateText(this.titleElement, data.title);
            this.dom.updateText(this.descriptionElement, data.description);
            this.updateSaves(data);

            this.actionSave.update(data);

            this.mediaElement.innerHTML = '';

            if (data.sourceType === 'image') {
                this._appendImage(data);
            }

            if (data.sourceType === 'video') {
                this._appendVideo(data);
            }
        },

        updateSaves : function updateSaves(data) {
            this.dom.updateText(this.savedElement, data.totalSaves || 0);
        },

        _appendImage : function _appendImage(data) {
            this.mediaElement.insertAdjacentHTML('afterbegin', '<img class="-fit" src="' + data.postImages.original.url + '"/>');
        },

        _appendVideo : function _appendVideo(data) {
            var id, iframe;
            var iframeString = '<div class="cv-post-detail-media__info-media-iframe-wrapper -rel">\
                    <iframe class="cv-post-detail-media__info-media-iframe -abs -full-width -full-height" frameborder="0" allowfullscreen="true"></iframe>\
                </div>';

            this.mediaElement.insertAdjacentHTML('afterbegin', iframeString);
            iframe = this.mediaElement.querySelector('iframe');

            if (data.sourceService === 'youtube') {
                // <iframe width="560" height="315" src="https://www.youtube.com/embed/Opktm709TJo" frameborder="0" allowfullscreen></iframe>
                id = data.sourceUrl.match(this.constructor.reYT)[1];
                this.dom.updateAttr('src', iframe, 'https://www.youtube.com/embed/' + id + '?autoplay=1');
            }

            if (this.sourceService === 'vimeo') {
                id = data.sourceUrl.match(this.constructor.reV)[0];
                // <iframe src="https://player.vimeo.com/video/20729832?title=0&byline=0&portrait=0" width="500" height="272" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                this.dom.updateAttr('src', iframe, 'https://player.vimeo.com/video/' + id + '?autoplay=1');
            }

            id = iframe = iframeString = null;
        }
    }
});
