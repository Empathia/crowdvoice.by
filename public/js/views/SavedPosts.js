Class(CV, 'SavedPosts').includes(CV.WidgetUtils, NodeSupport, CustomEventSupport, CV.VoiceHelper)({
  prototype: {
    init: function init(config) {
      Object.keys(config || {}).forEach(function(propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      this.pagesApproved = this._formatPagesObject(this.pagesForMonths.approved);

      if (this.pagesApproved.length) {
        return this._addManager();
      }

      this._showOnboarding();
    },

    _addManager: function _addManager() {
      this.container.insertAdjacentHTML('afterbegin', '\
          <div class="page-heading">\
            <h1 class="page-heading__title -m0">Saved Posts</h1>\
          </div>');

      this.appendChild(new CV.SavedPostsManager({
        name: 'manager',
        pagesApproved: this.pagesApproved,
        totalPosts: this.totalCount,
        socket: this.socket
      })).render(this.container);
    },

    _showOnboarding: function _showOnboarding() {
      this.appendChild(new CV.SavedPostsOnboarding({
        name: 'onboarding'
      })).render(this.container);
    }
  }
});
