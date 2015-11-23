var moment = require('moment');

Class(CV.Views, 'PostShow').includes(CV.WidgetUtils, NodeSupport)({
  FAVICON : '<img class="post-show__meta-icon-image" src="{src}"/>',
  prototype: {
    data: null,

    /* @param {Object} config.data - the PostModel
     */
    init: function init(config) {
      console.log('post show view');
      console.log(config);

      Object.keys(config || {}).forEach(function (propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      this.sourceElement = this.el.querySelector('.post-show__meta-source');
      this.dateTimeElement = this.el.querySelector('.post-show__meta > time');
      this.savedElement = this.el.querySelector('[data-saved]');
      this.viewOriginalBtn = this.el.querySelector('.actions-view-original-btn');
      this.actionsGroup = this.el.querySelector('.post-show__actions .multiple');

      this._setup();
    },

    _setup : function _setup() {
      if (this.data.faviconPath) {
        this.sourceElement.insertAdjacentHTML('afterbegin', this.constructor.FAVICON.replace(/{src}/, this.data.faviconPath));
        this.sourceElement.insertAdjacentHTML('beforeend', '<a href="' + this.data.sourceDomain + '" target="_blank">'+ this.data.sourceDomain.replace(/.*?:\/\/(w{3}.)?/g, "") + '</a> ');
      } else {
        this.sourceElement.parentNode.removeChild(this.sourceElement);
      }

      this.dom.updateText(this.dateTimeElement, moment(this.data.publishedAt).format('MMM DD, YYYY'));
      this.dom.updateAttr('datetime', this.dateTimeElement, this.data.publishedAt);

      this.appendChild(new CV.PostDetailActionsSave({
        name : 'actionSave'
      })).render(this.actionsGroup);

      this.appendChild(new CV.PostDetailActionsShare({
        name : 'actionShare',
        tooltipPostition : 'bottom'
      })).render(this.actionsGroup);

      if (this.data.sourceType === 'text') {
        this.dom.addClass(this.viewOriginalBtn, ['-hide']);
      } else {
        this.dom.removeClass(this.viewOriginalBtn, ['-hide']);
        this.dom.updateAttr('href', this.viewOriginalBtn, this.data.sourceUrl);
      }

      this.updateSaves(this.data);
      this.actionSave.update(this.data);
      this.actionShare.update(this.data);

      return this;
    },

    updateSaves : function updateSaves(data) {
      this.dom.updateText(this.savedElement, data.totalSaves || 0);
      return this;
    },
  }
});