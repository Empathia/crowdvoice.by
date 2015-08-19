Class(CV, 'PostDetailControllerSaved').includes(NodeSupport, CustomEventSupport)({
    prototype : {
        _index : 0,
        _posts : null,
        _postsLen : 0,

        init : function init(config) {
            this._posts = config.posts;
            this._postsLen = this._posts.length;

            this.appendChild(CV.PostDetail.create({
                name: 'widget',
                data: config.data
            }));
            this._type = this.widget.data.sourceType; /* link || image || video */

            if (this._type === "image" || this._type === "video") {
                this._type = ["image", "video"];
            } else {
                this._type = [this._type];
            }

            this._posts = this._posts.filter(function(post) {
                return this._type.some(function(type) {
                    if (post.sourceType === type) {
                        return post;
                    }
                });
            }, this);

            this._posts.some(function(post, index) {
                if (config.data.id === post.id) {
                    this._index = index;
                    return true;
                }
            }, this);

            this._postsLen = this._posts.length;

            this.update();
            this.widget.updatedPosts(this._posts);

            this.widget.render(document.body);
            requestAnimationFrame(function() {
                this.widget.activate();
            }.bind(this));

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this.nextHandlerRef = this.nextHandler.bind(this);
            this.prevHandlerRef = this.prevHandler.bind(this);

            this.bind('post:details:next', this.nextHandlerRef);
            this.bind('post:details:prev', this.prevHandlerRef);
        },

        update : function update() {
            this.widget.update(this._posts[this._index]);
        },

        /* Prev button click handler.
         * @method prevHandler <protected> [Function]
         */
        prevHandler : function prevHandler(ev) {
            ev.stopPropagation();
            if (this._index === 0) {
                return;
            }

            this._index--;
            this.update();
        },

        /* Next button click handler.
         * @method nextHandler <protected> [Function]
         */
        nextHandler : function nextHandler(ev) {
            ev.stopPropagation();

            if (this._index === (this._postsLen - 1)) {
                return;
            }

            this._index++;
            this.update();
        },

        destroy : function destroy() {
            this.widget = this.widget.destroy();
            return null;
        }
    }
});

