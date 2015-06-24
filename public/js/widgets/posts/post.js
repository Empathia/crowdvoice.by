/* jshint multistr: true */

/* Class CV.Post Main Class.
 * Creates a new Post Widget of the type passed on the params.
 * @usage CV.Post.create({type: 'someKnownPostType', ...}).render(...);
 * @return new CV.Post[type]
 */
Class(CV, 'Post').inherits(Widget).includes(
    CV.WidgetUtils,
    CV.PostModuleImages
)({
    ACTIONS_HTML : '\
        <div class="post-card-actions">\
            <div class="-row -full-height">\
                <div class="post-card-actions-item -col-6">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-save"></use>\
                    </svg>\
                    <p class="post-card-actions-label">Save</p>\
                </div>\
                <div class="post-card-actions-item -col-6">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-share"></use>\
                    </svg>\
                    <p class="post-card-actions-label">Share</p>\
                </div>\
            </div>\
        </div>\
    ',

    /* Creates a specific Post by type using the Strategy Pattern.
     * The Post type should be one of the knows post types available.
     * @method create <public, static> [Function]
     * @arguments config <required> [Object] The Post Model Data.
     * @return new CV.Post[type]
     */
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
        publishedAt: '',

        _repostIntent : function _repostIntent() {},
        _repost : function _repost() {},

        shareIntent : function shareIntent() {},
        _share : function _share() {},

        /* Adds the Re-post, save and share buttons
         * @method addActions <public> [Function]
         */
        addActions : function addActions() {
            this.el.insertAdjacentHTML('beforeend', this.constructor.ACTIONS_HTML);

            return this;
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
            this.publishedAt = null;

            /* module image */
            this.imageLoaded = null;
            this.haltImage = null;

            /* destroy current post type */
            this.__destroy();
        }
    }
});

