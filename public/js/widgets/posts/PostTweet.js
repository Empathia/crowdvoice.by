var moment = require('moment');

Class(CV, 'PostTweet').inherits(CV.Post)({
  ELEMENT_CLASS: 'post-card tweet',
  HTML: '\
    <div>\
      <div class="post-card-info -text-left">\
        <div class="post-card-meta">\
          <span class="post-card-meta-source"></span>\
          on <time class="post-card-meta-date" datetime=""></time>\
        </div>\
        <div class="-clearfix">\
          <img class="-float-left -mr1" width="48" height="48"/>\
          <div class="-overflow-hidden">\
            <h2 class="post-card-title"></h2>\
          </div>\
        </div>\
        <p class="post-card-description"></p>\
        <div class="post-card-activity">\
          <div class="post-card-activity-saved -inline-block">\
            <svg class="post-card-activity-svg">\
              <use xlink:href="#svg-save-outline"></use>\
            </svg>\
            <span class="post-card-activity-label">0</span>\
          </div>\
        </div>\
      </div>\
    </div>',
  ICON: '<svg class="post-card-meta-icon"><use xlink:href="#svg-twitter-bird"></use></svg>',

  prototype: {
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this.titleElement = this.el.querySelector('.post-card-title');
      this.descriptionElement = this.el.querySelector('.post-card-description');
      this.sourceElement = this.el.querySelector('.post-card-meta-source');
      this.savedElement = this.el.querySelector('.post-card-activity-saved > .post-card-activity-label');
      this.dateTimeElement = this.el.querySelector('.post-card-meta-date');
      this._setup();
    },
    _setup: function _setup() {
      if (this.faviconPath) {
        this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.FAVICON.replace(/{src}/, this.faviconPath));
        this.sourceElement.insertAdjacentHTML('beforeend', 'from <a href="' + this.sourceDomain + '" target="_blank">'+ this.sourceDomain.replace(/.*?:\/\/(w{3}.)?/g, "") + '</a> ');
      } else {
        this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.ICON);
        this.dom.updateText(this.sourceElement, 'posted ');
      }
      this.dom.updateText(this.dateTimeElement, moment(this.publishedAt).format('MMM DD, YYYY'));
      this.dom.updateAttr('datetime', this.dateTimeElement, this.publishedAt);
      this.dom.updateText(this.titleElement, this.dom.decodeHTML(this.title));
      this.dom.updateText(this.descriptionElement, this.dom.decodeHTML(this.description).trim());
      this.updateSaves(this);
    }
  }
});
