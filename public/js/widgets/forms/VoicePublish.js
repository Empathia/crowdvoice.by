Class(CV.Forms, 'VoicePublish').inherits(Widget).includes(CV.WidgetUtils)({
  ELEMENT_CLASS: 'cv-form-publish-voice',

  HTML: '\
    <div>\
      <p class="form-publish-voice__text -mb2">Great! Just choose how would you like people to find and view. <span data-voice-title class="-color-black -font-bold"></span>.</p>\
    </div>',

  prototype: {
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this._setup();
    },

    _setup: function _setup() {
      if (!this.data.voice) return;

      this.dom.updateText(this.el.querySelector('[data-voice-title]'), this.data.voice.title);

      this.appendChild(new CV.VoiceStatusOptions({
        name: 'voiceStatus'
      })).render(this.el);

      this.appendChild(new CV.UI.Button({
        name: 'buttonSend',
        className: 'primary full',
        data: {value: 'Publish Voice'}
      })).render(this.el).disable();

      this.el.insertAdjacentHTML('beforeend', '<p class="form-publish-voice__bottom-help-text -mt2 -text-center">You can change your voice status at any time on the edit voice options</p>');

      return this;
    },

    destroy: function destroy() {
      Widget.prototype.destroy.call(this);
      return null;
    }
  }
});
