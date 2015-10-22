Class(CV, 'FeedNewTitle').inherits(CV.FeedItem)({
    ELEMENT_CLASS : 'cv-feed-item changed-title',

    prototype : {
        init : function init(config) {
            CV.FeedItem.prototype.init.call(this, config);

            this.updateAvatar();
            this.setText(this.getName() + ' changed title to a voice:');

            this.appendChild(new CV.VoiceCoverMini({
                name: 'voice-cover',
                data: this.data.voice
            })).render(this.extraInfoElement);
        }
    }
});
