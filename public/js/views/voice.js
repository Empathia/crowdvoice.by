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
        coverImage : '',
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
        postsCount : 0,
        followerCount : 0,
        postCountElement : null,
        followersCountElement : null,
        aboutBoxButtonElement : null,
        scrollableArea : null,

        init : function init(config) {
            this.status = CV.Voice.STATUS_DRAFT;
            this.type = CV.Voice.TYPE_PUBLIC;

            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            // update standalone ui elements
            if (this.coverImage) {
                var image = document.createElement('img');
                image.className = "voice-background-cover-image";
                image.src = "<%= voice.coverImage %>";
                this.backgroundElement.appendChild(image);
            } else this.backgroundElement.className += ' -fallback';

            this.dom.updateText(this.postCountElement, this.format.numberUS(this.postCount));
            this.dom.updateText(this.followersCountElement, this.format.numberUS(this.followerCount));

            // special behaviours
            new CV.Sidebar({
                element : document.getElementsByClassName('cv-main-sidebar')[0]
            });

            new CV.VoiceHeader({
                element : document.getElementsByClassName('cv-main-header')[0],
                footerVoiceTitle : document.getElementsByClassName('voice-footer-meta-wrapper')[0]
            });

            this.postsCount = this._formatPostsCountObject(this.postsCount);

            // children
            this._appendLayersManager();

            this.appendChild(
                new CV.VoiceFooter({
                    name : 'voiceFooter',
                    element : $('.voice-footer'),
                    firstPostDate : this.firstPostDate,
                    lastPostDate : this.lastPostDate,
                    scrollableArea : this.scrollableArea
                })
            );

            this._bindEvents();
        },

        /* Give DESC format to the postsCount Object and filter empty months.
         * It turns something like this:
         * {2015: {01: "100", 02: "0", 05: "200"}, ...}, {2010: {06: "0", 07: "150"}, ...}
         * into:
         * [
         *  {year: 2015, months: [{month: 05, total: 200}, {month: 01, total: 100}]},
         *  {year: 2010, months: [{month: 07: total: 150}]},
         *  ...
         * ]
         * @method _formatPostsCountObject <private> [Function]
         */
        _formatPostsCountObject : function _formatPostsCountObject(data) {
            var desc, i, j, total, years, yearsLen, year, months, monthLen, month, _tempMonths,
                result = [];

            desc = function desc(a, b) {return b - a;};

            years = Object.keys(data);
            yearsLen = years.length;
            years.sort(desc);

            for (i = 0; i < yearsLen; i++) {
                year = years[i];
                _tempMonths = [];
                months = Object.keys(data[year]);
                monthsLen = months.length;
                months.sort(desc);

                for (j = 0; j < monthsLen; j++) {
                    month = months[j];
                    total = data[year][month];
                    if (total > 0) _tempMonths.push({month: ~~month, total: ~~total});
                }

                if (_tempMonths.length > 0) result.push({year: ~~year, months: _tempMonths});
            }

            return result;
        },

        /* Checks if we have provided the information required before
         * appendind the VoicePostLayersManager Class. This method should be
         * called only once, right now it's being called by the init method.
         * @method _appendLayersManager <private>
         * @return undefined
         */
        _appendLayersManager : function _appendLayersManager() {
            if (!this.firstPostDate || !this.lastPostDate) {
                return console.warn('VoicePostLayersManager required firstPostDate or lastPostDate properties NOT to empty strings');
            }

            this.appendChild(
                new CV.VoicePostLayersManager({
                    name : 'voicePostLayersManager',
                    element : document.querySelector('.voice-posts'),
                    id : this.id,
                    description : this.description,
                    postsCount : this.postsCount,
                    firstPostDate : this.firstPostDate,
                    lastPostDate : this.lastPostDate,
                    averagePostTotal : 150,
                    averagePostWidth : 340,
                    averagePostHeight : 500,
                    scrollableArea : this.scrollableArea
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

            this.layerManagerReadyRef = this._layerManagerReadyHandler.bind(this);
            this.voicePostLayersManager.bind('ready', this.layerManagerReadyRef);
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

        /* Initialize child widgets that depends on layerManager to be loaded with content.
         * @method _layerManagerReadyHandler <private> [Function]
         */
        _layerManagerReadyHandler : function _layerManagerReareldnaHdy(data) {
            var timestamp = data.layer.getIndicators()[0].getTimestamp();

            this.voiceFooter.setTimelineInitialDate(timestamp);
            this.voiceFooter.createJumpToDateBubble(this.postsCount);

            this.voicePostLayersManager.unbind('ready', this.layerManagerReadyRef);
            this.layerManagerReadyRef = null;
        },

        layerLoadedHandler : function layerLoadedHandler(data) {
            this.voiceFooter.updateTimelineVars();
            this.voiceFooter.updateTimelineDatesMenu(data.dateString);
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

            this.voicePostLayersManager.unbind('ready', this.layerManagerReadyRef);
            this.layerManagerReadyRef = null;

            this.id = null;
            this.title = null;
            this.description = null;
            this.coverImage = null;
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
