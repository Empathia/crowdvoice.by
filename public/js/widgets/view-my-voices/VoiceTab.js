var Events = require('./../../lib/events')
  , Person = require('./../../lib/currentPerson');

Class(CV, 'MyVoicesTab').inherits(Widget).includes(CV.WidgetUtils)({
  prototype: {
    /* Flag to indicate if the content has already been rendered.
     * @property _rendered <private> [Boolean]
     */
    _rendered: false,

    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
    },

    /* Checks if the content is already rendered, if so it does nothing,
     * otherwise it will render the corrent content (onboarding or voices).
     * @private
     * @return MyVoicesTab
     */
    _update: function _update() {
      if (this._rendered === true) return this;

      if (this.data.totalVoices === 0) {
        return this._renderOnboardingMessage();
      }

      return this._renderVoices();
    },

    /* Renders the onboading message.
     * @private
     * @return MyVoicesTab
     */
    _renderOnboardingMessage: function _renderOnboardingMessage() {
      while(this.el.firstChild) {
        this.el.removeChild(this.el.firstChild);
      }

      this.appendChild(new CV.EmptyState({
        name: 'empty',
        className: '-pt4 -pb4',
        messageHTML: this.data.emptyMessage
      })).render(this.el);

      var link = this.el.getElementsByTagName('a')[0];
      if (link) {
        Events.on(link, 'click', function(ev) {
          ev.preventDefault();
          App.showVoiceCreateModal({
            ownerEntity : Person.get()
          });
        });
      }

      this._rendered = true;
      return this;
    },

    /* Renders the voices.
     * @private
     * @return MyVoicesTab
     */
    _renderVoices: function _renderVoices() {
      var fragment = document.createDocumentFragment()
        , table = document.createElement('table')
        , tr = document.createElement('tr')
        , td = document.createElement('td');

      table.className = '-full-width';

      Object.keys(this.data.voices).map(function (key, i) {
        var _tr, label, items
          , voices = this.data.voices[key];

        if (!voices.length) return;

        _tr = tr.cloneNode();
        label = td.cloneNode();
        items = td.cloneNode();

        label.className = 'my-voices-list-type-title -pr3 -pt1 -upper -font-semi-bold -text-right';
        items.className = '-pb3';

        this.dom.updateText(label, key);
        _tr.appendChild(label);

        voices.map(function (voice, j) {
          var _voice = new CV.VoiceCoverMini({
            name: 'voice_' + i + '-' + j,
            className: 'my-voices-item-list cv-items-list',
            data: voice
          }).addActions();

          items.appendChild(_voice.el);
        });

        _tr.appendChild(items);
        table.appendChild(_tr);
      }, this);

      fragment.appendChild(table);
      this.el.appendChild(fragment);
      this._rendered = true;

      return this;
    },

    /* Calls the _update method everytime the tab is activated.
     * @override
     */
    _activate: function _activate() {
      Widget.prototype._activate.call(this);
      this._update();
    }
  }
});
