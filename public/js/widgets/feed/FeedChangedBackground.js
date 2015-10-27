Class(CV, 'FeedChangedBackground').inherits(CV.FeedItem)({
    ELEMENT_CLASS : 'cv-feed-item changed-background',

    prototype : {
        init : function init(config) {
            CV.FeedItem.prototype.init.call(this, config);

            this.updateAvatar();
            this.setText(this.getName() + ' changed background.');
        }
    }
});
