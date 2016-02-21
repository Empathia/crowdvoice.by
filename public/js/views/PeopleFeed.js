var API = require('./../lib/api')
  , Person = require('./../lib/currentPerson')
  , Events = require('./../lib/events');

Class(CV.Views, 'PeopleFeed').includes(NodeSupport, CV.WidgetUtils)({
  prototype: {
    _notificationsLimit: 10,
    _notificationsRequests: 0,
    _notificationsTotalCount: 0,

    init: function init(config) {
      Object.keys(config || {}).forEach(function(propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      this._notificationsTotalCount = this.totalFeedItems;
      this._window = window;
      this._body = document.body;
      this.profileBody = this.el.querySelector('.profile-body');

      this._fetchItems();
      this._bindEvents();
    },

    _bindEvents: function _bindEvents() {
      this._scrollHandlerRef = this._scrollHandler.bind(this);
      Events.on(this._window, 'scroll', this._scrollHandlerRef);
    },

    _fetchItems: function _fetchItems() {
      if (this.children.length >= this._notificationsTotalCount) {
        return;
      }

      API.getFeed({
        profileName: Person.get('profileName'),
        data: {
          limit: this._notificationsLimit,
          offset: this._notificationsRequests * this._notificationsLimit
        }
      }, this._itemsHandler.bind(this));
    },

    _itemsHandler: function _itemsHandler(err, res) {
      var fragment = document.createDocumentFragment();

      this._notificationsRequests++;
      this._notificationsTotalCount = res.totalCount;

      res.feedItems.forEach(function (item, index) {
        this.appendChild(CV.FeedItem.create({
          name: 'feed-item__' + index,
          data: item
        })).render(fragment).showDate();
      }, this);
      this.profileBody.appendChild(fragment);
    },

    /* Handle the _window scroll event.
     * @private
     */
    _scrollHandler: function _scrollHandler(ev) {
      var el = ev.currentTarget;
      if ((el.scrollY + el.innerHeight) >= this._body.scrollHeight) {
        this._fetchItems();
      }
    }
  }
});
