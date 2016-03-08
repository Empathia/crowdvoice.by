var SavedPostsStore = require('../../stores/SavedPostsStore')
  , Events = require('../../lib/events');

Class(CV, 'SavedPostsManager').inherits(Widget)({
  ELEMENT_CLASS: 'saved-posts-wrapper',
  MIN_LAYERS_POST: 20,

  prototype: {
    averagePostTotal: 50,
    averagePostWidth: 300,
    averagePostHeight: 500,

    /* layer offset left to perform hit-test on layer elements
     * sidebar = 60, main-container-padding-left = 40
     */
    _layersOffsetLeft: 80,
    _lastScrollTop: 0,

    _resizeTimer: null,
    _resizeTime: 500,

    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this._body = document.body;
      this._window = window;
      this._averageLayerHeight = 0;
      this._currentPageNumber = 0;

      this.appendChild(new CV.SavedPostsFooter({
        name: 'footer',
        totalPosts: this.totalPosts
      })).render(document.querySelector('.cv-main-content'));

      this._updateGlobalVars();
      SavedPostsStore.run();
      this._createEmptyLayers(this.pagesApproved)._bindEvents();
      this.registry.setup(this.pagesApproved);
      SavedPostsStore.getSavedPostsPage(this._currentPageNumber);
    },

    /* Subscribe the widget’s events and the widget’s children events if needed.
     */
    _bindEvents: function _bindEvents() {
      SavedPostsStore.bind('gotSavedPosts', this._gotSavedPostsHandler.bind(this));

      this._scrollHandlerRef = this._scrollHandler.bind(this);
      Events.on(this._window, 'scroll', this._scrollHandlerRef);

      this._resizeHandlerRef = this._resizeHandler.bind(this);
      Events.on(this._window, 'resize', this._resizeHandlerRef);

      this._displayContentViewerRef = this._displayContentViewer.bind(this);
      this.bind('post:display:detail', this._displayContentViewerRef);

      this.footer.bind('filterPosts', function (ev) {
        ev.stopPropagation();
        this.filterItems(ev.sourceTypes);
      }.bind(this));

      return this;
    },

    _gotSavedPostsHandler: function _gotSavedPostsHandler(res) {
      if (this._currentPageNumber !== res.pageNumber) return;

      var layer = this.getCurrentMonthLayer();
      this.addPosts(layer, res.posts);
      this.registry.set(this._currentPageNumber, res.posts);
    },

    _scrollHandler: function _scrollHandler() {
      var st = this._window.pageYOffset
        , scrollingUp = (st < this._lastScrollTop)
        , y = 0
        , el, page;

      if (!scrollingUp) y = (this._windowInnerHeight - 1);
      el = document.elementFromPoint(this._layersOffsetLeft, y);
      page = el.dataset.page;

      if (typeof page === 'string') {
        page = ~~page;
        if (page !== this._currentPageNumber) {
          this._currentPageNumber = page;
          SavedPostsStore.getSavedPostsPage(this._currentPageNumber, scrollingUp);
        }
      }

      this._lastScrollTop = st;
    },

    /* Renders the PostDetail Content Viewer Overlay
    */
    _displayContentViewer: function _displayContentViewer(ev) {
      ev.stopPropagation();

      if (this.postDetailController) {
        this.postDetailController = this.postDetailController.destroy();
      }

      this.postDetailController = new CV.PostDetailController({
        socket: this.socket,
        postData: ev.data,
        registry: CV.VoicePagesRegistry,
        requestPostsSocketEventName: 'savedPostsPage',
        responsePostsSocketEventName: 'getSavedPostsPage'
      });

      this.postDetailController.postDetailWidget.bind('deactivate', function() {
        this.postDetailController = this.postDetailController.destroy();
      }.bind(this));
    },

    _resizeHandler: function _resizeHandler() {
      if (this._resizeTimer) { this._window.clearTimeout(this._resizeTimer); }

      this._resizeTimer = this._window.setTimeout(function(_this) {
          _this.update();
      }, this._resizeTime, this);
    },

    /* Update globar variables and every layer with posts.
     */
    update: function update () {
      this._updateGlobalVars()._updateLayers();
      return this;
    },

    _updateLayers: function _updateLayers() {
      this.getLayers().forEach(function (layer) {
        layer.reLayout({ averageHeight : this._averageLayerHeight });
      }, this);
    },

    /* Return the layers widgets.
     */
    getLayers: function getLayers () {
      return this._layers || [];
    },

    getCurrentMonthLayer: function getCurrentMonthLayer() {
      return this['layer_' + this._currentPageNumber];
    },

    addPosts: function addPosts(layer, postsData) {
      layer.addPosts(postsData);
      layer.filterPosts(this.footer.filterDropdown.getSelectedSourceTypes());
    },

    removePosts: function removePosts(layer) {
      layer.empty();
      return this;
    },

    /* Iterates over all the layers and call its `filterPosts` method when they
     * have at least 1 or more Posts.
     * @public
     * @param {Array<string>} sourceTypes - the selected post-types on the dropdown.
     */
    filterItems: function filterItems (sourceTypes) {
      this.getLayers().forEach(function(layer) {
        var posts = layer.getPosts();
        if (posts.length) layer.filterPosts(sourceTypes);
      }, this);
      return this;
    },

    /* Returns if a layer has posts to remove and also fulfills the MIN_LAYERS_POST
     * constraint.
     * @return {Boolean}
     */
    _canRemovePosts: function _canRemovePosts(layer) {
      return (layer.getPosts() && (layer.getPosts().length > this.constructor.MIN_LAYERS_POST));
    },

    /* Creates all the required empty post layers. They will get set a default
     * height (even if empty) to display an approximated total height on the page
     * and give the illusion that the page have more content using the scrollbar
     * as visual feedback. This should encourage users to scroll down and discover
     * more content.
     * @private
     */
    _createEmptyLayers: function _createEmptyLayers(formattedPosts) {
      var frag = document.createDocumentFragment();
      this._layers = [];

      formattedPosts.forEach(function (page, index) {
        var layer = new CV.SavedPostsLayer({
          id: index,
          name: 'layer_' + page,
          page: page
        });
        layer.setHeight(this._averageLayerHeight);
        this._layers.push(layer);
        this.appendChild(layer);
        frag.appendChild(layer.el);
      }, this);

      this.el.appendChild(frag);

      return this;
    },

    _updateGlobalVars: function _updateGlobalVars() {
      this._windowInnerHeight = this._window.innerHeight;
      this._availableWidth = this._window.innerWidth;
      this._updateAverageLayerHeight();
      this._scrollHeight = this._body.clientHeight;
      return this;
    },

    /* Sets the value to the _averageLayerHeight property.
     * @private
     */
    _updateAverageLayerHeight: function _updateAverageLayerHeight () {
      this._averageLayerHeight = ~~(this.averagePostTotal * this.averagePostHeight / ~~(this._availableWidth / this.averagePostWidth));
      return this;
    },
  }
});
