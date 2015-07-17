/* jshint multistr: true */
Class(CV, 'VoiceCoverMini').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
    <article class="cv-voice-cover mini -clearfix" role="article">\
      <img class="voice-cover -float-left"/>\
      <div class="voice-content">\
        <p class="voice-cover-title -font-semi-bold">{{voice-title}}</p>\
        <div class="meta">\
          <div class="author -inline-block">\
            By <a class="author-anchor" href="{{voice-owner-url}}">\
              <span class="author-username">{{voice-owner-name}}</span>\
            </a>\
          </div>\
        </div>\
      </div>\
      <div class="action"></div>\
    </article>\
  ',

    TOPICS_HTML : ' · <ul class="cv-tags -inline-block -list-horizontal"></ul>',

    TOPIC_ITEM_HTML : '\
    <li class="cv-tags-list-item">\
      <a class="cv-tags-tag" href="{{tag-url}}">{{tag-name}}</a>\
    </li>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this._setup();
        },

        _setup : function _setup() {
            this.dom.updateAttr('src', this.el.querySelector('.voice-cover'), this.data.images.small.url);

            var fullname = this.data.owner.name + (this.data.owner.lastname ? (' ' + this.data.owner.lastname) : '');
            this.dom.updateAttr('href', this.el.querySelector('.author-anchor'), this.data.owner.url);
            this.dom.updateAttr('title', this.el.querySelector('.author-anchor'), this.data.owner.profileName + ' profile');
            this.dom.updateText(this.el.querySelector('.author-username'), fullname);

            this.dom.updateText(this.el.querySelector('.voice-cover-title'), this.data.title);
        },

        /* Show the location, joined at and inline name, username
         * @method showMeta <public> [Function]
         */
        showMeta : function showMeta() {
            this.el.querySelector('.meta').insertAdjacentHTML('beforeend', this.constructor.TOPICS_HTML);

            this._createTags(this.data.topics);
        },

        /**
         * Creates a tag per topic that is tagged to the topic and appends them.
         * @method _createTags <private> [Function]
         * @params topics <required> [Array] list of topics tagged to the voice
         * @return CV.VoiceCoverMini
         */
        _createTags : function _createTags(topics) {
            this.tagListElement = this.element.find('.cv-tags');

            topics.forEach(function(tag) {
                var temp = $(this.constructor.TOPIC_ITEM_HTML);
                var anchor = temp.find('.cv-tags-tag');

                this.dom.updateText(anchor[0], tag.name);
                this.dom.updateAttr('href', anchor[0], tag.url);

                this.tagListElement.append(temp);
            }, this);

            return this;
        }
    }
});
