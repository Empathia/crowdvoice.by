Class(CV, 'PostDetailInfo').inherits(Widget).includes(CV.WidgetUtils)({
  ELEMENT_CLASS : 'cv-post-detail__info',
  REGEX_TWEET_STATUS: /(?:https?:\/\/)?(?:www\.)?twitter\.com\/.*(?:statuses|status)\/(?:\d+)$/,

  prototype : {
    init : function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this.regexTweet = new RegExp(this.constructor.REGEX_TWEET_STATUS);
    },

    /* Updates the main content area to display the Post info.
     * @public
     * @param {Object} postData - the PostInstance to display
     */
    update : function update(postData) {
      var sourceType = postData.sourceType;

      if (this.mediaWidget) {
        this.mediaWidget = this.mediaWidget.destroy();
      }

      if (this.regexTweet.test(postData.sourceUrl)) {
        sourceType = 'tweet';
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
