var Waterfall = require('./../lib/waterfall');

Class(CV, 'EmbedLayer').inherits(Widget)({
  ELEMENT_CLASS : 'posts-layer -rel -clearfix',
  HTML : '\
    <section>\
      <div class="posts-layer__detector"></div>\
      <div class="posts-layer__posts"></div>\
      <div class="cv-voice-posts-layer__ticks"></div>\
    </section>',

  prototype : {
    waterfall : null,
    _postWidgets : null,
    _indicatorWidgets : null,

    init : function init (config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this.postsContainer = this.el.querySelector('.posts-layer__posts');
      this.ticksContainerElement = this.el.querySelector('.cv-voice-posts-layer__ticks');
      this.el.querySelector('.posts-layer__detector').dataset.date = this.dateString;

      this._postWidgets = [];
      this._indicatorWidgets = [];

      this.waterfall = new Waterfall({
        containerElement : this.postsContainer,
        positioning : 'xy'
      });
    },

    addPosts : function addPosts (posts, viewType) {
      var fragment = document.createDocumentFragment();

      posts.forEach(function (post, index) {
        post.name = 'post_' + index;
        post.className = viewType + '-view';
        this.appendChild(CV.Post.create(post))
          .loadImage()
          .render(fragment);

        this._postWidgets.push(this['post_' + index]);
      }, this);

      if (viewType === 'cards') {
        this.waterfall.addItems([].slice.call(fragment.childNodes, 0));
      } else if (viewType === 'list') {
        this.postsContainer.style.height = '';
      }
      this.postsContainer.appendChild(fragment);

      if (viewType === 'cards') { this.waterfall.layout(); }
      else if (viewType === 'list') {
        this.postsContainer.style.height = this.postsContainer.offsetHeight + 'px';
      }

      this._finalHeightIsKnow = true;
      this._addPostsIndicators(this._postWidgets);

      return this;
    },

    getPosts : function getPosts() {
      return this.children;
    },

    filterPosts : function filterPosts (sourceTypes, viewType) {
      var showAll = false;

      if (!sourceTypes) {
        showAll = true;
      }

      function showAllFn(post) {
        post.el.style.display = 'block';
      }

      function filterFn(post) {
        if (sourceTypes.indexOf(post.sourceType) < 0) {
          post.el.style.display = 'none';
        } else {
          post.el.style.display = 'block';
        }
      }

      if (showAll) {
        this.children.forEach(showAllFn);
      } else {
        this.children.forEach(filterFn);
      }

      if (viewType === 'cards') { this.waterfall.layout(); }
      else if (viewType === 'list') {
        this.postsContainer.style.height = '';
        this.postsContainer.style.height = this.postsContainer.offsetHeight + 'px';
      }
    },

    /* Sets the heigth of the layer. If a number is provided it will convert it into pixel units.
     * @method setHeight <public> [Function]
     * @param height <required> [Number or String]
     */
    setHeight : function setHeight(height) {
      if (typeof height === 'number') {
        height = height + 'px';
      }

      this.postsContainer.style.height = height;
      this._finalHeightIsKnow = false;
    },

    reLayout : function reLayout(args) {
      if (this.waterfall.getItems().length) { this.waterfall.layout(); }
      if (!this.getPosts().length) { this.setHeight(args.averageHeigth); }
      this._updatePostIndicatorsPostion();
      return this;
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
      this._indicatorWidgets = [];
      return this;
    },

    _addPostsIndicators : function _addPostsIndicators (posts) {
      var frag = document.createDocumentFragment();
      var i = 0;
      var len = posts.length;
      var indicator, firstDateCoincidence, currentDate;

      for (i = 0; i < len; i++) {
        currentDate = posts[i].el.dataset.date.match(/\d{4}-\d{2}-\d{2}/)[0];

        if (firstDateCoincidence !== currentDate) {
          firstDateCoincidence = currentDate;

          this.appendChild(new CV.EmbedLayerPostIndicator({
            name : 'indicator_' + i,
            label : posts[i].el.dataset.date,
            refElement : posts[i].el,
            zIndex : (len - i)
          })).activate().render(frag);

          this._indicatorWidgets.push(this['indicator_' + i]);
        }
      }

      // Avoid forced synchronous layout
      this._updatePostIndicatorsPostion();
      this.ticksContainerElement.appendChild(frag);
    },

    /* Updates the position of each indicator.
     * @private
     */
    _updatePostIndicatorsPostion : function _updatePostIndicatorsPostion() {
      var i = 0;
      var len = this._indicatorWidgets.length;

      CV.EmbedLayerPostIndicator.flushRegisteredYValues();

      for (i = 0; i < len; i++) {
        this._indicatorWidgets[i].updatePosition();
      }
    }
  }
});
