Class(CV, 'SavedPostsFooter').inherits(Widget).includes(CV.WidgetUtils)({
  ELEMENT_CLASS: 'saved-posts-footer',
  HTML: '\
    <div>\
      <div class="saved-posts-footer__inner -row">\
        <div class="saved-posts-footer__left -pt1 -float-left"></div>\
        <div class="saved-posts-footer__right -float-right">\
          You have saved a total of <b>0</b> posts.\
        </div>\
      </div>\
    </div>',

  prototype: {
    init: function init(config) {
      Widget.prototype.init.call(this, config);

      this.appendChild(new CV.VoiceFilterPostsDropdown({
        name: 'filterDropdown',
        dropdownClassName: '-top'
      })).render(this.element[0].querySelector('.saved-posts-footer__left'));

      this.dom.updateText(
        this.element[0].querySelector('.saved-posts-footer__right > b'),
        this.totalPosts
      );

      this._bindEvents();
    },

    _bindEvents: function _bindEvents() {
      this.filterDropdown.bind('selectionUpdated', function(ev) {
        this.dispatch('filterPosts', {sourceTypes: ev.sourceTypes});
      }.bind(this));
      return this;
    }
  }
});
