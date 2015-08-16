Class(CV, 'SavedPosts').includes(CV.WidgetUtils, NodeSupport, CustomEventSupport)({
    prototype : {
        posts : null,
        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this.appendChild(new CV.SavedPostsManager({
                name : 'manager',
                data : {
                    posts : this.posts
                }
            })).render(this.container);

            this.manager.layout();
        }
    }
});

