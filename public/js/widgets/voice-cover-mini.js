/* jshint multistr: true */
Class(CV, 'VoiceCoverMini').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
    <article class="cv-voice-cover mini list-style" role="article">\
      <div class="voice-cover">\
        <div class="voice-cover-main-image-wrapper">\
          <div class="voice-cover-main-image -img-cover"></div>\
        </div>\
      </div>\
      <div class="voice-content">\
        <p class="voice-cover-title -font-semi-bold">{{voice-title}}</p>\
        <div class="meta">\
          <div class="author">\
            By <a class="author-anchor" href="{{voice-owner-url}}">\
              <span class="author-username">{{voice-owner-name}}</span>\
            </a> &nbsp;&middot;&nbsp; \
          </div>\
          <ul class="cv-tags -list-horizontal"></ul>\
        </div>\
      </div>\
      <div class="action"></div>\
    </article>\
  ',

    TAG_ITEM_HTML : '\
    <li class="cv-tags-list-item">\
      <a class="cv-tags-tag" href="{{tag-url}}">{{tag-name}}</a>\
    </li>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.tagListElement = this.element.find('.cv-tags');

            this.dom.updateBgImage(this.el.querySelector('.voice-cover-main-image'), this.images.small.url);

            var fullname = this.owner.name + (this.owner.lastname ? this.owner.lastname : '');
            this.dom.updateAttr('href', this.el.querySelector('.author-anchor'), this.owner.url);
            this.dom.updateAttr('title', this.el.querySelector('.author-anchor'), this.owner.profileName + ' profile');
            this.dom.updateText(this.el.querySelector('.author-username'), fullname);

            this.dom.updateText(this.el.querySelector('.voice-cover-title'), this.title);

            if (this.tags) this.createTags(this.tags);
        },

        /**
         * Creates a tag per topic that is tagged to the topic and appends them.
         * @method createTags <private> [Function]
         * @params tags <required> [Array] list of topics tagged to the voice
         * @return undefined
         */
        createTags : function createTags(tags) {
            tags.forEach(function(tag) {
                var temp = $(this.constructor.TAG_ITEM_HTML);
                var anchor = temp.find('.cv-tags-tag');

                this.dom.updateText(anchor[0], tag.name);
                this.dom.updateAttr('href', anchor[0], tag.url);

                this.tagListElement.append(temp);
            }, this);

            return this;
        }
    }
});
