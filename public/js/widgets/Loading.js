var inlineStyle = require('./../lib/inline-style');

Class(CV, 'Loading').inherits(Widget)({
    HTML : '\
        <div class="cv-loading">\
            <div class="uil-ripple-css">\
                <div></div>\
                <div></div>\
            </div>\
        </div>',

    prototype : {
        size : 56,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.setSize(this.size);
        },

        setSize : function setSize(pixelSize) {
            var size = this._scale(pixelSize);
            var transform = 'scale('+ size +')';

            inlineStyle(this.el, {
                msTransform: transform,
                webkitTransform: transform,
                transform: transform,
            });

            return this;
        },

        center : function center() {
            var transform = 'translate(-50%, -50%) scale('+ this._scale(this.size) +')';

            inlineStyle(this.el, {
                position: 'absolute',
                top: '50%',
                left: '50%',
                msTransform: transform,
                webkitTransform: transform,
                transform: transform,
            });

            return this;
        },

        setStyle : function setStyle(styles) {
            Object.keys(styles).forEach(function(propertyName) {
                this.el.style[propertyName] = styles[propertyName];
            }, this);

            return this;
        },

        _scale : function _scale(pixels) {
            return ((pixels * 100 / 200) / 100);
        }
    }
});
