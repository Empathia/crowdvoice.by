Class(CV.Views, 'DiscoverBrowse').includes(NodeSupport, CV.WidgetUtils)({
    prototype : {
        /* Existing Topics.
         * @property topicsData <required> [Array] TopicsPresenter
         */
        topicsData : null,

        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this._setup();
        },

        _setup : function _setup() {
            this.appendChild(new CV.TabsManager({
                name : 'tabs',
                useHash : true,
                nav : document.querySelector('.profile-menu'),
                content : document.querySelector('.profile-menu-content')
            }));

            this.tabs.addTab({
                name : 'voices',
                title: 'Voices',
                content : CV.DiscoverBrowseVoicesTab
            });

            this.tabs.addTab({
                name : 'people',
                title: 'People',
                content : CV.DiscoverBrowsePeopleTab
            });

            this.tabs.addTab({
                name : 'organizations',
                title: 'Organizations',
                content : CV.DiscoverBrowseOrganizationsTab
            });
            this.tabs.addTabIndicator().start();

            var topicsHolder = document.querySelector('.topics-list-row');
            var topicsElements = [];
            this.topicsData.forEach(function(topic, index) {
                topicsElements.push(this.appendChild(new CV.TopicCard({
                    name : 'topic_' + index,
                    className: '-float-left',
                    data: topic
                })).render(topicsHolder).el);
            }, this);

            new CV.ResponsiveWidth({
                container : topicsHolder,
                items : [].slice.call(topicsElements, 0),
                minWidth : 300
            }).setup();
        }
    }
});
