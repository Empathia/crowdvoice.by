Class(CV, 'Post').inherits(Widget).includes(CV.WidgetUtils)({
    ACTIONS_HTML : '\
        <div class="post-card-actions">\
            <div class="-row -full-height">\
                <div class="post-card-actions-item -col-4">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-repost"></use>\
                    </svg>\
                </div>\
                <div class="post-card-actions-item -col-4">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-save"></use>\
                    </svg>\
                </div>\
                <div class="post-card-actions-item -col-4">\
                    <svg class="post-card-activity-svg">\
                        <use xlink:href="#svg-share"></use>\
                    </svg>\
                </div>\
            </div>\
        </div>\
    ',

    create : function create(config) {
        var type = this.prototype.format.capitalizeFirstLetter(config.sourceType);

        return new window['CV']['Post' + type](config);
    },

    prototype : {
        _repostIntent : function _repostIntent() {},
        _repost : function _repost() {},

        _save : function _save() {},

        shareIntent : function shareIntent() {},
        _share : function _share() {}
    }
});

