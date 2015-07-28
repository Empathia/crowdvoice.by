
/* Subclass of VoicePostLayers
 * Declares the required abstract methods to handle the Voice Posts on Moderation Mode
 */
Class(CV, 'VoicePostLayersModerateAbstract').inherits(CV.VoicePostLayers)({

    prototype : {
        setup : function setup() {
            CV.VoicePostLayers.prototype.setup.call(this);
            CV.ModeratePostsRegistry.setup(this.postsCount);

            return this;
        },

        getPostsRegistry : function getPostsRegistry(date) {
            return CV.ModeratePostsRegistry.get(date);
        },

        setPostsRegistry : function setPostsRegistry(date, posts) {
            CV.ModeratePostsRegistry.set(date, posts);
        },

        /* Implementation to request post data to the server.
         * @method request <protected, abstract> [Function]
         */
        request : function request(id, dateString, scrollDirection) {
            this._socket.emit('getUnapprovedMonthPosts', id, dateString, scrollDirection);
        },

        /* Implementation to add and render post to a layer.
         * @method addPosts <public, abstract> [Function]
         */
        addPosts : function addPosts(layer, postsData) {
            var layers = this;

            layer.addEditablePosts(postsData).getPosts().forEach(function(post) {
                // Voice Owner / Org Member / Contributor
                if (layers.allowPostEditing) {
                    post.edit().addRemoveButton().addPublishButton();
                    post.bind('dimensionsChanged', layers._reLayoutLayer);
                    return;
                }

                // Visitor (posts list)
                post.unmoderatedStyle().addVoteButtons();
            });

            layer.reLayout();

            return this;
        },

        /* Implementation to remove/destroy posts from a layer.
         * @method removePosts <public, abstract> [Function]
         */
        removePosts : function removePosts(layer) {
            var layers = this;

            if (layers.allowPostEditing) {
                layer.getPosts().forEach(function(post) {
                    post.unbind('dimensionsChanged', layers._reLayoutLayer);
                    post.unedit();
                });
            }

            layer.empty();

            return this;
        },

        /* Implementation to get the scroll height of the scrollable area.
         * @method getScrollHeight <protected, abstract> [Function]
         */
        getScrollHeight : function getScrollHeight() {
            return this.scrollableArea.scrollHeight;
        },

        /* Implementation to get the scroll top of the scrollable area.
         * @method getScrollTop <protected, abstract> [Function]
         */
        getScrollTop : function getScrollTop() {
            return this.scrollableArea.scrollTop;
        },

        /* Implementation to scroll to a y position of the scrollable area.
         * @method getScrollTo <protected, abstract> [Function]
         */
        scrollTo : function scrollTo(y) {
            this.scrollableArea.scrollTop = y;
        },

        /* dimensionsChanged custom event handler. Updates the posts position when
         * its dimentions has been changed. e.i. on edit mode » change the
         * description/title length
         * @method _reLayoutLayer <private> [Function]
         */
        _reLayoutLayer : function _reLayoutLayer(data) {
            data.layer.reLayout();
        },

        /* Implementation for custom bindings required by this subclass.
         * @method __bindEvents <protected, abstract> [Function]
         */
        __bindEvents : function __bindEvents() {
            this._socket.on('unapprovedMonthPosts', this._loadLayerRef);
            return this;
        },

        /* Implementation to remove custom bindings required by this subclass.
         * @method __destroy <protected, abstract> [Function]
         */
        __destroy : function __destroy() {
            this._socket.removeListener('unapprovedMonthPosts', this._loadLayerRef);
        }
    }
});
