/**
 * VoiceCover Widget
 *
 * description  {String} voice description
 * createdAt    {String}
 * followers    {Array} voice entities followers
 * id           {String} the voice id
 * images       {Object} Available image sizes
 * latitude     {String}
 * locationName {String}
 * longitude    {String}
 * owner        {Object} owner Entity
 * slug         {String}
 * status       {String}
 * title        {String} voice title (65 chars max)
 * topics       {Array} list of topics tagged to the voice
 * type         {String}
 * updatedAt    {String} ISO date string
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
        <a class="voice-cover-hover-overlay" data-voice-anchor href="{{voice-url}}">\
          <button class="voice-cover-hover-overlay-button cv-button tiny -font-semi-bold">View Voice</button>\
        </a>\
      </div>\
      <div class="voice-content">\
        <div class="author">\
          <a class="author-anchor" href="{{voice-owner-url}}">\
            <img class="author-avatar -rounded" src="{{voice-owner-avatar-small}}" alt="">\
            <span class="author-username">{{voice-owner-name}}</span>\
          </a>\
        </div>\
        <h2 class="voice-cover-title -font-bold">\
          <a class="voice-cover-title-anchor" data-voice-anchor href="{{voice-url}}">{{voice-title}}</a>\
        </h2>\
        <p class="voice-cover-description">{{voice-description}}</p>\
        <div class="meta">\
          <span class="voice-cover-followers">{{voice-followers}}</span> followers &middot;&nbsp;\
          Updated <time class="voice-cover-datetime" datetime="{{voice-updated-at-iso}}">{{voice-updated-at-human}}</time></div>\
      </div>\
    </article>\
  ',

  TAG_ITEM_HTML : '\
    <li class="cv-tags-list-item">\
      <a class="cv-tags-tag" href="{{tag-url}}">{{tag-name}}</a>\
    </li>\
  ',

  IS_NEW_BADGE_HTML : '\
    <svg class="voice-cover-badge-new">\
      <use xlink:href="#svg-badge"></use>\
      <text x="50%" y="50%" dy=".3em" class="-font-bold">NEW</text>\
    </svg>\
  ',

  MAX_DESCRIPTION_LENGTH : 180,

  prototype : {
    init : function init(config) {
      Widget.prototype.init.call(this, config);

      this.el = this.element[0];
      this.tagListElement = this.element.find('.cv-tags');
      this.voiceCoverElement = this.element.find('.voice-cover');
      this.dateTimeElement = this.el.querySelector('.voice-cover-datetime');
      this.voiceAnchors = [].slice.call(this.el.querySelectorAll('[data-voice-anchor]'), 0);

     this._updateValues();

      // is new? no older than 21 days == 3 weeks
      if (moment().diff(moment(this.updatedAt), 'days') <= 21) {
        this.addNewBadge();
      }
    },

    /* Update the widget's elements values with the received config
     * @method _updateValues <private> [Function]
     */
    _updateValues : function _updateValues() {
      this.voiceAnchors.forEach(function(anchor) {
        this.dom.updateAttr('href', anchor, '/' + this.owner.profileName + '/' + this.slug + '/');
        this.dom.updateAttr('title', anchor, this.title + ' voice');
      }, this);

      this.dom.updateBgImage(this.el.querySelector('.voice-cover-main-image'), this.images.card.url);

      if (this.topics.length) {
        this.createTopics(this.topics);
      }

      var authorFullname = this.owner.name + (this.owner.lastname ? (' ' + this.owner.lastname) : '');
      this.dom.updateAttr('href', this.el.querySelector('.author-anchor'), '/' + this.owner.profileName);
      this.dom.updateAttr('title', this.el.querySelector('.author-anchor'), authorFullname + '’s profile');
      this.dom.updateAttr('src', this.el.querySelector('.author-avatar'), this.owner.images.icon.url);
      this.dom.updateText(this.el.querySelector('.author-username'), 'by ' + authorFullname);

      this.dom.updateText(this.el.querySelector('.voice-cover-title-anchor'), this.title);

      var description = this.format.truncate(this.description, this.constructor.MAX_DESCRIPTION_LENGTH, true);
      this.dom.updateText(this.el.querySelector('.voice-cover-description'), description);

      this.dom.updateText(this.el.querySelector('.voice-cover-followers'), this.format.numberUS(this.followers.length));
      this.dom.updateText(this.dateTimeElement, moment(this.updatedAt).fromNow());
      this.dom.updateAttr('datetime', this.dateTimeElement, this.updatedAt);
    },

    /**
     * Creates a tag per topic that is tagged to the topic and appends them.
     * @method createTopics <private> [Function]
     * @params tags <required> [Array] list of topics tagged to the voice
     * @return CV.VoiceCover
     */
    createTopics : function createTopics(topics) {
      topics.forEach(function(topic) {
        var temp = $(this.constructor.TAG_ITEM_HTML);
        var anchor = temp.find('.cv-tags-tag');

        this.dom.updateText(anchor[0], topic.name);
        this.dom.updateAttr('href', anchor[0], '/topic/' + topic.slug);

        this.tagListElement.append(temp);
      }, this);

      return this;
    },

    /**
     * Appends the new badge to the voiceCoverElement.
     * @method addNewBadge <private> [Function]
     * @return CV.VoiceCover
     */
    addNewBadge : function addNewBadge() {
      var badge = $(this.constructor.IS_NEW_BADGE_HTML);

      this.voiceCoverElement.append( badge );

      requestAnimationFrame(function() {
        badge[0].classList.add('active');
      });

      return this;
    }
  }
});
