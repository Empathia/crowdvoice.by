
Class(CV, 'Voice').includes(CV.WidgetUtils)({

    STATUS_DRAFT:           'STATUS_DRAFT',
    STATUS_UNLISTED:        'STATUS_UNLISTED',
    STATUS_PUBLISHED:       'STATUS_PUBLISHED',

    TYPE_PUBLIC:            'TYPE_PUBLIC',
    TYPE_CLOSED:            'TYPE_CLOSED',

    BACKGROUND_IMAGE_HTML:  '<img class="voice__background-cover-image" src="" alt="">',

    prototype : {

        /* default basic options */
        id:                 null,
        title:              '',
        description:        '',
        backgroundImage:    '',
        latitude:           '',
        longitude:          '',
        locationName:       '',
        ownerId:            null,
        status:             '',
        type:               '',
        twitterSearch:      '',
        tweetLastFetchAt:   '',
        rssUrl:             '',
        rssLastFetchAt:     '',
        firstPostDate:      '',
        lastPostDate:       '',
        postCount:          0,
        createdAt:          '',
        updatedAt:          '',

        /* other options */
        followerCount: 0,
        postCountElement: null,
        followersCountElement: null,

        init : function init(config) {
            this.status = CV.Voice.STATUS_DRAFT;
            this.type = CV.Voice.TYPE_PUBLIC;

            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            // update standalone ui elements
            this.dom.updateText(this.postCountElement, this.format.numberUS(this.postCount));
            this.dom.updateText(this.followersCountElement, this.format.numberUS(this.followerCount));
        }
    }
});
