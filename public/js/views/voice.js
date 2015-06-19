Class(CV, 'VoiceView').includes(CV.WidgetUtils, CV.VoiceHelper, NodeSupport, CustomEventSupport)({

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
        followerCount : 0,
        postCountElement : null,
        followersCountElement : null,
        aboutBoxButtonElement : null,
        scrollableArea : null,

        postsCount : 0,
        allowPosting : false,

        _window : null,
        _resizeTimer : null,
        _resizeTime : 250,
        _listenScrollEvent : true,
        _lastScrollTop : 0,
        _scrollTimer : null,
        _scrollTime : 250,
        /* layer offset left to perform hit-test on layer elements
         * sidebar = 60, main-container-padding-left = 40
         */
        _layersOffsetLeft : 100,

        LAYER_CLASSNAME : 'cv-voice-posts-layer',

        /* socket io instance holder */
        _socket : null,

        init : function init(config) {
            this.status = CV.VoiceView.STATUS_DRAFT;
            this.type = CV.VoiceView.TYPE_PUBLIC;

            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this._socket = io();
            this._window = window;
            this.postsCount = this._formatPostsCountObject(this.postsCount);

            this._appendLayersManager()._checkInitialHash();
            this._bindEvents();
        },

        /* Instantiate Widgets that give special behaviour to VoiceView, such as the AutoHide Header, Expandable Sidebar, Voice Footer, etc.
         * @method setupVoiceWidgets <public> [Function]
         * @return [CV.VoiceView]
         */
        setupVoiceWidgets : function setupVoiceWidgets() {
            new CV.Sidebar({
                element : document.getElementsByClassName('cv-main-sidebar')[0]
            });

            new CV.VoiceHeader({
                element : document.getElementsByClassName('cv-main-header')[0],
                footerVoiceTitle : document.getElementsByClassName('voice-footer-meta-wrapper')[0]
            });

            this.appendChild(
                new CV.VoiceFooter({
                    name : 'voiceFooter',
                    element : $('.voice-footer'),
                    firstPostDate : this.firstPostDate,
                    lastPostDate : this.lastPostDate,
                    scrollableArea : this.scrollableArea,
                    allowPosting : this.allowPosting
                })
            );

            return this;
        },

        /* Updates DOM Elements that are not widgets such as the backgroundCover and stats.
         * @method updateVoiceInfo <public> [Function]
         * @return [CV.Voice]
         */
        updateVoiceInfo : function updateVoiceInfo() {
            if (this.coverImage) {
                var image = document.createElement('img');
                image.className = "voice-background-cover-image";
                image.src = "<%= voice.coverImage %>";
                this.backgroundElement.appendChild(image);
            } else this.backgroundElement.className += ' -colored-background';

            this.dom.updateText(this.postCountElement, this.format.numberUS(this.postCount));
            this.dom.updateText(this.followersCountElement, this.format.numberUS(this.followerCount));

            return this;
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
                    scrollableArea : this.scrollableArea,
                    _socket : this._socket
                })
            ).render(document.querySelector('.cv-main-content'), document.querySelector('.voice-footer'));

            this.voicePostLayersManager.setup();

            return this;
        },

        /* Checks the window hash to determinate which posts to requests for initial rendering.
         * If the hash does not match the format 'YYYY-MM' it will default to newest month, requesting the latest posts.
         * If necessary, it should scroll to the specific month to load, disabling the scroll-sniffing during the scrollTo animation.
         * This method should be run only once from init.
         * @method _checkInitialHash <private> [Function]
         */
        _checkInitialHash : function _checkInitialHash() {
            var hash = window.location.hash;

            if (hash !== "" && /^\d{4}-\d{2}$/.test(hash)) {
                return this.loadLayer(hash);
            }

            this.voicePostLayersManager.loadDefaultLayer();
        },

        _bindEvents : function _bindEvents() {
            this._scrollHandlerRef = this._scrollHandler.bind(this);
            this.scrollableArea.addEventListener('scroll', this._scrollHandlerRef);

            this._resizeHandlerRef = this._resizeHandler.bind(this);
            this._window.addEventListener('resize', this._resizeHandlerRef);

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

        loadLayer : function loadLayer(dateString, scrollDirection) {
            this._listenScrollEvent = false;
            this.voicePostLayersManager._beforeRequest(dateString, scrollDirection);
            this._listenScrollEvent = true;
        },

        /* Handle the scrollableArea scroll event.
         * @method _scrollHandler <private> [Function]
         */
        _scrollHandler : function _scrollHandler() {
            var st = this._window.scrollY;
            var scrollingUpwards = (st < this._lastScrollTop);
            var y = 0;
            var el;

            if (!this._listenScrollEvent) return;

            if (!scrollingUpwards) y = this.voicePostLayersManager._windowInnerHeight - 1;

            el = document.elementFromPoint(this._layersOffsetLeft, y);

            if (el.classList.contains(this.LAYER_CLASSNAME)) {
                if (el.dataset.date !== this.voicePostLayersManager._currentMonthString) {
                    this.loadLayer(el.dataset.date, scrollingUpwards);
                }
            }

            this._lastScrollTop = st;

            if (this._scrollTimer) this._window.clearTimeout(this._scrollTimer);

            this._scrollTimer = this._window.setTimeout(function() {
                this.voicePostLayersManager.loadImagesVisibleOnViewport();
            }.bind(this), this._scrollTime);
        },

        /* Handle the window resize event.
         * @method _resizeHandler <private> [Function]
         */
        _resizeHandler : function _resizeHandler() {
            var _this = this;

            if (this._resizeTimer) this._window.clearTimeout(this._resizeTimer);

            this._resizeTimer = this._window.setTimeout(function() {
                _this.voicePostLayersManager.update();
            }, this._resizeTime);
        },

        _deactivateButton : function _deactivateButton() {
            this.aboutBoxButtonElement.style.display = 'none';
        },

        _activateButton : function _activateButton() {
            this.aboutBoxButtonElement.style.display = '';
        },

        showAboutBoxButtonHandler : function showAboutBoxButtonHandler() {
            CV.VoiceView.dispatch('voiceAboutBox:show');
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

            this.scrollableArea.removeEventListener('scroll', this._scrollHandlerRef);
            this._scrollHandlerRef = null;

            this.aboutBoxButtonElement.removeEventListener('click', this.showAboutBoxRef);
            this.showAboutBoxRef = null;

            this._window.removeEventListener('resize', this._resizeHandlerRef);
            this._resizeHandlerRef = null;

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

            if (this._resizeTimer) this._window.clearTimeout(this._resizeTimer);
            this._resizeTimer = null;
            this._resizeTime = 250;
            this._window = null;

            this._listenScrollEvent = null;
            this._lastScrollTop = null;
            this._scrollTimer = null;
            this._scrollTime = null;
            this._layersOffsetLeft = null;
            this.LAYER_CLASSNAME = null;
            this._socket = null;

            return null;
        }
    }
});
