Class(CV, 'PostDetailController').includes(NodeSupport, CustomEventSupport)({
    prototype : {
        socket : null,

        widget : null,
        /* Holds the monthStrings found on the registry.
        * @property keys <protected> [Array]
        */
        keys : null,
        _type : null,
        _values : null,
        _totalMonthsLen : 0,
        _currentMonthIndex : null,
        _currentIndex : null,

        /* @property registry <protected, abstract>
         */
        registry : null,

        init : function init(config) {
            this.socket = config.socket;
            this.appendChild(CV.PostDetail.create({name: 'widget', data: config.data}));
            this._type = this.widget.data.sourceType; /* link || image || video */

            if (this._type === "image" || this._type === "video") {
                this._type = ["image", "video"];
            } else {
                this._type = [this._type];
            }

            this.keys = this.registry.getKeys();
            this._values = this.keys.map(function() {return [];});
            this._totalMonthsLen = this.keys.length;

            this._currentMonthIndex = this.keys.indexOf(this.widget.data.parent.dateString);
            this.updateValues(this._currentMonthIndex, this.registry.get(this.keys[this._currentMonthIndex]));
            this._currentIndex = this._values[this._currentMonthIndex].map(function(post) {
                return post.id;
            }).indexOf(this.widget.data.id);

            this.update();
            this.widget.render(document.body).activate();
            this._requestSiblings(this._currentMonthIndex);
        },

        _bindEvents : function _bindEvents() {
            this.updateRegistryRef = this.updateRegistry.bind(this);

            this.nextHandlerRef = this.nextHandler.bind(this);
            this.prevHandlerRef = this.prevHandler.bind(this);

            this.bind('post:details:next', this.nextHandlerRef);
            this.bind('post:details:prev', this.prevHandlerRef);
        },

        /* Updates the registry (defined by the subclass)
         * @method updateRegistry <protected> [Function]
         */
        updateRegistry : function updateRegistry(posts, dateString) {
            this.registry.set(dateString, posts);

            var index = this.keys.indexOf(dateString);
            if (index >= 0) {
                this.updateValues(index, posts);
            }
        },

        /* @method updateValues <protected> [Function]
         */
        updateValues : function updateValues(index, posts) {
            if ((index < 0) || (index > this._totalMonthsLen)) {
                return void 0;
            }

            this._values[index] = posts.filter(function(post) {
                return this._type.some(function(type) {
                    if (post.sourceType === type) {
                        return post;
                    }
                });
            }, this);

            if (this._values[index].length === 0) {
                this._requestSiblings(index);
            }
        },

        update : function update() {
            var post = this._getCurrent();
            this.widget.update(post);
        },

        /* Prev button click handler.
         * @method prevHandler <protected> [Function]
         */
        prevHandler : function _revHandler() {
            if (this._currentIndex === 0) {
                if (this._currentMonthIndex === 0) {
                    // disable prev button
                    return void 0;
                }

                this._currentMonthIndex--;
                this._currentIndex = 0;

                var childLength = this._values[this._currentMonthIndex].length;
                if (childLength) {
                    this._currentIndex = (childLength - 1);
                } else {
                    return this.prevHandler();
                }

                return this._requestSiblings(this._currentMonthIndex).update();
            }

            this._currentIndex--;
            this.update();
        },

        /* Next button click handler.
         * @method nextHandler <protected> [Function]
         */
        nextHandler : function nextHandler() {
            if (this._currentIndex === this._values[this._currentMonthIndex].length - 1) {
                if (this._currentMonthIndex === (this._totalMonthsLen - 1)) {
                    // disable next button
                    return void 0;
                }

                this._currentMonthIndex++;
                this._currentIndex = 0;

                var childLength = this._values[this._currentMonthIndex].length;
                if (!childLength) {
                    return this.nextHandler();
                }

                return this._requestSiblings(this._currentMonthIndex).update();
            }

            this._currentIndex++;
            this.update();
        },

        _getCurrent : function _getCurrent() {
            return this._values[this._currentMonthIndex][this._currentIndex];
        }
    }
});

