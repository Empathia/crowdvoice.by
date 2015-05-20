
var moment = require('moment');
var Waterfall = require('../lib/waterfall');

Class(CV, 'VoicePostsLayer').inherits(Widget)({
    HTML : '\
        <div class="cv-voice-posts-layer">\
            <div class="cv-voice-posts-layer__posts"></div>\
            <div class="cv-voice-posts-layer__ticks"></div>\
        </div>',

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

        _postWidgets : [],
        _tickWidgets : [],

        waterfall : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._window = window;
            this.postContainerElement = this.el.querySelector('.cv-voice-posts-layer__posts');
            this.ticksContainerElement = this.el.querySelector('.cv-voice-posts-layer__ticks');

            this.waterfall = new Waterfall({
                containerElement : this.postContainerElement,
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

            this.postContainerElement.style.height = height;
        },

        getHeight : function getHeight() {
            return this.postContainerElement.clientHeight;
        },

        /* Create, append and render its post children.
         * @param posts <required> [Objact Array] Post Model data to create a
         *  new instance.
         * @return undefined
         */
        addPosts : function addPosts(posts) {
            var fragPosts = document.createDocumentFragment();

            //this._postWidgets = [];

            for (var i = 0, l = posts.length; i < l; i++) {
                // extend instance's data
                posts[i].name = 'post_' + i;

                var post = CV.Post.create(posts[i]);
                post.el.dataset.date = moment(posts[i].createdAt).format('YYYY-MM-DD');

                this.appendChild(post).render(fragPosts);
                //this._postWidgets.push(post);
                //post.render(fragPosts);

                post = null;
            }

            this.waterfall.addItems([].slice.call(fragPosts.childNodes, 0));
            this.postContainerElement.appendChild(fragPosts);
            this.waterfall.layout();
            //this._addTicks();

            this._finalHeightIsKnow = true;

            fragPosts = null;
        },

        /*
        _addTicks : function _addTicks() {
            var i = 0;
            var len = this._postWidgets.length;
            var fragTicks = document.createDocumentFragment();

            this._tickWidgets = [];

            for (i = 0; i < len; i++) {
                var tick = new CV.VoicePostTick();

                this._tickWidgets.push(tick);
                tick.render(fragTicks);
            }

            this.ticksContainerElement.appendChild(fragTicks);

            i = len = fragTicks = null;
        },
        */

        /* Returns its children Posts instances.
         * @return posts
         */
        getPosts : function getPosts() {
            return this.children;
            //return this._postWidgets;
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

            this._postWidgets.forEach(function(post) {
                post.destroy();
            });

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
