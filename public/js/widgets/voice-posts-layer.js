
var Waterfall = require('../lib/waterfall');

Class(CV, 'VoicePostsLayer').inherits(Widget)({
    HTML : '<div class="cv-voice-posts-layer"></div>',

    prototype : {
        /* OPTIONS */
        dateString : '',
        columnWidth : 350,

        /* PRIVATE PROPERTIES */
        _finalHeightIsKnow : false,
        waterfall : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.waterfall = new Waterfall({
                containerElement : this.el,
                columnWidth : this.columnWidth,
                gutter : 20,
                centerItems : true
            });

            this.el.dataset.date = this.dateString;
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
        }
    }
});
