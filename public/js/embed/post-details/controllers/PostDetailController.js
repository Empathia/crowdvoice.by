var moment = require('moment');

Class(CV, 'PostDetailController').includes(NodeSupport, CustomEventSupport)({
  prototype : {
    /* Holds an array with the year-months as strings found on the specified registry.
     * @private {Array<string>} - ['2015-01', '2015-02']
     */
    keys : null,

    _values : null,
    _totalMonthsLen : 0,
    _currentMonthIndex : null,
    _currentIndex : null,

    /* @param {Object} config
     * @param {Object} config.socket - the Socket instance
     * @param {Object} config.registry - the registry to use to temporary store and read the data from.
     * @param {Object} config.postData - the Post Instance
     * @param {string} config.requestPostsSocketEventName - the name of
     *  the socket event to emit in order to requests the posts data.
     * @param {string} config.responsePostsSocketEventName - the name of
     *  the socket event to bind to receive the posts data as response.
     */
    init : function init(config) {
      Object.keys(config || {}).forEach(function (propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      this._setup()._bindEvents();
    },

    /* Add widget’s children and sets initial values.
     * @private
     * @return {Object} this
     */
    _setup : function _setup() {
      this.appendChild(new CV.PostDetail({
        name: 'postDetailWidget',
        data: this.postData
      })).render(document.body);

      this.appendChild(new CV.PostDetailNavigation({
        name: 'navigation',
        className: '-full-height',
        renderTo: this.postDetailWidget.el
      }));

      this.keys = this.registry.getKeys();
      this._values = this.keys.map(function() {return [];});
      this._totalMonthsLen = this.keys.length;

      var dateString = moment(this.postData.publishedAt).format('YYYY-MM');
      this._currentMonthIndex = this.keys.indexOf(dateString);
      var storedData = this.registry.get();
      Object.keys(storedData).forEach(function(propertyName, index) {
        var posts = storedData[propertyName];
        if (posts && posts.length) {
          this.updateValues(index, posts);
        }
      }, this);
      this._currentIndex = this._values[this._currentMonthIndex].map(function(post) {
        return post.id;
      }).indexOf(this.postDetailWidget.data.id);

      this.update();

      requestAnimationFrame(function() {
        this.postDetailWidget.activate();
      }.bind(this));

      this._requestAll();

      return this;
    },

    /* Updates the current month and post indexes based on the post publishedAt value.
     * @public
     * @param {Object} post - a post instance
     * @return {Object} this
     */
    setIndexes : function setIndexes(post) {
      var dateString = moment(post.publishedAt).format('YYYY-MM');

      this._currentMonthIndex = this.keys.indexOf(dateString);
      this._currentIndex = this._values[this._currentMonthIndex].map(function(post) {
        return post.id;
      }).indexOf(post.id);

      return this;
    },

    /* Subscribe to the default PostDetailController events.
     * This method might be overriden by any subclass, but also called using super.
     * @protected|abstract
     * @listens {post:details:next}
     * @listens {post:details:prev}
     */
    _bindEvents : function _bindEvents() {
      this.updateRegistryRef = this.updateRegistry.bind(this);
      this.socket.on(this.requestPostsSocketEventName, this.updateRegistryRef);

      this.nextHandlerRef = this.nextHandler.bind(this);
      this.prevHandlerRef = this.prevHandler.bind(this);

      this.bind('nextPostDetail', this.nextHandlerRef);
      this.bind('prevPostDetail', this.prevHandlerRef);

      return this;
    },

    /* Iterates over every registry key and checks if its value is empty,
     * if so it will ask for its values via socket.
     * @private
     */
    _requestAll : function _requestAll() {
      var storedData = this.registry.get();
      Object.keys(storedData).forEach(function(propertyName) {
        var posts = storedData[propertyName];
        if (!posts) {
          this.socket.emit(this.responsePostsSocketEventName, this.postData.voice.id, propertyName);
        }
      }, this);
    },

    /* Checks if previous and next months data is already stored on the registry,
     * if the data is found on the registry it will update `super._values`
     * otherwise it will request the month data to the socket.
     * @private
     * @return {Object} PostDetailController
     */
    requestSiblings : function requestSiblings(monthIndex) {
      var prevMonthString = this.keys[monthIndex - 1];
      var nextMonthString = this.keys[monthIndex + 1];
      var prev, next;

      if (prevMonthString) {
        prev = this.registry.get(prevMonthString);
        if (!prev) {
          this.socket.emit(this.responsePostsSocketEventName, this.postData.voice.id, prevMonthString);
        } else {
          this.updateValues(this.keys.indexOf(prevMonthString), prev);
        }
      }

      if (nextMonthString) {
        next = this.registry.get(nextMonthString);
        if (!next) {
          this.socket.emit(this.responsePostsSocketEventName, this.postData.voice.id, nextMonthString);
        } else {
          this.updateValues(this.keys.indexOf(nextMonthString), next);
        }
      }

      return this;
    },

    /* Updates the registry.
     * @private
     * @param {Array} posts - the posts’ data
     * @param {string} dateString - the year-month key to save the posts.
     */
    updateRegistry : function updateRegistry(posts, dateString) {
      this.registry.set(dateString, posts);

      var index = this.keys.indexOf(dateString);
      if (index >= 0) {
        this.updateValues(index, posts);
      }
    },

    /* Updates `_values` array specific index value.
     * @protected
     * @param {number} index - the month position on the array.
     * @param {array} posts - the month posts data.
     */
    updateValues : function updateValues(index, posts) {
      if ((index < 0) || (index > this._totalMonthsLen)) {
        return;
      }

      this._values[index] = posts;

      if (this._values[index].length === 0) {
        this.requestSiblings(index);
      }

      this.postDetailWidget.updatedPosts(this._values.reduce(function(p, n) {
        return p.concat(n);
      }));
    },

    /* Updates the postDetailWidget using the data stored on `_values` on the index
     * indicated by `_currentIndex` value.
     * @private
     */
    update : function update() {
      var current = this._getCurrentPost();

      if (current) {
        this.postDetailWidget.update(current);
        this._updateNavButtonsState();
      }
    },

    /* Prev button click handler.
     * @protected
     */
    prevHandler : function prevHandler(ev) {
      ev.stopPropagation();
      this._updateNavButtonsState();

      if (this._currentIndex === 0) {
        if (this._currentMonthIndex === 0) {
          return;
        }

        this._currentMonthIndex--;
        this._currentIndex = 0;

        var childLength = this._values[this._currentMonthIndex].length;
        if (childLength) {
          this._currentIndex = (childLength - 1);
        } else {
          return this.prevHandler();
        }

        return this.requestSiblings(this._currentMonthIndex).update();
      }

      this._currentIndex--;
      this.update();
    },

    /* Next button click handler.
     * @protected
     */
    nextHandler : function nextHandler(ev) {
      ev.stopPropagation();
      this._updateNavButtonsState();

      if (this._currentIndex === this._values[this._currentMonthIndex].length - 1) {
        if (this._currentMonthIndex === (this._totalMonthsLen - 1)) {
          return;
        }

        this._currentMonthIndex++;
        this._currentIndex = 0;

        var childLength = this._values[this._currentMonthIndex].length;
        if (!childLength) {
          return this.nextHandler();
        }

        return this.requestSiblings(this._currentMonthIndex).update();
      }

      this._currentIndex++;
      this.update();
    },

    /* Updates the next and prev navigation button state (disable|enable).
     * @private
     */
    _updateNavButtonsState : function _updateNavButtonsState() {
      if ((this._currentIndex === 0) && this._currentMonthIndex === 0) {
        this.navigation.disablePrevButton();
      } else {
        this.navigation.enablePrevButton();
      }

      if ((this._currentIndex === this._values[this._currentMonthIndex].length - 1) &&
        (this._currentMonthIndex === (this._totalMonthsLen - 1))) {
        this.navigation.disableNextButton();
      } else {
        this.navigation.enableNextButton();
      }

      return this;
    },

    /* Returns the current month’s data indicated by `_currentMonthIndex` and `_currentIndex`.
     * @private
     * @return {Object} PostInstance
     */
    _getCurrentPost : function _getCurrentPost() {
      return this._values[this._currentMonthIndex][this._currentIndex];
    },

    destroy : function destroy() {
      this.unbind('nextPostDetail', this.nextHandlerRef);
      this.unbind('prevPostDetail', this.prevHandlerRef);
      this.postDetailWidget = this.postDetailWidget.destroy();
      this.socket.removeListener(this.requestPostsSocketEventName, this.updateRegistryRef);
      return null;
    }
  }
});

