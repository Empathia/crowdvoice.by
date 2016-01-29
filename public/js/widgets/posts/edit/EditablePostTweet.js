Class(CV, 'EditablePostTweet').inherits(CV.PostTweet)({
  prototype: {
    init: function init(config) {
      CV.PostTweet.prototype.init.call(this, config);
    },

    /* @public, override
     */
    edit: function edit() {
      this.dom.addClass(this.el, ['post-editable', 'edit-mode']);
      return this;
    },

    /* @public, override
     */
    addImageControls: function addImageControls() {
      return this;
    },

    /* @public, override
     */
    unedit: function unedit() {
      return this;
    },

    getEditedData: function getEditedData() {
      return {
        title: this.title,
        description: this.description,
        publishedAt: this.publishedAt || new Date(),
        sourceType: this.sourceType,
        sourceService: this.sourceService,
        sourceUrl: this.sourceUrl,
        extras: this.extras
      };
    },

    /* Adds the delete post button (for moderation management)
     * @public
     * @return EditablePostTweet
     */
    addRemoveButton: function addRemoveButton() {
      this.appendChild(new CV.PostModerateRemoveButton({
        name: 'removeButton',
        postId: this.id,
        className: '-m0'
      }));
      this.el.appendChild(this.removeButton.el);
      return this;
    },

    destroy: function destroy() {
      CV.PostTweet.prototype.destroy.call(this);
      return null;
    }
  }
});
