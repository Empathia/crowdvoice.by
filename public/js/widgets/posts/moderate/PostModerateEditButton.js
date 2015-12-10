/* globals App */
var API = require('../../../lib/api');

Class(CV, 'PostModerateEditButton').inherits(Widget).includes(CV.WidgetUtils, BubblingSupport)({
  HTML : '\
    <button class="-abs cv-button post-moderate-view-original-btn -m0 -color-primary">\
      <svg class="-s16 -mr1">\
        <use xlink:href="#svg-pencil"></use>\
      </svg>\
      <span>Edit Post</span>\
    </button>\
  ',

  prototype : {

    init : function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this._setup()._bindEvents();
    },

    _setup : function _setup(){
      this.appendChild(new CV.PostCreatorEditArticle({
        name : 'editArticle',
        data : {
          voiceData : this.data,
        }
      })).render(document.body);

      return this;
    },

    _bindEvents : function _bindEvents() {
      this._clickHandlerRef = this._clickHandler.bind(this);
      this.el.addEventListener('click', this._clickHandlerRef);

    },

    _clickHandler : function _clickHandler() {
      this.editArticle.activate();
    },

    destroy : function destroy() {
      Widget.prototype.destroy.call(this);

      this.el.removeEventListener('click', this._clickHandlerRef);
      this._clickHandlerRef = null;

      return null;
    }
  }
});
