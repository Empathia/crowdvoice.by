Class(CV, 'FeedChangedBackground').inherits(CV.FeedItem)({
    ELEMENT_CLASS : 'cv-feed-item changed-background',

    prototype : {
        /* FeedPresenter Result.
         * @property <required> [Object]
         */
        data : null,
        init : function init(config) {
            CV.FeedItem.prototype.init.call(this, config);

            if (this.data.entity.type === 'organization') {
                this.updateAvatar(this.data.entity.images.small.url);
                this.setText(this.data.entity.name + ' changed background.');
            } else {
                this.updateAvatar();
                this.setText(this.getName() + ' changed background.');
            }
        }
    }
});
