Class(CV, 'VoicePostLayersModerateManager').inherits(CV.VoicePostLayers)({
    prototype : {
        request : function request(id, dateString, scrollDirection) {
            this._socket.emit('getMonthPostsModerate', id, dateString, scrollDirection);
        },

        addPosts : function addPosts(layer, postsData) {
            layer.addEditablePosts(postsData).getPosts().forEach(function(post) {
                // @TODO: add conditionals

                post.loadImage();
                post.edit();

                // Voice Owner / Org Member / Contributor
                // post.addRemoveButton();
                // post.addPublishButton();

                // Visitor (posts list)
                post.addVoteButtons();
            });

            layer.reLayout();

            return this;
        },

        __bindEvents : function __bindEvents() {
            this._socket.on('monthPostsModerate', this._loadLayerRef);
            return this;
        },

        __destroy : function __destroy() {
            this._socket.removeListener('monthPostsModerate', this._loadLayerRef);
        }
    }
});
