/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesQueue').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'from-sources-content-right',

    HTML : '\
        <div class="-rel">\
            <div class="from-sources-queue-onboarding -color-grey-light -text-center">\
                <p>Add here the posts you want to include in this voice.<br/>You’ll be able to edit their title and description.</p>\
            </div>\
            <div class="from-sources-queue-list -text-center"></div>\
        </div>',

    prototype : {
        _index : 0,

        init : function init(config)  {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.list = this.el.querySelector('.from-sources-queue-list');
            this.onboarding = this.el.querySelector('.from-sources-queue-onboarding');
            this.success = this.el.querySelector('.from-sources-queue-success');

            this.loader = new CV.Loading().render(this.el).center().disable();

            this._deleteFromQueueRef = this._deleteFromQueue.bind(this);
            this.bind('post:moderate:delete', this._deleteFromQueueRef);
        },

        _deleteFromQueue : function _deleteFromQueue(ev) {
            var childIndex = this.children.indexOf(ev.data.parent);
            if (childIndex >= 0) {
                this.children[childIndex].unedit().destroy();
                this._index--;

                if (this._index === 0) {
                    this.showOnboarding();
                }
            }
        },

        setSearchingState : function setSearchingState() {
            this.hideOnboarding();
            return this;
        },

        setAddingPost : function setAddingPost() {
            this.hideOnboarding();
            this.loader.enable();
            return this;
        },

        showOnboarding : function showOnboarding() {
            if (this._index) {
                return void 0;
            }

            this.onboarding.classList.add('active');
            return this;
        },

        hideOnboarding : function hideOnboarding() {
            this.onboarding.classList.remove('active');
            return this;
        },

        /* Prepend the new Post(s) Widgets to the Queue.
         * @public
         * @param {Array} postsData - the postsData
         */
        addPosts: function addPosts(postsData) {
          var fragment = document.createDocumentFragment();
          this.hideOnboarding();

          postsData.forEach(function (post) {
            post.name = 'post_' + this._index;
            this.appendChild(CV.EditablePost.create(post))
              .edit().addImageControls().addRemoveButton()
              .render(fragment);
            this._index++;
          }, this);

          this.list.insertBefore(fragment, this.list.firstChild);
          this.loader.disable();
        },

        removePosts : function removePosts() {
            while (this.children.length > 0) {
                this.children[0].destroy();
            }
            this._index = 0;
            this.showOnboarding();
        }
    }
});

