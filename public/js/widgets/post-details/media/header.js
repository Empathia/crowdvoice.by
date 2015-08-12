var Gemini = require('gemini-scrollbar');

Class(CV, 'PostDetailMediaHeader').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-post-detail-media__header -rel',
    HTML : '\
        <div>\
            <div class="cv-post-detail-media__header-thumbs -full-height">\
                <div class="gm-scrollbar -vertical"><span class="thumb"></span></div>\
                <div class="gm-scrollbar -horizontal"><span class="thumb"></span></div>\
                <div class="gm-scroll-view"></div>\
            </div>\
        </div>',

    prototype : {
        _activatedThumb : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.thumbsElement = this.el.querySelector('.cv-post-detail-media__header-thumbs');

            this.scrollbar = new Gemini({
                element : this.thumbsElement,
                createElements: false,
                autoshow : true
            }).create();

            this._thumbClickHandlerRef = this._thumbClickHandler.bind(this);
        },

        _thumbClickHandler : function _thumbClickHandler(ev) {
            this.dispatch('media:gallery:thumb:click', {data: ev.data});
        },

        addThumbs : function addThumbs(posts) {
            posts.forEach(function(post) {
                this.appendChild(new CV.PostDetailMediaThumb({
                    name : 'thumb_' + post.id,
                    data : post
                })).render(this.scrollbar.getViewElement());
                this['thumb_' + post.id].bind('click', this._thumbClickHandlerRef);
            }, this);

            this.scrollbar.update();
        },

        activateThumb : function activateThumb(thumb) {
            if (this._activatedThumb) {
                this._activatedThumb.deactivate();
            }

            this.children.some(function(post) {
                if (post.data === thumb) {
                    this._activatedThumb = post.activate();
                    return true;
                }
            }, this);
        }
    }
});
