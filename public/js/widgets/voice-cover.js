/**
 * VoiceCover Widget
 *
 * @proposed data format
 * tags         {Array of Objects} list of topics tagged to the voice
 * image_cover  {String} path to the main cover image
 * author       {Object} author avatar, username, url
 * title        {String} voice title (65 chars max)
 * description  {String} voice description
 * followers    {Number} voice followers
 * updated_at   {String} ISO date string
 * gallery      <optional> {Array of Objects} list of thumbnail images (design expect 3 images)
 */

var moment = require('moment');

Class('VoiceCover').inherits(Widget).includes(CV.WidgetUtils)({
  HTML : '\
    <article class="cv-voice-cover" role="article">\
      <ul class="cv-tags -list-horizontal"></ul>\
      <div class="voice-cover">\
        <div class="voice-cover-main-image-wrapper">\
          <div class="voice-cover-main-image -img-cover"></div>\
        </div>\
        <a class="voice-cover-hover-overlay" href="{{voice-url}}">\
          <button class="voice-cover-hover-overlay-button ui-btn -md -overlay -font-semi-bold">View Voice</button>\
        </a>\
      </div>\
      <div class="voice-content">\
        <div class="author">\
          <a class="author-anchor" href="{{voice-author-url}}">\
            <img class="author-avatar -rounded" src="{{voice-author-avatar-small}}" alt="">\
            <span class="author-username">{{voice-author-name}}</span>\
          </a>\
        </div>\
        <h2 class="voice-cover-title -font-bold">{{voice-title}}</h2>\
        <p class="voice-cover-description">{{voice-description}}</p>\
        <div class="meta">\
          <span class="voice-cover-followers">{{voice-followers}}</span> followers &middot;&nbsp;\
          Updated <time class="voice-cover-datetime" datetime="{{voice-updated-at-iso}}">{{voice-updated-at-human}}</time></div>\
      </div>\
      <div class="voice-actions">\
      </div>\
    </article>\
  ',

  TAG_ITEM_HTML : '\
    <li class="cv-tags-list-item">\
      <a class="cv-tags-tag" href="{{tag-url}}">{{tag-name}}</a>\
    </li>\
  ',

  HAS_GALLERY_CLASSNAME : 'gallery',
  GALLERY_WRAPPER_HTML : '<div class="voice-cover-image-list -row"></div>',
  GALLERY_IMAGE_HTML :  '\
    <div class="voice-cover-image-list-item -col-4">\
      <div class="voice-cover-thumb-image -img-cover"></div>\
    </div>\
  ',

  IS_NEW_BADGE_HTML : '\
    <svg class="voice-cover-badge-new">\
      <use xlink:href="#svg-badge"></use>\
      <text x="50%" y="50%" class="-font-bold">NEW</text>\
    </svg>\
  ',

  prototype : {
    init : function init(config) {
      Widget.prototype.init.call(this, config);

      this.el = this.element[0];
      this.tagListElement = this.element.find('.cv-tags');
      this.voiceCoverElement = this.element.find('.voice-cover');
      this.dateTimeElement = this.el.querySelector('.voice-cover-datetime');
      this.actionsElement = this.element.find('.voice-actions');


      this.dom.updateAttr('href', this.el.querySelector('.voice-cover-hover-overlay'), this.url);
      this.dom.updateAttr('title', this.el.querySelector('.voice-cover-hover-overlay'), this.title + ' voice');
      //this.createTags(this.tags);
      this.dom.updateBgImage(this.el.querySelector('.voice-cover-main-image'), this.images.bluredcard.url);

      this.dom.updateAttr('href', this.el.querySelector('.author-anchor'), this.author.url);
      this.dom.updateAttr('title', this.el.querySelector('.author-anchor'), this.author.username + ' profile');
      this.dom.updateAttr('src', this.el.querySelector('.author-avatar'), this.author.avatar);
      this.dom.updateText(this.el.querySelector('.author-username'), this.author.username);

      this.dom.updateText(this.el.querySelector('.voice-cover-title'), this.title);
      this.dom.updateText(this.el.querySelector('.voice-cover-description'), this.description);

      this.dom.updateText(this.el.querySelector('.voice-cover-followers'), this.format.numberUS(this.followers));
      this.dom.updateText(this.dateTimeElement, moment(this.updated_at).fromNow());
      this.dom.updateAttr('datetime', this.dateTimeElement, this.updated_at);

      if (this.gallery.length >= 3) {
        this.createGallery(this.gallery);
      }
      if (this.style == 'list'){
        this.element.addClass('list-style');
      }
      if (this.hasActions){
        this.element.addClass('hasActions');
        this.addActions();
      }

      // 21 == 3 weeks (days)
      if (moment().diff(moment(this.updated_at), 'days') <= 21) {
        this.addNewBadge();
      }
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

        this.element.find('.meta').prepend(this.tagListElement.clone().append('&nbsp;&middot;&nbsp;'));

      }, this);

      return this;
    },

    /**
     * Creates the thumbnails for each gallery-image and appends the resulting
     * gallery to voiceCoverElement.
     * @method createGallery <private> [Function]
     * @params gallery <required> [Array] list of objects with image's info
     * @return undefined
     */
    createGallery : function createGallery(gallery) {
      var galleryWrapper = $(this.constructor.GALLERY_WRAPPER_HTML);

      this.element.addClass(this.constructor.HAS_GALLERY_CLASSNAME);

      gallery.forEach(function(image) {
        var item = $(this.constructor.GALLERY_IMAGE_HTML);
        this.dom.updateBgImage(item.find('.voice-cover-thumb-image')[0], image);
        galleryWrapper.append(item);
        item = null;
      }, this);

      this.voiceCoverElement.append(galleryWrapper);

      galleryWrapper = null;

      return this;
    },

    /**
     * Appends the new badge to the voiceCoverElement.
     * @method addNewBadge <private> [Function]
     * @return undefined
     */
    addNewBadge : function addNewBadge() {
      var badge = $(this.constructor.IS_NEW_BADGE_HTML);

      this.voiceCoverElement.append( badge );

      requestAnimationFrame(function() {
        badge[0].classList.add('active');
      });

      return this;
    },

    /**
     * Adds action buttons to the voice.
     * @method addActions <private> [Function]
     * @return undefined
     */
    addActions : function addActions() {

      var btnTwiceOptions = {
        "1": {name: 'Edit'},
        "2": {name: 'Republish as ...'}
      };

      new CV.Button({
          style   : 'tiny',
          type    : 'twice',
          name    : 'buttonTwice',
          options : btnTwiceOptions
      }).render(this.actionsElement);

      new CV.Button({
          style   : 'primary tiny',
          type    : 'single',
          label   : 'Delete',
          name    : 'buttonFollow'
      }).render(this.actionsElement);

    }
  }
});
