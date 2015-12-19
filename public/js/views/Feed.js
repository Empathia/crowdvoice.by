Class(CV.Views, 'Feed').includes(NodeSupport, CV.WidgetUtils)({
  prototype: {
    organization: null,
    feedItems: null,
    topVoice: null,

    init: function init(config) {
      Object.keys(config || {}).forEach(function(propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      this._setup();
    },

    _setup: function _setup() {
      var time = 1000;

      if (this.topVoice) {
        this.appendChild(new CV.TopVoice({
          name: 'topVoice',
          data: this.topVoice,
          ENV: this.ENV
        })).render(this.el.querySelector('.feed-top-voice'));
      }

      this.appendChild(new CV.FeedFeaturedVoices({
        name: 'featuredVoices',
        element: this.el.querySelector('.feed__featured-voices')
      }));
      window.setTimeout(function(_that) {
        _that.featuredVoices.fetch();
      }, time, this);

      this.appendChild(new CV.FeedRecommended({
        name: 'recommended',
        element: this.el.querySelector('.feed__recommended')
      }));
      window.setTimeout(function(_that) {
        _that.recommended.fetch();
      }, time + 1, this);

      this.appendChild(new CV.FeedDiscover({
        name: 'discover',
        element: $(this.el.querySelector('.feed__discover'))
      }));
      window.setTimeout(function(_that) {
        _that.discover.fetchImages();
      }, time + 2, this);

      this.appendChild(new CV.FeedSidebar({
        name : 'sidebar',
        el : this.el.querySelector('[data-feed-sidebar]'),
        feedItems: this.feedItems,
        organization: this.organization
      }));
    }
  }
});
