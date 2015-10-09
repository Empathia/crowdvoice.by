Class(CV, 'SavedPosts').includes(CV.WidgetUtils, NodeSupport, CustomEventSupport)({
    prototype : {
        posts : null,
        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            if (this.posts.length) {
                return this._addManager();
            }

            this._showOnboarding();
        },

        _addManager : function _addManager() {
            this.container.insertAdjacentHTML('afterbegin', '\
                <div class="saved-posts-intro">\
                    <h1 class="-font-bold -m0">Saved Posts</h1>\
                </div>');

            this.appendChild(new CV.SavedPostsManager({
                name : 'manager',
                data : {
                    posts : this.posts
                }
            })).render(this.container);

            this.manager.layout();
        },

        _showOnboarding : function _showOnboarding() {
            this.appendChild(new CV.SavedPostsOnboarding({
                name : 'onboarding'
            })).render(this.container);
        }
    }
});

