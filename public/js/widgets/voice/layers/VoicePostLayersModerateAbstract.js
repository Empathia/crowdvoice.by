/* Subclass of VoicePostLayers
 * Declares the required abstract methods to handle the Voice Posts on Moderation Mode
 */
Class(CV, 'VoicePostLayersModerateAbstract').inherits(CV.VoicePostLayers)({
    prototype : {
        registry: CV.ModeratePostsRegistry,

        setup : function setup() {
            CV.VoicePostLayers.prototype.setup.call(this);
            this.registry.setup(this.postsCount);
            this.requestAll();
            return this;
        },

        getPostsRegistry : function getPostsRegistry(date) {
            return this.registry.get(date);
        },

        setPostsRegistry : function setPostsRegistry(date, posts) {
            this.registry.set(date, posts);
        },

        /* Implementation to request post data to the server.
         * @protected|abstract
         * @param {string} id - the voice id
         * @param {string} dateString - `YYYY-MM` formatted string of the Posts we are interested in.
         */
        request : function request(id, dateString, scrollDirection) {
            this._socket.emit('getUnapprovedMonthPosts', id, dateString, scrollDirection);
        },

        /* Iterates over every registry keys and checks if its value is empty,
         * if so it will ask for its values via socket.
         * @protected|abstract
         */
        requestAll : function requestAll() {
            var storedData = this.getPostsRegistry();
            Object.keys(storedData).forEach(function(propertyName) {
                var posts = storedData[propertyName];
                if (!posts) {
                    this.request(this.id, propertyName);
                }
            }, this);
        },

        /* Implementation to add and render posts to a layer.
         * @method addPosts <public, abstract> [Function]
         */
        addPosts : function addPosts(layer, postsData) {
            var layers = this;

            layer.addEditablePosts(postsData).getPosts().forEach(function(post) {
                // Voice Owner / Org Member / Contributor
                if (layers.allowPostEditing) {
                    post.edit().addImageControls().addRemoveButton().addButtonRow();
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

        /* Gets the scroll height of the scrollable area.
         * @method getScrollHeight <protected> [Function]
         */
        getScrollHeight : function getScrollHeight() {
            return this.scrollableArea.scrollHeight;
        },

        /* Gets the scroll top of the scrollable area.
         * @method getScrollTop <protected> [Function]
         */
        getScrollTop : function getScrollTop() {
            return this.scrollableArea.scrollTop;
        },

        /* Scroll to a y position of the scrollable area.
         * @method getScrollTo <protected> [Function]
         */
        scrollTo : function scrollTo(y) {
            this.scrollableArea.scrollTop = y;
        },

        /* dimensionsChanged custom event handler. Updates the posts position when
         * its dimentions has been changed. e.i. on edit mode » change the
         * description/title length
         * @method _reLayoutLayer <private> [Function]
         */
        _reLayoutLayer : function _reLayoutLayer(ev) {
            ev.stopPropagation();
            ev.layer.reLayout();
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
