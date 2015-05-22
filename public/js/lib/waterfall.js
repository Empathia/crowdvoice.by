(function(factory) {
    'use strict';

    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        window.Waterfall = factory();
    }
}(function factory() {
    'use strict';

    function Waterfall(config) {
        this.containerElement = window;
        this.items = [];
        this.columnWidth = 0;
        this.gutter = 0;
        this.centerItems = false;

        Object.keys(config || {}).forEach(function(propertyName) {
            this[propertyName] = config[propertyName];
        }, this);

        this.AVAILABLE_WIDTH = 0;
        this._blocks = [];
        this._items = [].slice.call(this.items, 0);
        this._spaceLeft = 0;

        this.containerElement.style.position = 'relative';
    }

    Waterfall.prototype._setup = function _setup() {
        var c = this.containerElement;
        var columnsCount = 0;

        this.AVAILABLE_WIDTH = (c.offsetWidth || c.innerWidth);
        this._colWidth = this.columnWidth || this._getVisibleItems()[0].offsetWidth;
        this._blocks = [];
        columnsCount = ~~(this.AVAILABLE_WIDTH / (this._colWidth + this.gutter * 2));

        if (this.centerItems) {
            this._spaceLeft = (this.AVAILABLE_WIDTH - ((this._colWidth * columnsCount) + (this.gutter * columnsCount - 1))) / 2;
        }

        for (var i = 0; i < columnsCount; i++) {
            this._blocks.push(this.gutter);
        }

        this._fit();
    };

    Waterfall.prototype._fit = function _fit() {
        var i, x, y, index, item,
            coordsX = [],
            coordsY = [],
            items = this._getVisibleItems(),
            len = items.length,
            gutter = this.gutter,
            colWidth = this._colWidth,
            spaceLeft = this._spaceLeft;

        for (i = 0; i < len; i++) {
            item = items[i];
            y = Math.min.apply(Math, this._blocks);
            index = this._blocks.indexOf(y);
            x = gutter + (index * (colWidth + gutter));

            this._blocks[index] = y + item.offsetHeight + gutter;

            coordsX.push(x);
            coordsY.push(y);
        }

        for (i = 0; i < len; i++) {
            item = items[i];
            item.style.position = 'absolute';
            item.style.left = (coordsX[i] + spaceLeft) + 'px';
            item.style.top = coordsY[i] + 'px';
            // item.style[prefixedTransform] = 'translate(' + (coordsX[i] + spaceLeft) + 'px, ' + coordsY[i] + 'px)';
        }

        this.containerElement.style.height = Math.max.apply(Math, this._blocks) + 'px';

        i = x = y = index = item = coordsX = coordsY = items = len = gutter = colWidth = spaceLeft = null;
    };

    Waterfall.prototype._getVisibleItems = function _getVisibleItems() {
        return this.getItems().filter(function(item) {
            return item.offsetParent
        });
    };

    Waterfall.prototype.layout = function layout() {
        this._setup();
    }

    Waterfall.prototype.addItems = function addItems(items) {
        this._items = this._items.concat([].slice.call(items, 0));

        return this;
    };

    Waterfall.prototype.removeItems = function removeItems(items) {
        items.forEach(function(item) {
            var index = this._items.indexOf(item);
            if (index > -1) this._items.splice(index, 1);
        }, this);
    };

    Waterfall.prototype.getItems = function getItems() {
        return this._items;
    };

    Waterfall.prototype.flushItems = function flushItems() {
        this._items = [];
    };

    Waterfall.prototype.destroy = function destroy() {
        this.containerElement = null;
        this.items = null;
        this.columnWidth = null;
        this.gutter = null;
        this.centerItems = null;

        this.AVAILABLE_WIDTH = null;
        this._blocks = null;
        this._items = null;
        this._spaceLeft = null;
    };

    return Waterfall;
}));
