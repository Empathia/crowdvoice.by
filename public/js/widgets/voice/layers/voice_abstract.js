Class(CV, 'VoicePostLayersVoiceAbstract').inherits(CV.VoicePostLayers)({
    prototype : {
        request : function request(id, dateString, scrollDirection) {
            this._socket.emit('getMonthPosts', id, dateString, scrollDirection);
        },

        addPosts : function addPosts(layer, postsData) {
            layer.addPosts(postsData);
        },

        __bindEvents : function __bindEvents() {
            this._socket.on('monthPosts', this._loadLayerRef);
            return this;
        },

        __destroy : function __destroy() {
            this._socket.removeListener('monthPosts', this._loadLayerRef);
        }
    }
});
