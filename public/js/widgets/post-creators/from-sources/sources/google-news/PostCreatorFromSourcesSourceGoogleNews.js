Class(CV, 'PostCreatorFromSourcesSourceGoogleNews').inherits(Widget).includes(CV.WidgetUtils)({
  prototype: {
    /* the results data to be rendered */
    data: null,
    init: function init(config) {
      Widget.prototype.init.call(this, config);

      var child = CV[this.constructor.className + 'Item']
        , fragment = document.createDocumentFragment();

      this.data.forEach(function(data, index) {
        this.appendChild(new child({
          name: 'item-gn-' + index,
          data: data
        })).render(fragment);
      }, this);

      this.element[0].appendChild(fragment);
    }
  }
});
