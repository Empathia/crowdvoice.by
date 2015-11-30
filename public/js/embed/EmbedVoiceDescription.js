Class(CV, 'EmbedVoiceDescription').inherits(Widget)({
  ELEMENT_CLASS : '-inline-block',

  prototype : {
    /* @param {Object} config - the configuration object
     * @property {Object} config.data
     * @property {string} config.data.description - the voice description text.
     */
    init : function init (config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];

      this._setup();
    },

    _setup : function _setup () {
      this.appendChild(new CV.UI.Button({
        name : 'button',
        className : 'micro -ghost',
        data : {value: 'About'}
      })).render(this.el);

      this.appendChild(new Widget({
        name : 'description',
        className : 'about-description-box'
      })).element.text(this.data.description);
      this.description.render(document.querySelector('.description-container'));
    }
  }
});
