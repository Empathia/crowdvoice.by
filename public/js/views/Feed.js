var Person = require('./../lib/currentPerson');

Class(CV.Views, 'Feed').includes(NodeSupport, CV.WidgetUtils)({
    prototype : {
        feedItems : null,

        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this._setup();
        },

        _setup : function _setup() {
            this.appendChild(new CV.FeedSidebar({
                name : 'sidebar',
                el : this.el.querySelector('[data-feed-sidebar]')
            }));

            if (Person.anon()) {
                this.appendChild(new CV.FeedAnonymousOnboarding({
                    name: 'onboarding'
                })).render(this.el.querySelector('.profile-body'));

                this.sidebar.fetchTopVoices();

                return;
            }

            this._updateFeed();
            this.sidebar.fetchTopVoices().showStats();
        },

        _updateFeed : function _updateFeed() {
            if (this.feedItems && this.feedItems.feed.length) {
                return this._renderFeed();
            }

            this.appendChild(new CV.FeedOnboarding({
                name: 'onboarding'
            })).render(this.el.querySelector('.profile-body'));
        },

        _renderFeed : function _renderFeed() {
            var feedList = document.createElement('div');
            feedList.className = 'feed__list';

            this.feedItems.feed.reverse().forEach(function(item, index) {
                this.appendChild(CV.FeedItem.create({
                    name : 'feed-item__' + index,
                    className : 'cv-items-list',
                    data : item
                })).render(feedList).showDate();
            }, this);

            this.el.querySelector('.profile-body').appendChild(feedList);
        }
    }
});
