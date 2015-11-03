var Gemini = require('gemini-scrollbar');
var Velocity = require('velocity-animate');

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
            this._updateScrollbarRef = this._updateScrollbar.bind(this);
        },

        /* Destroys any thumb children and creates them using the new posts
         * array passed. This allow us to keep the order of thumbs intact and
         * updated everytime we get new posts fetched from the server.
         * @method updateThumbs <public>
         */
        updateThumbs : function update(posts) {
            while(this.children.length > 0) {
                this.children[0].destroy();
            }

            posts.forEach(function(post) {
                if (post.postImages && post.postImages.small) {
                    this.appendChild(new CV.PostDetailMediaThumb({
                        name : 'thumb_' + post.id,
                        data : post
                    })).render(this.scrollbar.getViewElement());
                    this['thumb_' + post.id].bind('image:loaded', this._updateScrollbarRef);
                    this['thumb_' + post.id].bind('click', this._thumbClickHandlerRef);
                }
            }, this);

            this._updateScrollbar();
        },

        /* Iterate over all items and deactivate them, activates the one passed
         * as currently active and scrollsInto the activate thumb.
         * @method activateThumb <public>
         */
        activateThumb : function activateThumb(thumb) {
            this._activatedThumb = null;

            this.children.forEach(function(post) {
                post.deactivate();

                if (post.data === thumb) {
                    this._activatedThumb = post.activate();
                }
            }, this);

            this._scrollToActiveThumb();
        },

        _thumbClickHandler : function _thumbClickHandler(ev) {
            this.dispatch('media:gallery:thumb:click', {data: ev.data});
        },

        /* Updates the custom scrollbars and scrollsInto the active thumb.
         * @method _updateScrollbar <private>
         */
        _updateScrollbar : function _updateScrollbar() {
            this.scrollbar.update();
            this._scrollToActiveThumb();
        },

        /* ScrollsInto the active thumb.
         * @method _scrollToActiveThumb <private>
         */
        _scrollToActiveThumb : function _scrollToActiveThumb() {
            if (!this._activatedThumb) {
                return;
            }

            Velocity(this._activatedThumb.el, 'scroll', {
                container : this.scrollbar.getViewElement(),
                axis : 'x',
                duration : 200,
                easing : 'linear'
            });
        }
    }
});
