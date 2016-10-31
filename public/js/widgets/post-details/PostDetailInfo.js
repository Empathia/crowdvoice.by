Class(CV, 'PostDetailInfo').inherits(Widget).includes(CV.WidgetUtils)({
  ELEMENT_CLASS: 'cv-post-detail__info',

  REGEX_TWEET_STATUS: new RegExp(/(?:https?:\/\/)?(?:www\.)?twitter\.com\/.*(?:statuses|status)\/(?:\d+)$/),
  REGEX_GOOGLE_DRIVE: new RegExp(/(?:https?:\/\/)?(?:www\.)?drive\.google\.com\/file\/.*/),
  REGEX_GOOGLE_DOCS: new RegExp(/(?:https?:\/\/)?(?:www\.)?docs\.google\.com\/file\/.*/),
  REGEX_LAST_SLASH: new RegExp(/\/(?=[^\/]*$)\w+/),

  prototype: {
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
    },

    /* Updates the main content area to display the Post info.
     * @public
     * @param {Object} postData - the PostInstance to display
     */
    update: function update(postData) {
      var sourceType = postData.sourceType;

      if (this.mediaWidget) {
        this.mediaWidget = this.mediaWidget.destroy();
      }

      if (this.constructor.REGEX_TWEET_STATUS.test(postData.sourceUrl)) {
        sourceType = 'tweet';
      } else if (
        this.constructor.REGEX_GOOGLE_DRIVE.test(postData.sourceUrl) ||
        this.constructor.REGEX_GOOGLE_DOCS.test(postData.sourceUrl)
      ) {
        var previewURL = postData.sourceUrl.replace(this.constructor.REGEX_LAST_SLASH, '/preview');
        postData.sourceUrl = previewURL;
        postData.sourceType = sourceType = 'video';
      }

      switch(sourceType) {
        case 'image':
        case 'video':
          this.appendChild(new CV.PostDetailInfoMedia({
            name : 'mediaWidget',
            data : postData
          })).render(this.el);
          break;

        case 'link':
        case 'text':
          this.appendChild(new CV.PostDetailInfoArticle({
            name : 'mediaWidget',
            data : postData
          })).render(this.el);
          break;

        case 'tweet':
          this.appendChild(new CV.PostDetailInfoTweet({
            name: 'mediaWidget',
            data: postData
          })).render(this.el);
          break;
      }

      return this;
    }
  }
});
