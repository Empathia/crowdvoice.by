var Events = require('./../lib/events');
var ScrollTo = require('./../lib/scrollto');

Class(CV, 'Slider').inherits(Widget)({
  ARROWS_HTML: '\
    <button class="slider-arrow slider-prev">\
      <svg class="slider-arrow-svg">\
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
     * @property {Number} config.itemsWidth
     */
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this._setup()._bindEvents();
    },

    _setup: function _setup() {
      if (this.appendArrowsTo) {
        this._appendArrows(this.appendArrowsTo);
      }

      this.sliderElement = this.el.querySelector('.slider-list');
      this.itemElements = this.sliderElement.querySelectorAll('.slider-item');
      this.itemsLen = this.itemElements.length;

      return this;
    },

    _bindEvents: function _bindEvents() {
      Events.on(window, 'resize', this.update.bind(this));

      if (this.prevButton) {
        this._prevButtonClickHandlerRef = this._prevButtonClickHandler.bind(this);
        Events.on(this.prevButton, 'click', this._prevButtonClickHandlerRef);

        this._nextButtonClickHandlerRef = this._nextButtonClickHandler.bind(this);
        Events.on(this.nextButton, 'click', this._nextButtonClickHandlerRef);
      }
    },

    update: function update() {
      var sliderWidth = this.sliderElement.getBoundingClientRect().width;
      var slidesNumber = 1;

      if (this.itemsWidth) {
        if (sliderWidth > this.itemsWidth) {
          slidesNumber = Math.floor(sliderWidth / this.itemsWidth);
        }
      }

      this.index = 0;
      this._totalSlides = Math.ceil(this.itemsLen / slidesNumber) - 1;

      this._slidesShown = slidesNumber;
      this._updatePosition();

      return this;
    },

    _updatePosition: function _updatePosition() {
      var x = Math.abs(this.index * 100);

      if (this.index > 0) {
        x = (this._slidesShown * this.index + 1);
      }

      x = (x * this.itemsWidth);

      ScrollTo(this.sliderElement.parentNode, {
        x: x,
        duration: 400
      });
    },

    /* Add the arrows inside the specified element.
     * @private
     * @param {NodeElement} element - the element to append the arrows to.
     * @return Slider
     */
    _appendArrows: function _appendArrows(element) {
      element.insertAdjacentHTML('afterbegin', this.constructor.ARROWS_HTML);
      this.prevButton = element.querySelector('.slider-prev');
      this.nextButton = element.querySelector('.slider-next');
      return this;
    },

    /* Handles the `previous` button click.
     * @private
     */
    _prevButtonClickHandler: function _prevButtonClickHandler() {
      if (this.index <= 0) {
        return;
      }

      this.index--;
      this._updatePosition();
    },

    /* Handles the `next` button click.
     * @private
     */
    _nextButtonClickHandler: function _nextButtonClickHandler() {
      if (this.index >= this._totalSlides) {
        return;
      }

      this.index++;
      this._updatePosition();
    },

    destroy: function destroy() {
      Widget.prototype.destroy.call(this);
      return null;
    }
  }
});
