var moment = require('moment');
var Events = require('./../lib/events');

Class(CV, 'EmbedLayersController').includes(NodeSupport)({
  prototype : {
    averagePostTotal : 50,
    averagePostWidth : 300,
    averagePostHeight : 500,

    _resizeTimer : null,
    _resizeTime : 250,
    _scrollTimer : null,
    _scrollTime : 250,
    SWITCH_HEADER_MIN_WIDTH : 360,

    /**
     * @param {Object} config - the configuration object
     * @property {HTMLElement} el - the element to append each one of the  layers.
     * @property {Object} config.voiceData - the active voice data passed  through the VoicesPresenter.
     * @property {string} config.viewType - the current post view type (selected on the embeddable widget configuration and updated by the buttons group view on the header.
     * @property {Object} config.registry - the registry to use to set/get the Posts data.
     * @property {string} config.firstPostDate - the voice’s first published post date.
     * @property {string} config.lastPostDate - the voice’s last published post date.
     * @property {Object} socket - the socket instance to use to fetch the data.
     */
    init : function init (config) {
      Object.keys(config).forEach(function (propertyName) {
        this[propertyName] =  config[propertyName];
      }, this);

      this._body = document.body;
      this._window = window;
      this._lastScrollTop = 0;
      this._listenScrollEvent = true;
      this._averageLayerHeight = 0;
      this._lazyLoadingImageArray = [];
      this.switchHeaderTitleHeight = (
        document.querySelector('header').offsetHeight +
        document.querySelector('.voice-title').offsetHeight
      );
      this.headerMetaElement = document.querySelector('.header-meta');

      this.registry.setup(this.postsCount);

      this._setGlobarVars();
      this._bindEvents()._createEmptyLayers(this.postsCount)._requestAll();

      this._beforeRequest(this.children[0].dateString);
    },

    /* Subscribe the widget’s events and the widget’s children events if needed.
     * @private
     */
    _bindEvents : function _bindEvents() {
      this._scrollHandlerRef = this._scrollHandler.bind(this);
      Events.on(this._window, 'scroll', this._scrollHandlerRef);

      this._resizeHandlerRef = this._resizeHandler.bind(this);
      Events.on(this._window, 'resize', this._resizeHandlerRef);

      this._loadLayerRef = this.loadLayer.bind(this);
      this.socket.on('approvedMonthPosts', this._loadLayerRef);
      return this;
    },

    /* Handle the scrollableArea scroll event.
     * @private
     */
    _scrollHandler : function _scrollHandler() {
      var st = this._window.scrollY;
      var scrollingUpwards = (st < this._lastScrollTop);
      var y = 0;
      var el;

      if (!this._listenScrollEvent) { return; }
      if (!scrollingUpwards) { y = (this._windowInnerHeight - 1); }

      el = document.elementFromPoint(1, y);

      if (el.classList.contains('posts-layer__detector')) {
        if (el.dataset.date !== this._currentMonthString) {
          this.fillLayer(el.dataset.date, scrollingUpwards);
        }
      }

      /* header title transition */
      if (this._availableWidth >= this.SWITCH_HEADER_MIN_WIDTH) {
        if (st < this.switchHeaderTitleHeight) {
          if (this.headerMetaElement.classList.contains('active')) {
            this.headerMetaElement.classList.remove('active');
          }
        } else if (st > this.switchHeaderTitleHeight) {
          if (!this.headerMetaElement.classList.contains('active')) {
            this.headerMetaElement.classList.add('active');
          }
        }
      }

      this._lastScrollTop = st;

      if (this._scrollTimer) { this._window.clearTimeout(this._scrollTimer); }
    },

    /* Handle the window resize event.
     * @private
     */
    _resizeHandler : function _resizeHandler() {
      var _this = this;

      if (this._resizeTimer) {
          this._window.clearTimeout(this._resizeTimer);
      }

      this._resizeTimer = this._window.setTimeout(function() {
          _this.update();
      }, this._resizeTime);
    },

    filterItems : function filterItems (sourceTypes) {
      this.children.forEach(function(layer) {
        var posts = layer.getPosts();
        if (posts.length) {
          layer.filterPosts(sourceTypes, this.viewType);
        }
      }, this);
      return this;
    },

    updateView : function updateView (viewType) {
      if (viewType === this.viewType) { return; }

      this.viewType = viewType;

      this.children.forEach(function (layer) {
        if (layer.getPosts().length) {
          this.removePosts(layer);
          this.addPosts(layer, this.getPostsRegistry(layer.dateString));
        }
      }, this);
    },

    /* Update globar variables and every layer with posts.
     * @public
     */
    update : function update () {
      this._setGlobarVars()._updateLayers();
      return this;
    },

    /* Load a layer’s posts silently
     * @private
     */
    fillLayer : function fillLayer (dateString, scrollDirection) {
      this._listenScrollEvent = false;
      this._beforeRequest(dateString, scrollDirection);
      this._listenScrollEvent = true;
    },

    getPostsRegistry : function getPostsRegistry(date) {
      return this.registry.get(date);
    },

    setPostsRegistry : function setPostsRegistry(date, posts) {
      this.registry.set(date, posts);
    },

    request : function request(id, dateString) {
      this.socket.emit('getApprovedMonthPosts', id, dateString);
    },

    loadLayer : function loadLayer(postsData, dateString, scrollDirection) {
      if (!this.getPostsRegistry(dateString)) {
        this.setPostsRegistry(dateString, postsData);
      }

      if (dateString !== this._currentMonthString) { return; }
      if (this['layer_' + dateString].getPosts().length) { return; }

      var currentLayer = this.getCurrentMonthLayer();
      var prev = currentLayer.getPreviousSibling();
      var next = currentLayer.getNextSibling();
      var calculateScrollDiff = false;
      var oldScrollHeight = 0;
      var oldScrollY = 0;

      if (scrollDirection && !currentLayer._finalHeightIsKnow) {
          calculateScrollDiff = true;
          oldScrollHeight = this._body.clientHeight;
          oldScrollY = this._body.scrollTop;
      }

      this.addPosts(currentLayer, postsData);

      if (scrollDirection) {
        var next2 = next && next.getNextSibling();
        if (next2 && (next2.getPosts().length > 20)) { this.removePosts(next2); }

        if (calculateScrollDiff) {
          var newScrollHeight = this._body.clientHeight;
          var newScrollY = this._body.scrollTop;
          var scrollHeightDiff = (oldScrollHeight - newScrollHeight);
          var scrollYDiff = (oldScrollY - newScrollY);
          var diff = (newScrollY - (scrollHeightDiff - scrollYDiff));

          this._listenScrollEvent = false;
          this._window.scrollTo(0, diff);
          this._listenScrollEvent = true;
        }

        return;
      }

      var prev2 = prev && prev.getPreviousSibling();
      if (prev2 && (prev2.getPosts().length) > 20) { this.removePosts(prev2); }
    },

    addPosts : function addPosts(layer, postsData) {
      layer.addPosts(postsData, this.viewType);
      layer.filterPosts(this.parent.header.filterDropdown.getSelectedSourceTypes(), this.viewType);
    },

    /* Remove/destroy posts from a layer.
     */
    removePosts : function removePosts(layer) {
      layer.empty();
      return this;
    },

    getCurrentMonthLayer : function getCurrentMonthLayer() {
      return this['layer_' + this._currentMonthString];
    },

    /* Creates all the required empty post layers. They will get set a default
     * height (even if empty) to display an approximated total height on the page
     * and give the illusion that the page have more content using the scrollbar
     * as visual feedback. This should encourage users to scroll down and discover
     * more content.
     * @private
     */
    _createEmptyLayers : function _createEmptyLayers(formattedPosts) {
      var fragment = document.createDocumentFragment();

      formattedPosts.forEach(function (yearItem) {
        var year = yearItem.year;

        yearItem.months.forEach(function (monthItem, index) {
          var dateString = moment(year + '-' + monthItem.month + '-01', 'YYYY-MM-DD').format('YYYY-MM');

          this.appendChild(new CV.EmbedLayer({
            name : 'layer_' + dateString,
            id : index,
            dateString : dateString
          }));

          this['layer_' + dateString].setHeight(this._averageLayerHeight);

          fragment.appendChild(this['layer_' + dateString].el);
        }, this);
      }, this);

      this.el.appendChild(fragment);

      return this;
    },

    _requestAll : function _requestAll() {
      var storedData = this.registry.get();
      Object.keys(storedData).forEach(function(propertyName) {
        var posts = storedData[propertyName];
        if (!posts) { this.request(this.voiceData.id, propertyName); }
      }, this);
    },

    _beforeRequest : function _beforeRequest(dateString, scrollDirection) {
      if (dateString === this._currentMonthString) {
        return;
      }

      this._currentMonthString = dateString;

      // prevent to append childs if the layer is already filled
      if (this['layer_' + dateString].getPosts().length) {
        return;
      }

      // load from cache
      var posts = this.getPostsRegistry(dateString);
      if (posts) {
        return this.loadLayer(posts, dateString, scrollDirection);
      }

      // request to the server
      this.request(this.id, dateString, scrollDirection);
    },

    /* Sets the value to the _averageLayerHeight property.
     * @private
     */
    _updateAverageLayerHeight : function _updateAverageLayerHeight () {
      this._averageLayerHeight = ~~(this.averagePostTotal * this.averagePostHeight / ~~(this._availableWidth / this.averagePostWidth));
      return this;
    },

    _updateLayers : function _updateLayers() {
      this.children.forEach(function (layer) {
        layer.reLayout({ averageHeight : this._averageLayerHeight });
      }, this);
    },

    _setGlobarVars : function _setGlobarVars() {
      this._windowInnerHeight = this._window.innerHeight;
      this._availableWidth = this._window.innerWidth;
      this._updateAverageLayerHeight();
      this._scrollHeight = this._body.clientHeight;
      return this;
    }
  }
});
