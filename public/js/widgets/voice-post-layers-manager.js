
var moment = require('moment');

Class(CV, 'VoicePostLayersManager').includes(NodeSupport, CustomEventSupport)({
    prototype : {

        /* DEFAULT BASIC OPTIONS */
        firstPostDate : '',
        lastPostDate : '',
        averagePostTotal : 100,
        averagePostWidth : 350,
        averagePostHeight : 100,
        description : '',

        /* PRIVATE PROPERTIES */
        /* socket io instance holder */
        _socket : null,
        /* holds the references of the VoicePostsLayer children instances */
        _layers : [],
        _cachedData : {},
        _currentMonthString : '',
        _availableWidth : 0,
        _windowInnerHeight : 0,
        _averageLayerHeight : 0,
        _listenScrollEvent : true,
        _isInitialLoad : true,

        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this.el = this.element;
            this._socket = io();

            this._setGlobarVars();
            this._createEmptyLayers();

            this._bindEvents();

            this._checkInitialHash();
        },

        _bindEvents : function _bindEvents() {
            this._socket.on('monthData', this.loadLayer.bind(this));
        },

        _checkInitialHash : function _checkInitialHash() {
            var hash = window.location.hash;

            if (hash !== "" && /^\d{4}-\d{2}$/.test(hash)) {
                return this._beforeRequest(hash);
            }

            this._beforeRequest( this._layers[0].dateString );
        },

        /* Cache variables values that depend on window’s size. This method is
         * called on the init method and on the window.resize event.
         * @method _setGlobarVars <private>
         * @return undefined
         */
        _setGlobarVars : function _setGlobarVars() {
            this._windowInnerHeight = window.innerHeight;
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
            var firstDate = moment(this.firstPostDate);
            var lastDate = moment(this.lastPostDate);
            var totalLayers = lastDate.diff(firstDate, 'months');
            var frag = document.createDocumentFragment();
            var i = 0;

            for (i = 0; i < totalLayers; i++) {
                var dateString, layer;

                dateString = moment(this.lastPostDate).month(-i).format('YYYY-MM');
                layer = new CV.VoicePostsLayer({
                    name : 'postsLayer_' + dateString,
                    dateString : dateString,
                    columnWidth : this.columnWidth
                });

                // handle special case
                // append CV.VoiceAboutBox to the first layer
                if (i == 0) this._appendVoiceAboutBox(layer);

                layer.setHeight(this.getAverageLayerHeight());

                this._layers.push(layer);
                this.appendChild(layer);
                frag.appendChild(layer.el);

                dateString = layer = null;
            }

            this.el.appendChild(frag);

            firstDate = lastDate = totalLayers = frag = i = null;
        },

        _appendVoiceAboutBox : function _appendVoiceAboutBox(layer) {
            var voiceAboutBox = new CV.VoiceAboutBox({
                name : 'voiceAboutBox',
                description : this.description
            });

            layer.appendChild(voiceAboutBox).render(layer.element);

            if (localStorage['cvby__voice' + this.id + '__about-read']) {
                voiceAboutBox.deactivate();
            } else voiceAboutBox.activate();

            voiceAboutBox = null;
        },

        _beforeRequest : function _beforeRequest(dateString, scrollDirection) {
            console.log(dateString)
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
            this._socket.emit('getMonth', dateString, scrollDirection);
        },

        /* Fills a specific layer with childs (posts).
         * Stores the server response.
         * Updates the _listenScrollEvent flag.
         * @param postsData <required> [Objects Array] the raw data of Post
         *  Models retrived from the server. We us this data to crate Post
         *  Widgets.
         * @dateString <required> [String] the data's month-year we received
         * @scrollDirection <optional> [Boolean] {false} false for downwards
         *  1 for upwards
         * @return undefined
         */
        loadLayer : function loadLayer(postsData, dateString, scrollDirection) {
            var currentLayer = this.getCurrentMonthLayer();

            this._listenScrollEvent = false;

            if (typeof this._cachedData[dateString] === 'undefined') {
                this._cachedData[dateString] = postsData;
            }

            currentLayer.addPosts(postsData);

            if (this._isInitialLoad) {
                this._isInitialLoad = false;
                // this.loadImagesVisibleOnViewport();
            }

            if (scrollDirection) {
                var next = currentLayer.getNextSibling();
                next = next && next.getNextSibling();

                if (next) next.empty();

                if (currentLayer.isFinalHeightKnow() === false) {
                    // compensate the heigth difference when scrolling up
                    var diff = currentLayer.getHeight() - this.getAverageLayerHeight();
                    var y = window.scrollY + diff;

                    window.scrollTo(0, y);
                }

                this._listenScrollEvent = true;

                return;
            }

            var prev = currentLayer.getPreviousSibling();
            prev = prev && prev.getPreviousSibling();

            if (prev) prev.empty();

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
        }
    }
});
