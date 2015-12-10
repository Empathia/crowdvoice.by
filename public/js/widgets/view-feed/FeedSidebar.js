var Person = require('./../../lib/currentPerson');

Class(CV, 'FeedSidebar').inherits(Widget)({
  prototype: {
    _onboarding: null,

    init: function init(config) {
      Widget.prototype.init.call(this, config);

      this._setup()._updateFeed();
    },

    _setup: function _setup() {
      if (Person.ownsOrganizations()) {
        var currentEntityView = Person.get();

        this.appendChild(new CV.UI.FeedDropdown({
          name: 'dropdown'
        })).render(this.el.querySelector('.profile-select-options'));

        if (this.organization) {
          currentEntityView = this.organization;
        }

        this.dropdown.selectByEntity(currentEntityView);
      }

      return this;
    },

    _updateFeed: function _updateFeed() {
      var feedList = document.createElement('div');
      feedList.className = 'feed__list';

      this.feedItems.feed.reverse().forEach(function(item, index) {
        this.appendChild(CV.FeedItem.create({
          name: 'feed-item__' + index,
          data: item
        })).render(feedList).showDate();
      }, this);

      this.appendChild(CV.FeedItem.create({
        name: 'feed-item__welcome',
        data: {
          action: 'message',
          text: 'You joined CrowdVoice! 🎉',
          actionDoer: Person.get(),
          createdAt: Person.get('createdAt')
        }
      })).render(feedList).showDate();

      this.el.querySelector('.profile-sidebar').appendChild(feedList);

      if (this.feedItems && this.feedItems.feed.length === 0) {
        if (this._onboarding) {return;}
        this._onboarding = document.createElement('div');
        this._onboarding.className = 'feed__list-onboarding';
        this._onboarding.textContent = 'Activity from voices and people you follow will appear here';
        feedList.appendChild(this._onboarding);
      }
    }
  }
});
