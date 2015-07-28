Class(CV, 'PostDetailControllerApproved').includes(NodeSupport, CustomEventSupport)({
    prototype : {
        _socket : null,

        widget : null,
        _type : null,
        _keys : null,
        _values : null,
        _currentMonthIndex : null,
        _currentIndex : null,

        registry : CV.PostsRegistry,

        init : function init(config) {
            this._socket = config._socket;

            this.appendChild(CV.PostDetail.create({name: 'widget', data: config.data}));

            this._type = this.widget.data.sourceType; /* link || image || video */

            if (this._type === "image" || this._type === "video") {
                this._type = ["image", "video"];
            } else {
                this._type = [this._type];
            }

            this._keys = this.registry.getKeys();
            this._values = this._keys.slice();

            this._currentMonthIndex = this._keys.indexOf(this.widget.data.parent.dateString);
            this._values[this._currentMonthIndex] = this.registry.get(this._keys[this._currentMonthIndex]).filter(function(post) {
                return this._type.some(function(type) {
                    if (post.sourceType === type) {
                        return post;
                    }
                });
            }, this);
            this._currentIndex = this._values[this._currentMonthIndex].map(function(post) {
                return post.id;
            }).indexOf(this.widget.data.id);

            this.update();

            this.widget.render(document.body).activate();

            this._requestSiblings()._bindEvents();
        },


        _bindEvents : function _bindEvents() {
            this._updateRegistryRef = this._updateRegistry.bind(this);
            this._socket.on('approvedMonthPosts', this._updateRegistryRef);

            this._nextHandlerRef = this._nextHandler.bind(this);
            this._prevHandlerRef = this._prevHandler.bind(this);

            this.bind('post:details:next', this._nextHandlerRef);
            this.bind('post:details:prev', this._prevHandlerRef);
        },

        _updateRegistry : function _updateRegistry(posts, dateString) {
            this.registry.set(dateString, posts);

            var index = this._values.indexOf(dateString);

            if (index >= 0) {
                this._values[index] = posts.filter(function(post) {
                    return this._type.some(function(type) {
                        if (post.sourceType === type) {
                            return post;
                        }
                    });
                }, this);
            }
        },

        _prevHandler : function _prevHandler() {
            if (this._currentIndex === 0) {
                if (this._currentMonthIndex === 0) {
                    // disable prev button
                    return void 0;
                }

                this._currentMonthIndex--;
                this._currentIndex = (this._values[this._currentMonthIndex].length - 1);
                this._requestSiblings();
                this.update();

                return void 0;
            }

            this._currentIndex--;
            this.update();
        },

        _nextHandler : function _nextHandler() {
            if (this._currentIndex === this._values[this._currentMonthIndex].length - 1) {
                if (this._currentMonthIndex === (this._keys.length - 1)) {
                    // disable next button
                    return void 0;
                }

                this._currentMonthIndex++;
                this._currentIndex = 0;
                this._requestSiblings();
                this.update();

                return void 0;
            }

            this._currentIndex++;
            this.update();
        },

        /* Requests the next and prev months data to the socket.
         * @method _requestSiblings <private> [function]
         */
        _requestSiblings : function _requestSiblings() {
            var prev = this._keys[this._currentMonthIndex - 1];
            var next = this._keys[this._currentMonthIndex + 1];

            if (prev && (!this.registry.get(prev))) {
                this._socket.emit('getApprovedMonthPosts', App.Voice.id, prev);
            }

            if (next && (!this.registry.get(next))) {
                this._socket.emit('getApprovedMonthPosts', App.Voice.id, next);
            }

            return this;
        },

        update : function update() {
            var post = this._values[this._currentMonthIndex][this._currentIndex];
            this.widget.update(post);
        },

        destroy : function destroy() {
            this.widget = this.widget.destroy();
            this._socket.removeListener('approvedMonthPosts', this._updateRegistry);
            return null;
        }
    }
});