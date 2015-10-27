Class(CV, 'FeedChangedAvatar').inherits(CV.FeedItem)({
    ELEMENT_CLASS : 'cv-feed-item changed-avatar',

    prototype : {
        init : function init(config) {
            CV.FeedItem.prototype.init.call(this, config);

            this.updateAvatar();
            this.setText(this.getName() + ' changed avatar.');
        }
    }
});
