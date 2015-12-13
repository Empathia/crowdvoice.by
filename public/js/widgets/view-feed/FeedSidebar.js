var Person = require('./../../lib/currentPerson');
// var API = require('./../../lib/api');

Class(CV, 'FeedSidebar').inherits(Widget)({
  prototype: {
    init: function init(config) {
      Widget.prototype.init.call(this, config);

      this._setup()._updateFeed();
    },

    _setup: function _setup() {
      if (Person.ownsOrganizations()) {
        var currentEntityView = Person.get();

        this.appendChild(new CV.UI.FeedDropdown({
          name : 'dropdown'
        })).render(this.el.querySelector('.profile-select-options'));

        if (this.organization) {
          currentEntityView = this.organization;
        }

        this.dropdown.selectByEntity(currentEntityView);
      }

      if (Person.anon()) {
        this.appendChild(new CV.FeedAnonymousOnboarding({
          name: 'onboarding'
        })).render(this.el.querySelector('.profile-sidebar'));
      }

      return this;
    },

    _updateFeed: function _updateFeed() {
      if (this.feedItems && this.feedItems.feed.length) {
        return this._renderFeed();
      }

      this.appendChild(new CV.FeedOnboarding({
        name: 'onboarding'
      })).render(this.el.querySelector('.profile-sidebar'));
    },

    _renderFeed: function _renderFeed() {
      var feedList = document.createElement('div');
      feedList.className = 'feed__list';

      this.feedItems.feed.reverse().forEach(function(item, index) {
        this.appendChild(CV.FeedItem.create({
          name : 'feed-item__' + index,
          className : 'cv-items-list',
          data : item
        })).render(feedList).showDate();
      }, this);

      this.el.querySelector('.profile-sidebar').appendChild(feedList);
    }
  }
});
