var Waterfall = require('./../lib/waterfall');

Class(CV, 'EmbedLayer').inherits(Widget)({
  ELEMENT_CLASS : 'posts-layer -rel -clearfix',
  HTML : '\
    <section>\
      <div class="posts-layer__detector"></div>\
      <div class="posts-layer__posts"></div>\
    </section>',

  prototype : {
    waterfall : null,
    init : function init (config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this.postsContainer = this.el.querySelector('.posts-layer__posts');
      this.el.querySelector('.posts-layer__detector').dataset.date = this.dateString;

      this.waterfall = new Waterfall({
        containerElement : this.postsContainer,
        positioning : '2d'
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
      return this;
    },
  }
});
