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
      this.appendChild(new CV.TopVoice({
        name: 'topVoice',
        data: this.topVoice
      })).render(this.el.querySelector('.feed-top-voice'));

      this.appendChild(new CV.FeedFeaturedVoices({
        name: 'featuredVoices',
        element: this.el.querySelector('.feed__featured-voices')
      })).fetch();

      this.appendChild(new CV.FeedRecommended({
        name: 'recommended',
        element: this.el.querySelector('.feed__recommended')
      })).fetch();

      this.appendChild(new CV.FeedDiscover({
        name: 'discover',
        element: $(this.el.querySelector('.feed__discover'))
      }));

      this.appendChild(new CV.FeedSidebar({
        name : 'sidebar',
        el : this.el.querySelector('[data-feed-sidebar]'),
        feedItems: this.feedItems,
        organization: this.organization
      }));
    }
  }
});
