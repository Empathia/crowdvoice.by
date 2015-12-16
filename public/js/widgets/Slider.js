Class(CV, 'Slider').inherits(Widget)({

  ARROWS_HTML: '\
    <button class="slider-prev">\
      <svg class="slider-arrow slider-arrow-svg">\
        <use xlink:href="#svg-arrow-left"></use>\
      </svg>\
    </button>\
    <button class="slider-arrow slider-next">\
      <svg class="slider-arrow-svg">\
        <use xlink:href="#svg-arrow-right"></use>\
      </svg>\
    </button>',

  prototype: {
    /* @param {Object} config
     * @property {NodeElement} config.appendArrowsTo
     */
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this._setup();
    },

    _setup: function _setup() {
      console.log(this.appendArrowsTo);
      if (this.appendArrowsTo) {
        this.appendArrowsTo.insertAdjacentHTML('afterbegin', this.constructor.ARROWS_HTML);
      }
    },

    /* Add the arrows inside the specified element.
     * @public
     * @return Slider
     */
    // appendArrowsTo: function appendArrowsTo(element) {
    //   this.appendArrowsTo.insertAdjacentHTML('afterbegin', this.constructor.ARROWS_HTML);
    //   return this;
    // },

    destroy: function destroy() {
      Widget.prototype.destroy.call(this);
      return null;
    }
  }
});
