var SavedPostsStore = require('../../../stores/SavedPostsStore');

Class(CV, 'PostDetailControllerSaved').includes(NodeSupport, CustomEventSupport)({
  prototype: {
    _pages: null,
    _totalPagesLen: 0,
    _currentPostIndex: 0,
    _currentPageIndex: 0,

    _posts: null,

    init: function init(config) {
      Object.keys(config || {}).forEach(function (propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      this._setup()._bindEvents();

      this.pages.map(function (page) {
        var posts = SavedPostsStore.get(page);

        if (posts) {
          return this._gotSavedPostsHandler({
            posts: posts,
            pageNumber: page
          });
        }

        SavedPostsStore.getSavedPostsPage(page);
      }, this);
    },

    _setup: function _setup() {
      this.appendChild(new CV.PostDetail({
        name: 'widget',
        data: this.postData
      })).render(document.body);

      this._posts = this.pages.map(function() {return [];});
      this.setIndexes(this.postData);

      requestAnimationFrame(function() {
        this.widget.activate();
      }.bind(this));

      return this;
    },

    _bindEvents: function _bindEvents() {
      this._gotSavedPostsHandlerRef = this._gotSavedPostsHandler.bind(this);
      SavedPostsStore.bind('gotSavedPosts', this._gotSavedPostsHandlerRef);
    },

    _gotSavedPostsHandler: function _gotSavedPostsHandler(res) {
      this._posts[res.pageNumber] = res.posts;
      this.widget.updatedPosts(this._posts.reduce(function (p, n) {
        return p.concat(n);
      }));
    },

     /* Updates the current page and post indexes based on the postEntity passed.
     * @public
     * @param {Object} post - a post instance
     */
    setIndexes: function setIndexes(postEntity) {
      Object.keys(SavedPostsStore.getAll()).some(function (page, pageIndex) {
        return (SavedPostsStore.get(page) || []).some(function (post, postIndex) {
          if (post.id === postEntity.id) {
            this._currentPageIndex = pageIndex;
            this._currentPostIndex = postIndex;
            return true;
          }
        }, this);
      }, this);
      return this;
    },

   /* Updates the postDetailWidget using the data stored on `_posts`.
    * @private
    */
    update: function update() {
      var current = this._getCurrentPost();
      if (current) this.widget.update(current);
    },

    /* Returns the current page’s data indicated by `_currentPageIndex` and `_currentPostIndex`.
     * @private
     * @return {Object} PostInstance
     */
    _getCurrentPost: function _getCurrentPost() {
      return this._posts[this._currentPageIndex][this._currentPostIndex];
    },

    destroy: function destroy() {
      SavedPostsStore.unbind('gotSavedPosts', this._gotSavedPostsHandlerRef);
      this.widget = this.widget.destroy();
      this._posts = null;
      return null;
    }
  }
});

