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
                    <p class="post-card-actions-label">Re-post</p>\
                </div>\
                <div class="post-card-actions-item -col-4">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-save"></use>\
                    </svg>\
                    <p class="post-card-actions-label">Save</p>\
                </div>\
                <div class="post-card-actions-item -col-4">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-share"></use>\
                    </svg>\
                    <p class="post-card-actions-label">Share</p>\
                </div>\
            </div>\
        </div>\
    ',

    create : function create(config) {
        var type = this.prototype.format.capitalizeFirstLetter(config.sourceType);

        return new window.CV['Post' + type](config);
    },

    prototype : {
        /* PUBLIC config */
        sourceType: '',
        sourceUrl: '',
        sourceService: '',
        title: '',
        description: '',
        image: '',
        imageWidth: 0,
        imageHeight: 0,
        totalReposts: 0,
        totalSaves: 0,
        createdAt: '',

        /* PRIVATE properties */
        imageLoaded : false,
        haltImage : null,

        _repostIntent : function _repostIntent() {},
        _repost : function _repost() {},

        _save : function _save() {},

        shareIntent : function shareIntent() {},
        _share : function _share() {},

        /* Adds the Re-post, save and share buttons
         * @method addActions <public> [Function]
         */
        addActions : function addActions() {
            this.el.insertAdjacentHTML('beforeend', this.constructor.ACTIONS_HTML);

            return this;
        },

        /* Updates the cover image with the passed sourceString.
         * @method setCoverImage <public> [Function]
         */
        setCoverImage : function setCoverImage(src) {
            this.dom.updateBgImage(this.imageWrapperElement, src);
        },

        /* Sets the image height equal to the number passed in pixel units.
         * @method setImageHeight <public> [Function[]
         */
        setImageHeight : function setImageHeight(height) {
            this.imageWrapperElement.style.height = height + 'px';
        },

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
            if (!this.haltImage) return this;
            if (this.imageLoaded === true) return this;

            this.haltImage.abort();

            return this;
        },

        /* Handler the image error, load events.
         * @method _loadImageHandler <private> [Function]
         */
        _loadImageHandler : function _loadImageHandler(err, imageObject) {
            if (err) {
                this.abortImage();
                this.haltImage = null;
                console.error(err);
                return;
            }

            this.setCoverImage(imageObject.src);
            this.imageLoaded = true;
            this.haltImage = null;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.sourceType = null;
            this.sourceUrl = null;
            this.sourceService = null;
            this.title = null;
            this.description = null;
            this.image = null;
            this.imageWidth = null;
            this.imageHeight = null;
            this.totalReposts = null;
            this.totalSaves = null;
            this.createdAt = null;

            this.imageLoaded = null;
            this.haltImage = null;

            this.__destroy();
        }
    }
});

