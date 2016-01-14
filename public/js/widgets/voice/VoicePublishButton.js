var Events = require('./../../lib/events');

Class(CV, 'VoicePublishButton').inherits(Widget)({
  prototype: {
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this._setup()._bindEvents();
    },

    /* Initialize widget’s children.
     * @private
     * @return {Object} CV.VoicePublishButton
     */
    _setup: function _setup() {
      this.appendChild(new CV.UI.Button({
        name: 'button',
        className : 'small primary -mr1',
        data: {value: 'Publish'}
      })).render(this.el).disable();


      if ((this.data.voice.postsCount >= 20) &&
          Object.keys(this.data.voice.images).length) {
        this.button.enable();
      }

      return this;
    },

    /* Subscribe widget’s events.
     * @private
     */
    _bindEvents: function _bindEvents() {
      this._clickHandlerRef = this._clickHandler.bind(this);
      Events.on(this.button.el, 'click', this._clickHandlerRef);
    },

    /* Handles the button click event.
     * @private
     */
    _clickHandler: function _clickHandler() {
      console.log('clicked');
    },

    destroy: function destroy() {
      Widget.prototype.destroy.call(this);
      Events.off(this.button.el, 'click', this._clickHandlerRef);
      this._clickHandlerRef = null;
      return null;
    }
  }
});
