var moment = require('moment');

Class(CV, 'PostDetailInfoMedia').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'pd__info-media -full-height',

    HTML : '\
        <div>\
            <div class="pd__info-media-header -text-center"></div>\
            <div class="pd__info-media-body">\
                <p class="pd__info-media-meta">\
                    <time></time>\
                    <span class="pd__info-media-meta__source"></span>\
                </p>\
                <p class="pd__info-media-title -font-bold"></p>\
                <p class="pd__info-media-description"></p>\
            </div>\
        </div>',

    IFRAME_STRING : '\
        <div class="pd__info-media-iframe-wrapper -rel">\
            <iframe class="pd__info-media-iframe -abs -full-width -full-height" frameborder="0" allowfullscreen="true"></iframe>\
        </div>',

    reYouTubeVideo : new RegExp('v=((\\w+-?)+)'),
    reVimeoVideo : new RegExp('[0-9]+'),

    FAVICON : '<img class="pd-sidebar-item-meta__icon-image" src="{src}"/>',
    THUMB_TEMPLATE : '<img src="{source}" class="pd-sidebar-item__cover -float-left" width="56" height="56"/>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.headerElement = this.el.querySelector('.pd__info-media-header');
            this.sourceElement = this.el.querySelector('.pd__info-media-meta__source');
            this.dateTimeElement = this.el.querySelector('.pd__info-media-meta > time');

            this._setup();
        },

        _setup : function _setup() {
            if (this.data.sourceType === 'image') {
                this._appendImage(this.data);
            }

            if (this.data.sourceType === 'video') {
                this._appendVideo(this.data);
            }

            if (this.data.faviconPath) {
                this.sourceElement.insertAdjacentHTML('afterbegin', this.constructor.FAVICON.replace(/{src}/, this.data.faviconPath));
                this.sourceElement.insertAdjacentHTML('beforeend', '<a href="' + this.data.sourceDomain + '" target="_blank">'+ this.data.sourceDomain.replace(/.*?:\/\/(w{3}.)?/g, "") + '</a> ');
            } else {
                this.sourceElement.parentNode.removeChild(this.sourceElement);
            }

            this.dom.updateText(this.dateTimeElement, moment(this.data.publishedAt).format('MMM DD, YYYY'));
            this.dom.updateAttr('datetime', this.dateTimeElement, this.data.publishedAt);

            this.dom.updateText(this.el.querySelector('.pd__info-media-title'), this.data.title);
            this.dom.updateText(this.el.querySelector('.pd__info-media-description'), this.dom.decodeHTML(this.data.description));

            return this;
        },

        _appendImage : function _appendImage(data) {
            this.headerElement.insertAdjacentHTML('afterbegin', '<img class="-fit" src="' + data.postImages.original.url + '"/>');
        },

        _appendVideo : function _appendVideo(data) {
            var id, iframe;

            this.headerElement.insertAdjacentHTML('afterbegin', this.constructor.IFRAME_STRING);
            iframe = this.headerElement.querySelector('iframe');

            if (data.sourceService === 'youtube') {
                // https://www.youtube.com/embed/Opktm709TJo
                id = data.sourceUrl.match(this.constructor.reYouTubeVideo)[1];
                this.dom.updateAttr('src', iframe, 'https://www.youtube.com/embed/' + id + '?autoplay=1');
            }

            if (data.sourceService === 'vimeo') {
                // https://player.vimeo.com/video/20729832?title=0&byline=0&portrait=0
                id = data.sourceUrl.match(this.constructor.reVimeoVideo)[0];
                this.dom.updateAttr('src', iframe, 'https://player.vimeo.com/video/' + id + '?autoplay=1');
            }

            id = iframe = null;
        }
    }
});

