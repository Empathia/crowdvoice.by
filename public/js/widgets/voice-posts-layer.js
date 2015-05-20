
var Waterfall = require('../lib/waterfall');

Class(CV, 'VoicePostsLayer').inherits(Widget)({
    HTML : '<div class="cv-voice-posts-layer"></div>',

    prototype : {
        /* OPTIONS */
        dateString : '',
        columnWidth : 350,

        /* PRIVATE PROPERTIES */
        _finalHeightIsKnow : false,
        _resizeTimer : null,
        _resizeTime : 250,
        _resizeHandlerRef : null,
        _window : null,
        waterfall : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._window = window;

            this.waterfall = new Waterfall({
                containerElement : this.el,
                columnWidth : this.columnWidth,
                gutter : 20,
                centerItems : true
            });

            this.el.dataset.date = this.dateString;

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._resizeHandlerRef = this.resizeHandler.bind(this);
            this._window.addEventListener('resize', this._resizeHandlerRef);
        },

        resizeHandler : function resizeHandler() {
            var _this = this;

            if (this._resizeTimer) this._window.clearTimeout(this._resizeTimer);

            this._resizeTimer = this._window.setTimeout(function() {
                if (_this.waterfall.getItems().length)
                    _this.waterfall.layout();
            }, this._resizeTime);
        },

        /* Sets the heigth of the layer. If a number is provided it will
         * convert it into pixel units.
         * @param height <required> [Number or String]
         * @method setHeight <public>
         */
        setHeight : function setHeight(height) {
            if (typeof height === 'number') {
                height = height + 'px';
            }

            this.el.style.height = height;
        },

        getHeight : function getHeight() {
            return this.el.clientHeight;
        },

        /* Create, append and render its post children.
         * @param posts <required> [Objact Array] Post Model data to create a
         *  new instance.
         * @return undefined
         */
        addPosts : function addPosts(posts) {
            var frag = document.createDocumentFragment();

            for (var i = 0, l = posts.length; i < l; i++) {
                posts[i].name = 'post_' + i;
                this.appendChild(CV.Post.create(posts[i])).render(frag);
            }

            this.waterfall.addItems([].slice.call(frag.childNodes, 0));
            this.el.appendChild(frag);
            this.waterfall.layout();

            this._finalHeightIsKnow = true;
        },

        /* Returns its children Posts instances.
         * @return posts
         */
        getPosts : function getPosts() {
            return this.children;
        },

        isFinalHeightKnow : function isFinalHeightKnow() {
            return this._finalHeightIsKnow;
        },

        /* Destroy all its posts children.
         * @return undefined
         */
        empty : function empty() {
            while (this.children.length > 0) {
                this.children[0].destroy();
            }

            this.waterfall.flushItems();
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this._window.removeEventListener('resize', this._resizeHandlerRef);
            this._resizeHandlerRef = null;

            this.waterfall.destroy();

            this.dateString = null;
            this.columnWidth = null;

            this._finalHeightIsKnow = false;
            this._resizeTimer = null;
            this._resizeTime = 250;
            this._resizeHandlerRef = null;
            this._window = null;
            this.waterfall = null;
        }
    }
});
