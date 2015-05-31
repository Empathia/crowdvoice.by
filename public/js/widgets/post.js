/* jshint multistr: true */
require('../lib/image-halt');

Class(CV, 'Post').inherits(Widget).includes(CV.WidgetUtils)({
    ACTIONS_HTML : '\
        <div class="post-card-actions">\
            <div class="-row -full-height">\
                <div class="post-card-actions-item -col-4">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-repost"></use>\
                    </svg>\
                </div>\
                <div class="post-card-actions-item -col-4">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-save"></use>\
                    </svg>\
                </div>\
                <div class="post-card-actions-item -col-4">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-share"></use>\
                    </svg>\
                </div>\
            </div>\
        </div>\
    ',

    create : function create(config) {
        var type = this.prototype.format.capitalizeFirstLetter(config.sourceType);

        return new window.CV['Post' + type](config);
    },

    prototype : {
        imageLoaded : false,
        haltImage : null,

        _repostIntent : function _repostIntent() {},
        _repost : function _repost() {},

        _save : function _save() {},

        shareIntent : function shareIntent() {},
        _share : function _share() {},

        /* Preload Post Image Cover
         * @method loadImage <public> [Function]
         * @return [CV.Post]
         */
        loadImage : function loadImage() {
            if (!this.image) return this;
            if (this.imageLoaded === true) return this;

            if (this.haltImage) {
                this.haltImage.load();
                return this;
            }

            this._loadImageHandlerRef = this._loadImageHandler.bind(this);
            this.haltImage = new ImageHalt(this.image, this._loadImageHandlerRef);
            this.haltImage.load();

            return this;
        },

        /* Cancel the post's cover image transfer.
         * @method abortImage <public> [Function]
         * @return [CV.Post]
         */
        abortImage : function abortImage() {
            if (!this.image) return this;
            if (this.imageLoaded === true) return this;

            this.haltImage.abort();

            return this;
        },

        /* Handler the image error, load events.
         * @method _loadImageHandler <private> [Function]
         */
        _loadImageHandler : function _loadImageHandler(err, imageObject) {
            if (err) {
                console.error(err);
                console.log(imageObject);
                console.log('*****************');
                return;
            }

            this.dom.updateBgImage(this.imageWrapperElement, imageObject.src);
            this.imageLoaded = true;
            this.haltImage = null;
        }
    }
});

