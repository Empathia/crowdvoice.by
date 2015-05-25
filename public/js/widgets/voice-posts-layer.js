
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

        _postWidgets : null,
        _tickWidgets : null,

        postContainerElement : null,
        ticksContainerElement : null,
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

            this._postWidgets = [];

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
            this._finalHeightIsKnow = false;
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
            var frag = document.createDocumentFragment();
            var i = 0;
            var len = posts.length;
            var post;

            for (i = 0; i < len; i++) {
                // extend instance's data
                posts[i].name = 'post_' + i;

                post = CV.Post.create(posts[i]);
                post.el.dataset.date = moment(posts[i].createdAt).format('YYYY-MM-DD');

                this.appendChild(post).render(frag);

                this._postWidgets.push(post);
            }

            this.waterfall.addItems([].slice.call(frag.childNodes, 0));
            this.postContainerElement.appendChild(frag);
            this.waterfall.layout();

            this._addPostIndicators(this._postWidgets);

            this._finalHeightIsKnow = true;

            frag = i = len = post = null;

            return this;
        },

        /* Create, append and render the posts dates indicators shown on the
         * far right of the screen.
         * @private
         * This function is invoked by `addPosts` public method.
         * @param posts <required> [Object Array] Post instances references.
         * @return undefined
         */
        _addPostIndicators : function _addPostIndicators(posts) {
            var frag = document.createDocumentFragment();
            var i = 0;
            var len = posts.length;
            var indicator, firstYearMonthCoincidence, currentYearMonth;

            for (i = 0; i < len; i++) {
                currentYearMonth = posts[i].el.dataset.date.match(/\d{4}-\d{2}/)[0];

                indicator = new CV.VoicePostTick({
                    label : posts[i].el.dataset.date,
                    refElement : posts[i].el,
                    zIndex : len - i
                });

                this.appendChild(indicator).render(frag);

                if (firstYearMonthCoincidence !== currentYearMonth) {
                    firstYearMonthCoincidence = currentYearMonth;
                    indicator.activate();
                }
            }

            this.ticksContainerElement.appendChild(frag);

            frag = i = len = indicator = firstYearMonthCoincidence = currentYearMonth = null;
        },

        /* Returns its children Posts instances.
         * @return posts
         */
        getPosts : function getPosts() {
            return this._postWidgets;
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

            this._postWidgets = [];

            return this;
        },

        arrangeBringToFront : function arrangeBringToFront() {
            this.el.style.zIndex = 1;

            return this;
        },

        arrangeReset : function arrangeReset() {
            this.el.style.zIndex = "";

            return this;
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
            this._postWidgets = null;

            this.waterfall = null;
        }
    }
});
