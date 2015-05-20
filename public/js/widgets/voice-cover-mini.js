Class('VoiceCoverMini').inherits(Widget).includes(CV.WidgetUtils)({
  HTML : '\
    <article class="cv-voice-cover mini list-style" role="article">\
      <ul class="cv-tags -list-horizontal"></ul>\
      <div class="voice-cover">\
        <div class="voice-cover-main-image-wrapper">\
          <div class="voice-cover-main-image -img-cover"></div>\
        </div>\
      </div>\
      <div class="voice-content">\
        <h2 class="voice-cover-title -font-bold">{{voice-title}}</h2>\
        <div class="meta">\
          <div class="author">\
            By <a class="author-anchor" href="{{voice-author-url}}">\
              <span class="author-username">{{voice-author-name}}</span>\
            </a> &nbsp;&middot;&nbsp; \
          </div>\
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
      this.voiceCoverElement = this.element.find('.voice-cover');

      this.createTags(this.tags);
      this.dom.updateBgImage(this.el.querySelector('.voice-cover-main-image'), this.image_cover);

      this.dom.updateAttr('href', this.el.querySelector('.author-anchor'), this.author.url);
      this.dom.updateAttr('title', this.el.querySelector('.author-anchor'), this.author.username + ' profile');
      this.dom.updateText(this.el.querySelector('.author-username'), this.author.username);

      this.dom.updateText(this.el.querySelector('.voice-cover-title'), this.title);





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

        this.element.find('.meta').append(this.tagListElement.clone().append(',&nbsp;'));

      }, this);

      return this;
    }


  }
});












