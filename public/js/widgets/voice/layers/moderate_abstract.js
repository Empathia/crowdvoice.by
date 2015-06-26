Class(CV, 'VoicePostLayersModerateAbstract').inherits(CV.VoicePostLayers)({

    prototype : {

        /* Implementation to request post data to the server.
         * @method request <protected, abstract> [Function]
         */
        request : function request(id, dateString, scrollDirection) {
            this._socket.emit('getMonthPostsModerate', id, dateString, scrollDirection);
        },

        /* Implementation to add and render post to a layer.
         * @method addPosts <public, abstract> [Function]
         */
        addPosts : function addPosts(layer, postsData) {
            var layers = this;

            layer.addEditablePosts(postsData).getPosts().forEach(function(post) {
                // Voice Owner / Org Member / Contributor
                if (layer.allowPostEditing) {
                    return post.edit().addRemoveButton().addPublishButton();
                }

                // Visitor (posts list)
                return post.unmoderatedStyle().addVoteButtons();
            });

            layer.reLayout();

            return this;
        },

        /* Implementation to remove/destroy posts from a layer.
         * @method removePosts <public, abstract> [Function]
         */
        removePosts : function removePosts(layer) {
            layer.empty();
            return this;
        },

        /* Implementation for custom bindings required by this subclass.
         * @method __bindEvents <protected, abstract> [Function]
         */
        __bindEvents : function __bindEvents() {
            this._socket.on('monthPostsModerate', this._loadLayerRef);
            return this;
        },

        /* Implementation to remove custom bindings required by this subclass.
         * @method __destroy <protected, abstract> [Function]
         */
        __destroy : function __destroy() {
            this._socket.removeListener('monthPostsModerate', this._loadLayerRef);
        }
    }
});
