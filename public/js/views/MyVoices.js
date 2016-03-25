Class(CV.Views, 'MyVoices').includes(NodeSupport, CV.WidgetUtils)({
  prototype: {
    /* Voices separated by STATUS.
     * @property {Object} voices
     */
    voices: null,
    voicesLength : 0,

    init: function init(config) {
      Object.keys(config || {}).forEach(function(propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      this._setup();
    },

    _setup: function _setup() {
      if (this.voicesLength) {
        return this._setupTabs();
      }

      return this._setupOnboardingMessage();
    },

    _setupOnboardingMessage: function _setupOnboardingMessage() {
      while(this.el.firstChild) {
        this.el.removeChild(this.el.firstChild);
      }

      this.appendChild(new CV.MyVoicesOnboarding({
        name: 'onboarding'
      })).render(this.el);
    },

    _setupTabs: function _setupTabs() {
      var ARCHIVED_KEY = 'archived'
        , archivedVoices = {}
        , currentVoices = {}
        , totalArchivedVoices = 0
        , totalCurrentVoices = 0;

      this.appendChild(new CV.TabsManager({
        name: 'tabs',
        useHash: true,
        nav: document.querySelector('.profile-menu'),
        content: document.querySelector('.profile-menu-content')
      }));

      archivedVoices[ARCHIVED_KEY] = this.voices[ARCHIVED_KEY];
      totalArchivedVoices = archivedVoices[ARCHIVED_KEY].length;

      Object.keys(this.voices).forEach(function (key) {
        if (key !== ARCHIVED_KEY) {
          var voices = this.voices[key];
          currentVoices[key] = voices;
          totalCurrentVoices += voices.length;
        }
      }, this);

      this.tabs.addTab({
        name: 'voices',
        content: CV.MyVoicesTab,
        title: 'Voices (' + totalCurrentVoices + ')',
        contentData: {
          voices: currentVoices,
          totalVoices: totalCurrentVoices,
          emptyMessage: 'You have no voices. <a href="#">Create a Voice</a>'
        }
      });

      this.tabs.addTab({
        name: 'archived',
        content: CV.MyVoicesTab,
        title: 'Archived (' + totalArchivedVoices + ')',
        contentData: {
          voices: archivedVoices,
          totalVoices: totalArchivedVoices,
          emptyMessage: 'You haven’t archived any voice yet.'
        }
      });

      this.tabs.addTabIndicator().start();
    }
  }
});
