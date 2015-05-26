Class(CV, 'Voice').includes(CV.WidgetUtils, NodeSupport, CustomEventSupport)({

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
        aboutBoxButtonElement : null,

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

            this.appendChild(
                new CV.VoiceFooter({
                    name : 'voiceFooter',
                    element : $('.voice-footer'),
                    firstPostDate : this.firstPostDate,
                    lastPostDate : this.lastPostDate
                })
            );

            // listeners
            this._bindEvents();
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
                    name : 'voicePostLayersManager',
                    element : document.querySelector('.voice-posts'),
                    id : this.id,
                    description : this.description,
                    firstPostDate : this.firstPostDate,
                    lastPostDate : this.lastPostDate,
                    averagePostTotal : 24,
                    averagePostWidth : 340,
                    averagePostHeight : 500
                })
            );
        },

        _bindEvents : function _bindEvents() {
            this.showAboutBoxRef = this.showAboutBoxButtonHandler.bind(this);
            this.aboutBoxButtonElement.addEventListener('click', this.showAboutBoxRef);

            this._deactivateButtonRef = this._deactivateButton.bind(this);
            CV.VoiceAboutBox.bind('activate', this._deactivateButtonRef);

            this._activateButtonRef = this._activateButton.bind(this);
            CV.VoiceAboutBox.bind('deactivate', this._activateButtonRef);

            this.layerLoadedRef = this.layerLoadedHandler.bind(this);
            this.voicePostLayersManager.bind('layerLoaded', this.layerLoadedRef);
        },

        _deactivateButton : function _deactivateButton() {
            this.aboutBoxButtonElement.style.display = 'none';
        },

        _activateButton : function _activateButton() {
            this.aboutBoxButtonElement.style.display = '';
        },

        showAboutBoxButtonHandler : function showAboutBoxButtonHandler() {
            CV.Voice.dispatch('voiceAboutBox:show');
        },

        layerLoadedHandler : function layerLoadedHandler() {
            this.voiceFooter.voiceTimelineFeedback.updateVars();
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.aboutBoxButtonElement.removeEventListener('click', this.showAboutBoxRef);
            this.showAboutBoxRef = null;

            CV.VoiceAboutBox.unbind('activate', this._deactivateButtonRef);
            this._deactivateButtonRef = null;

            CV.VoiceAboutBox.unbind('deactivate', this._activateButtonRef);
            this._activateButtonRef = null;

            this.voicePostLayersManager.unbind('layerLoaded', this.layerLoadedRef);
            this.layerLoadedRef = null;

            this.id = null;
            this.title = null;
            this.description = null;
            this.backgroundImage = null;
            this.latitude = null;
            this.longitude = null;
            this.locationName = null;
            this.ownerId = null;
            this.status = null;
            this.type = null;
            this.twitterSearch = null;
            this.tweetLastFetchAt = null;
            this.rssUrl = null;
            this.rssLastFetchAt = null;
            this.firstPostDate = null;
            this.lastPostDate = null;
            this.postCount = null;
            this.createdAt = null;
            this.updatedAt = null;

            this.followerCount = null;
            this.postCountElement = null;
            this.followersCountElement = null;
            this.aboutBoxButtonElement = null;
        }
    }
});
