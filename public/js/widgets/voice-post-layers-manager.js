var moment = require('moment');
var Velocity = require('velocity-animate');

Class(CV, 'VoicePostLayersManager').includes(NodeSupport, CustomEventSupport)({
    prototype : {
        /* DEFAULT BASIC OPTIONS */
        description : '',
        firstPostDate : '',
        lastPostDate : '',
        averagePostTotal : 100,
        averagePostWidth : 300,
        averagePostHeight : 100,
        scrollableArea : null,

        /* PRIVATE PROPERTIES */
        el : null,
        _window : null,
        /* socket io instance holder */
        _socket : null,
        /* holds the references of the VoicePostsLayer children instances */
        _layers : [],
        _cachedData : {},
        _currentMonthString : '',
        _availableWidth : 0,
        _windowInnerHeight : 0,
        _windowInnerWidth : 0,
        _averageLayerHeight : 0,
        _listenScrollEvent : true,
        _isInitialLoad : true,
        _lastScrollTop : 0,
        _scrollTimer : null,
        _scrollTime : 250,
        _resizeTimer : null,
        _resizeTime : 250,
        _lazyLoadingImageArray: null,

        /* layer offset left to perform hit-test on layer elements
         * sidebar = 60, main-container-padding-left = 40
         */
        _layersOffsetLeft : 100,

        LAYER_CLASSNAME : 'cv-voice-posts-layer',

        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this.el = this.element;
            this._window = window;
            this._socket = io();
            this._lazyLoadingImageArray = [];

            this._setGlobarVars();
            this._createEmptyLayers();

            this._bindEvents();

            this._checkInitialHash();
        },

        _bindEvents : function _bindEvents() {
            this._socket.on('monthPosts', this.loadLayer.bind(this));

            this._scrollHandlerRef = this._scrollHandler.bind(this);
            this.scrollableArea.addEventListener('scroll', this._scrollHandlerRef);

            this._resizeHandlerRef = this._resizeHandler.bind(this);
            this._window.addEventListener('resize', this._resizeHandlerRef);

            this._jumpToHandlerRef = this._jumpToHandler.bind(this);
            CV.VoiceTimelineJumpToDateItem.bind('itemClicked', this._jumpToHandlerRef);

            CV.VoiceAboutBox.bind('activate', function() {
                this._layers[0].waterfall.layout();
                this._layers[0]._updatePostIndicatorsPostion();
            }.bind(this));

            CV.VoiceAboutBox.bind('deactivate', function() {
                this._layers[0].waterfall.layout();
                this._layers[0]._updatePostIndicatorsPostion();

                localStorage['cvby__voice' + this.id + '__about-read'] = true;
            }.bind(this));
        },

        /* Jump to layer handler
         * @method _jumpToHandler <private> [Function]
         */
        _jumpToHandler : function _jumpToHandler(data) {
            var layer = this['postsLayer_' + data.dateString];
            var _this = this;

            if (!layer) return;
            if (layer === this.getCurrentMonthLayer()) return;

            this._listenScrollEvent = false;

            this._layers.forEach(function(l) {
                if (l.getPosts().length) l.empty();
            });

            Velocity(layer.el, 'scroll', {
                duration : 600,
                complete : function() {
                    _this._listenScrollEvent = true;
                }
            });
        },

        /* Handle the scrollableArea scroll event.
         * @method _scrollHandler <private> [Function]
         */
        _scrollHandler : function _scrollHandler() {
            var st = this.scrollableArea.scrollY;
            var scrollingUpwards = (st < this._lastScrollTop);
            var y = 0;
            var el;

            if (!this._listenScrollEvent) return;

            if (!scrollingUpwards) y = this._windowInnerHeight - 1;

            el = document.elementFromPoint(this._layersOffsetLeft, y);

            if (el.classList.contains(this.LAYER_CLASSNAME)) {
                if (el.dataset.date !== this._currentMonthString) {
                    this._beforeRequest(el.dataset.date, scrollingUpwards);
                }
            }

            this._lastScrollTop = st;

            if (this._scrollTimer) this._window.clearTimeout(this._scrollTimer);

            this._scrollTimer = this._window.setTimeout(function() {
                this.loadImagesVisibleOnViewport();
            }.bind(this), this._scrollTime);
        },

        /* Handle the window resize event.
         * @method _resizeHandler <private> [Function]
         */
        _resizeHandler : function _resizeHandler() {
            if (this._resizeTimer) this._window.clearTimeout(this._resizeTimer);

            this._resizeTimer = this._window.setTimeout(function() {
                this._setGlobarVars();
                this._resetLayersHeight();
            }.bind(this), this._resizeTime);
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
                return this._beforeRequest(hash);
            }

            this._beforeRequest( this._layers[0].dateString );
        },

        /* Cache variables values that depend on window’s size. This method is called on the init method and on the window.resize event.
         * @method _setGlobarVars <private>
         * @return undefined
         */
        _setGlobarVars : function _setGlobarVars() {
            this._windowInnerHeight = this._window.innerHeight;
            this._windowInnerWidth = this._window.innerWidth;
            this._availableWidth = this.element.clientWidth;
            this._updateAverageLayerHeight();
        },

        /* Sets the value to the _averageLayerHeight property.
         * @method _updateAverageLayerHeight <private>
         * @return undefined
         */
        _updateAverageLayerHeight : function _updateAverageLayerHeight() {
            this._averageLayerHeight = ~~(this.averagePostTotal * this.averagePostHeight / ~~(this._availableWidth / this.averagePostWidth));
        },

        /* Creates all the required (empty) layers per month based on the
         * `firstPostDate` and `lastPostDate` properties.
         * @method _createEmptyLayers <private>
         * @return undefined
         */
        _createEmptyLayers : function _createEmptyLayers() {
            var totalLayers = this.getTotalLayers();
            var frag = document.createDocumentFragment();
            var i = 0;

            for (i = 0; i < totalLayers; i++) {
                var dateString, layer;

                dateString = moment(this.lastPostDate).month(-i).format('YYYY-MM');
                layer = new CV.VoicePostsLayer({
                    id : i,
                    name : 'postsLayer_' + dateString,
                    dateString : dateString,
                    columnWidth : this.averagePostWidth
                });

                layer.setHeight(this.getAverageLayerHeight());

                this._layers.push(layer);
                this.appendChild(layer);
                frag.appendChild(layer.el);

                dateString = layer = null;
            }

            this.el.appendChild(frag);

            this._layers[0].el.classList.add('first');
            this._layers[this._layers.length - 1].el.classList.add('last');

            firstDate = lastDate = totalLayers = frag = i = null;
        },

        /* Sets the layer's postsContainer height equal to the
         * _averageLayerHeight value.
         * @method _resetLayersHeight <private>
         * @return undefined
         */
        _resetLayersHeight : function _resizeHandlerRef() {
            this._layers.forEach(function(layer) {
                if (!layer.getPosts().length)
                    layer.setHeight(this.getAverageLayerHeight());
            }, this);
        },

        _appendVoiceAboutBox : function _appendVoiceAboutBox(layer) {
            var voiceAboutBox = new CV.VoiceAboutBox({
                name : 'voiceAboutBox',
                description : this.description
            });

            layer.waterfall.addItems([voiceAboutBox.el]);
            layer.appendChild(voiceAboutBox).render(layer.postContainerElement);

            if (!localStorage['cvby__voice' + this.id + '__about-read']) {
                voiceAboutBox.activate();
            }

            voiceAboutBox = null;
        },

        /* Determines if we need to request the posts for the passed date.
         * If so, it will ask the socket to retrive the posts for a specific year-month.
         * @method _beforeRequest <private> [Function]
         */
        _beforeRequest : function _beforeRequest(dateString, scrollDirection) {
            if (dateString == this._currentMonthString) {
                return;
            }

            this._currentMonthString = dateString;

            // prevent to append childs if the layer is already filled
            if (this['postsLayer_' + dateString].getPosts().length > 1) {
                return;
            }

            // load from cache
            if (typeof this._cachedData[dateString] !== 'undefined') {
                return this.loadLayer(
                    this._cachedData[dateString],
                    dateString,
                    scrollDirection
                );
            }

            // request to the server
            console.time('postsFetching');
            this._socket.emit('getMonthPosts', this.id, dateString, scrollDirection);
        },

        /* Fills a specific layer with childs (posts).
         * Stores the server response.
         * Updates the _listenScrollEvent flag.
         * @param postsData <required> [Objects Array] the raw data of Post Models retrived from the server. We us this data to crate Post Widgets.
         * @dateString <required> [String] the data's month-year we received
         * @scrollDirection <optional> [Boolean] {false} false for downwards  1 for upwards
         * @return undefined
         */
        loadLayer : function loadLayer(postsData, dateString, scrollDirection) {
            console.log('response received');
            console.timeEnd('postsFetching');
            var currentLayer = this.getCurrentMonthLayer();
            var prev = currentLayer.getPreviousSibling();
            var next = currentLayer.getNextSibling();
            var calcHeightDiff = false;

            this._listenScrollEvent = false;

            if (typeof this._cachedData[dateString] === 'undefined') {
                // @TODO: remove when backend progress gets integrated,
                // this if for demo purpuses only
                for (var i = 0, l = postsData.length; i < l; i++) {
                    postsData[i].createdAt = postsData[i].createdAt.replace(/\d{4}-\d{2}/, dateString);
                }
                this._cachedData[dateString] = postsData;
            }

            if (!currentLayer.isFinalHeightKnow()) {
                calcHeightDiff = true;
            }

            if (currentLayer.id === 0) {
                this._appendVoiceAboutBox(currentLayer);
            }

            console.time('arrangePosts');
            currentLayer.addPosts(postsData);
            console.timeEnd('arrangePosts');

            if (this._isInitialLoad) {
                this._isInitialLoad = false;
                this.loadImagesVisibleOnViewport();
                this.dispatch('ready', {layer: this.getCurrentMonthLayer()});
            }

            this.dispatch('layerLoaded', {dateString: dateString});

            currentLayer.arrangeReset();

            if (prev) prev.arrangeBringToFront();

            if (scrollDirection) {
                var next2 = next && next.getNextSibling();

                if (next2) next2.empty().arrangeReset();

                if (calcHeightDiff) {
                    // compensate the heigth difference when scrolling up
                    var diff = currentLayer.getHeight() - this.getAverageLayerHeight();
                    var y = this.scrollableArea + diff;

                    this.scrollableArea.scrollTo(0, y);
                }

                this._listenScrollEvent = true;

                return;
            }

            var prev2 = prev && prev.getPreviousSibling();

            if (prev2) prev2.empty().arrangeReset();

            this._listenScrollEvent = true;
        },

        getCurrentMonthLayer : function getCurrentMonthLayer() {
            return this['postsLayer_' + this._currentMonthString];
        },

        /* Returns the value hold by the `_averageLayerHeight` property.
         * @method getAverageLayerHeight <public>
         * @return this._averageLayerHeight
         */
        getAverageLayerHeight : function getAverageLayerHeight() {
            return this._averageLayerHeight;
        },

        /* Returns the number of total month layers.
         * @method getTotalLayers <public> [Function]
         */
        getTotalLayers : function getTotalLayers() {
            var layersLen = this._layers.length;

            if (layersLen) {
                return layersLen;
            }

            var firstDate = moment(this.firstPostDate);
            var lastDate = moment(this.lastPostDate);
            var totalLayers = lastDate.diff(firstDate, 'months');

            return totalLayers;
        },

        isScrolledIntoView : function isScrolledIntoView(el) {
            var r = el.getBoundingClientRect();

            return ((r.top < this._windowInnerHeight) && (r.bottom >= 0));
        },

        loadImagesVisibleOnViewport : function loadImagesVisibleOnViewport() {
            this._lazyLoadingImageArray.forEach(function(image) {
                image.abortImage();
            });

            this._lazyLoadingImageArray = [];

            this.getCurrentMonthLayer().getPosts().forEach(function(post) {
                if (post.imageLoaded === false) {
                    if (this.isScrolledIntoView(post.el)) {
                        this._lazyLoadingImageArray.push( post.loadImage() );
                    }
                }
            }, this);
        }
    }
});
