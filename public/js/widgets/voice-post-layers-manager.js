
var moment = require('moment');

Class(CV, 'VoicePostLayersManager').includes(NodeSupport)({
    prototype : {

        /* DEFAULT BASIC OPTIONS */
        firstPostDate : '',
        lastPostDate : '',
        averagePostTotal : 100,
        averagePostWidth : 350,
        averagePostHeight : 100,

        /* PRIVATE PROPERTIES */
        /* holds the references of the VoicePostsLayer children instances */
        _layers : [],
        _availableWidth : 0,
        _windowInnerHeight : 0,
        _averageLayerHeight : 0,

        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this.el = this.element;

            this._setGlobarVars();
            this._createEmptyLayers();
        },

        _setGlobarVars : function _setGlobarVars() {
            this._windowInnerHeight = window.innerHeight;
            this._availableWidth = this.element.clientWidth;
            this._setAverageLayerHeight();
        },

        _setAverageLayerHeight : function _setAverageLayerHeight() {
            this._averageLayerHeight = ~~(this.averagePostTotal * this.averagePostHeight / ~~(this._availableWidth / this.averagePostWidth));
        },

        /* Creates all the required (empty) layers per month based on the
         * `firstPostDate` and `lastPostDate` properties.
         * @method _createEmptyLayers <private>
         * @private
         */
        _createEmptyLayers : function _createEmptyLayers() {
            var firstDate = moment(this.firstPostDate);
            var lastDate = moment(this.lastPostDate);
            var totalLayers = lastDate.diff(firstDate, 'months');
            var frag = document.createDocumentFragment();
            var i = 0;

            console.log( totalLayers );

            for (i = 0; i < totalLayers; i++) {
                var dateString, layer;

                dateString = moment(this.lastPostDate).month(-i).format('YYYY-MM');
                layer = new CV.VoicePostsLayer({
                    name : 'postsLayer_' + dateString,
                    dateString : dateString
                });

                layer.setHeight(this.getAverageLayerHeight() + 'px');

                this._layers.push(layer);
                this.appendChild(layer);
                frag.appendChild(layer.el);

                dateString = layer = null;
            }

            this.el.appendChild(frag);
        },

        getAverageLayerHeight : function getAverageLayerHeight() {
            return this._averageLayerHeight;
        }
    }
});
