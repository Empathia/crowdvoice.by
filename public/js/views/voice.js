
Class(CV, 'Voice').includes(CV.WidgetUtils, NodeSupport)({

    STATUS_DRAFT : 'STATUS_DRAFT',
    STATUS_UNLISTED : 'STATUS_UNLISTED',
    STATUS_PUBLISHED : 'STATUS_PUBLISHED',

    TYPE_PUBLIC : 'TYPE_PUBLIC',
    TYPE_CLOSED : 'TYPE_CLOSED',

    prototype : {

        /* DEFAULT BASIC OPTIONS */
        id : null,
        title : '',
        description : '',
        backgroundImage : '',
        latitude : '',
        longitude : '',
        locationName : '',
        ownerId : null,
        status : '',
        type : '',
        twitterSearch : '',
        tweetLastFetchAt : '',
        rssUrl : '',
        rssLastFetchAt : '',
        firstPostDate : '',
        lastPostDate : '',
        postCount : 0,
        createdAt : '',
        updatedAt : '',

        /* OTHER OPTIONS */
        followerCount : 0,
        postCountElement : null,
        followersCountElement : null,

        init : function init(config) {
            this.status = CV.Voice.STATUS_DRAFT;
            this.type = CV.Voice.TYPE_PUBLIC;

            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            // update standalone ui elements
            this.dom.updateText(this.postCountElement, this.format.numberUS(this.postCount));
            this.dom.updateText(this.followersCountElement, this.format.numberUS(this.followerCount));

            // children
            this._appendLayersManager();
        },

        /* Checks if we have provided the information required before
         * appendind the VoicePostLayersManager Class. This method should be
         * called only once, right now it's being called by the init method.
         * @method _appendLayersManager <private>
         * @return undefined
         */
        _appendLayersManager : function _appendLayersManager() {
            if (!this.firstPostDate || !this.lastPostDate) {
                return console.warn('VoicePostLayersManager required firstPostDate or lastPostDate properties NOT to empty strings')
            }

            this.appendChild(
                new CV.VoicePostLayersManager({
                    element : document.querySelector('.voice-posts'),
                    firstPostDate : this.firstPostDate,
                    lastPostDate : this.lastPostDate
                })
            );
        }
    }
});
