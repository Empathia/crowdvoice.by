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

            var topicsHolder = document.querySelector('.homepage-category-list-row');
            this.topicsData.forEach(function(topic) {
                this.appendChild(new CV.CategoryCards(topic)).render(topicsHolder);
            }, this);
        }
    }
});
