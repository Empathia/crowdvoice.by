var Events = require('./../../lib/events');

Class(CV, 'EmbedHeaderViewButtons').inherits(Widget).includes(BubblingSupport)({
  ELEMENT_CLASS : 'cv-button-group multiple',

  prototype : {
    _activatedView : '',

    init : function init (config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this._activatedView = this.defaultView;

      this._setup()._bindEvents();
    },

    /* Initialize its children widgets.
     * @private
     */
    _setup : function _setup () {
      this.appendChild(new CV.UI.Button({
        name : 'cardsView',
        className : 'tiny'
      }))
      .updateHTML('<svg class="-s16"><use xlink:href="#svg-cards"></use></svg>')
      .render(this.el);
      this.cardsView.dom.updateAttr('data-view', this.cardsView.el, 'cards');

      this.appendChild(new CV.UI.Button({
        name : 'listView',
        className : 'tiny'
      }))
      .updateHTML('<svg class="-s16"><use xlink:href="#svg-list"></use></svg>')
      .render(this.el);
      this.listView.dom.updateAttr('data-view', this.listView.el, 'list');

      this._updateCurrentActiveButton();

      return this;
    },

    /* Subscribe widgets events and initialized widget’s children events if needed.
     * @private
     */
    _bindEvents : function _bindEvents () {
      this._clickHandlerRef = this._clickHandler.bind(this);
      Events.on(this.cardsView.el, 'click', this._clickHandlerRef);
      Events.on(this.listView.el, 'click', this._clickHandlerRef);
      return this;
    },

    /* Handle the click for both children elements.
     * @private
     */
    _clickHandler : function _clickHandler (ev) {
      var newView = ev.currentTarget.dataset.view;

      if (newView === this._activatedView) { return; }

      this._activatedView = newView;
      this._updateCurrentActiveButton();
      this.dispatch('changedView', {data: newView});
    },

    _updateCurrentActiveButton : function _updateCurrentActiveButton () {
      this.listView.deactivate();
      this.cardsView.deactivate();

      if (this._activatedView === 'cards') {
        this.cardsView.activate();
      } else if (this._activatedView === 'list') {
        this.listView.activate();
      }
    }
  }
});
