var Waterfall = require('../../lib/waterfall');

Class(CV, 'SavedPostsLayer').inherits(Widget).includes(BubblingSupport)({
  ELEMENT_CLASS : 'saved-posts-layer -rel -clearfix',
  HTML: '\
    <section>\
      <div class="saved-posts-layer__detector"></div>\
      <div class="saved-posts-layer__posts"></div>\
    </section>',

  prototype: {
    waterfall : null,
    _postWidgets : null,
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this.postsContainer = this.el.querySelector('.saved-posts-layer__posts');
      this.el.querySelector('.saved-posts-layer__detector').dataset.page = this.page;
      this._postWidgets = [];

      this.addLoaders();

      this.waterfall = new Waterfall({
        containerElement: this.postsContainer,
        columnWidth: 300,
        gutter: 20
      });
    },

    addLoaders: function addLoaders() {
      if (this.loadingTop) {
        this.loadingTop.enable();
      } else {
        this.appendChild(new CV.Loading({
          name: 'loadingTop'
        })).center().setStyle({
          top: '150px',
          zIndex: 1
        }).render(this.el);
      }

      if (this.loadingMiddle) {
        this.loadingMiddle.enable();
      } else {
        this.appendChild(new CV.Loading({
          name: 'loadingMiddle'
        })).center().setStyle({
          zIndex: 1
        }).render(this.el);
      }

      if (this.loadingBottom) {
        this.loadingBottom.enable();
      } else {
        this.appendChild(new CV.Loading({
          name: 'loadingBottom'
        })).center().setStyle({
          top: 'initial',
          bottom: '150px',
          zIndex: 1
        }).render(this.el);
      }

      return this;
    },

    hideLoaders: function hideLoaders() {
      this.loadingTop.disable().remove();
      this.loadingMiddle.disable().remove();
      this.loadingBottom.disable().remove();
      return this;
    },

   addPosts: function addPosts (posts) {
      this.addLoaders();

      var fragment = document.createDocumentFragment();

      posts.forEach(function (post, index) {
        post.name = 'post_' + index;
        this.appendChild(CV.Post.create(post))
          .loadImage()
          .addActions()
          .render(fragment);
        this._postWidgets.push(this['post_' + index]);
      }, this);

      this.waterfall.addItems([].slice.call(fragment.childNodes, 0));
      this.postsContainer.appendChild(fragment);
      this.waterfall.layout();
      this._finalHeightIsKnow = true;

      this.hideLoaders();

      return this;
    },

    getPosts: function getPosts() {
      return this._postWidgets;
    },

    filterPosts: function filterPosts (sourceTypes) {
      var showAll = false;

      if (!sourceTypes) showAll = true;

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

      if (showAll) this._postWidgets.forEach(showAllFn);
      else this._postWidgets.forEach(filterFn);

      this.waterfall.layout();
      return this;
    },

    /* Sets the heigth of the layer. If a number is provided it will convert it into pixel units.
     * @public
     * @param {number} height
     */
    setHeight : function setHeight(height) {
      if (typeof height === 'number') {
        height = height + 'px';
      }

      this.postsContainer.style.height = height;
      this._finalHeightIsKnow = false;
    },

    reLayout: function reLayout(args) {
      if (this.waterfall.getItems().length) this.waterfall.layout();
      if (!this.getPosts().length) this.setHeight(args.averageHeigth);
      return this;
    },

    /* Destroy all its children.
     * @return undefined
     */
    empty: function empty() {
      while (this.children.length > 0) {
        this.children[0].destroy();
      }
      this.waterfall.flushItems();
      this._postWidgets = [];
      return this;
    }
  }
});
