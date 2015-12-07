/* globals App */
/* Subclass of VoicePostLayers
 * Declares the required abstract methods to handle the Voice Posts on Normal Mode
 */
var Person = require('./../../../lib/currentPerson');

Class(CV, 'VoicePostLayersVoiceAbstract').inherits(CV.VoicePostLayers)({
    prototype : {
        registry : CV.PostsRegistry,

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
            this._socket.emit('getApprovedMonthPosts', id, dateString, scrollDirection);
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
            if (Person.ownerOf('voice', App.Voice.data.id)) {
                layer.addEditablePosts(postsData).getPosts().forEach(function(post) {
                    post.addActions().addRemoveButton();
                });
            } else {
                layer.addPosts(postsData);
            }

            layer.filterPosts(App.Voice.voiceFooter.filterDropdown.getSelectedSourceTypes());
        },

        /* Implementation to remove/destroy posts from a layer.
         * @method removePosts <public, abstract> [Function]
         */
        removePosts : function removePosts(layer) {
            layer.empty();
            return this;
        },

        /* Gets the scroll height of the scrollable area.
         * @method getScrollHeight <protected> [Function]
         */
        getScrollHeight : function getScrollHeight() {
            return document.body.clientHeight;
        },

        /* Gets the scroll top of the scrollable area.
         * @method getScrollTop <protected> [Function]
         */
        getScrollTop : function getScrollTop() {
            return this.scrollableArea.pageYOffset;
        },

        /* Scroll to a y position of the scrollable area.
         * @method getScrollTo <protected> [Function]
         */
        scrollTo : function scrollTo(y) {
            this.scrollableArea.scrollY = y;
        },

        /* Implementation for custom bindings required by this subclass.
         * @method __bindEvents <protected, abstract> [Function]
         */
        __bindEvents : function __bindEvents() {
            this._socket.on('approvedMonthPosts', this._loadLayerRef);
            return this;
        },

        /* Implementation to remove custom bindings required by this subclass.
         * @method __destroy <protected, abstract> [Function]
         */
        __destroy : function __destroy() {
            this._socket.removeListener('approvedMonthPosts', this._loadLayerRef);
        }
    }
});
