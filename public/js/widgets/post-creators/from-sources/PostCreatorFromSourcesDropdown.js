/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesDropdown').inherits(Widget)({
  prototype: {
    el : null,
    dropdownOptions : null,
    _currentSource : '',

    init: function init(config)  {
      Widget.prototype.init.call(this, config);
      this.dropdownOptions = [];
      // this._setup()._bindEvents()._setActiveOption(this.dropdownOptions[0]);
      this._setup()._bindEvents();
    },

    /* @return {Object} this
     */
    _setup: function _setup() {
      var el = this.element[0];

      this.appendChild(new CV.Dropdown({
        name: 'dropdown',
        showArrow: true,
        className: 'from-sources-dropdown -full-height -color-border-grey-light',
        arrowClassName: '-s8 -color-grey',
        bodyClassName: 'ui-vertical-list hoverable'
      })).render(el);

      this.appendChild(new CV.PostCreatorFromSourcesDropdownOption({
        name: 'dropdownOptionTwitter',
        source: 'twitter',
        iconID: 'twitter-bird',
        label: 'Twitter',
        iconClassName: 'twitter-option',
        className: 'ui-vertical-list-item'
      }));
      this.dropdown.addContent(this.dropdownOptionTwitter.el);
      this.dropdownOptions.push(this.dropdownOptionTwitter);

      this.appendChild(new CV.PostCreatorFromSourcesDropdownOption({
        name: 'dropdownOptionYoutube',
        source: 'youtube',
        iconID: 'youtube',
        label: 'Youtube',
        iconClassName: 'youtube-option',
        className: 'ui-vertical-list-item'
      }));
      this.dropdown.addContent(this.dropdownOptionYoutube.el);
      this.dropdownOptions.push(this.dropdownOptionYoutube);

      this.appendChild(new CV.PostCreatorFromSourcesDropdownOption({
        name: 'dropdownOptionGoogleNews',
        source: 'googleNews',
        iconID: 'google-news',
        label: 'Google News',
        className: 'ui-vertical-list-item'
      }));
      this.dropdown.addContent(this.dropdownOptionGoogleNews.el);
      this.dropdownOptions.push(this.dropdownOptionGoogleNews);

      return this;
    },

    /* Register widget’s events.
     * @return {Object} this
     */
    _bindEvents: function _bindEvents() {
      this._optionClickHandlerRef = this._optionClickHandler.bind(this);
      this.dropdownOptions.forEach(function(option) {
        option.bind('click', this._optionClickHandlerRef);
      }, this);
      return this;
    },

    setDefaultOption: function setDefaultOption() {
      this._setActiveOption(this.dropdownOptions[0]);
      return this;
    },

    /* Returns the current selected source name.
     * @return {String} current source name
     */
    getSource: function getSource() {
      return this._currentSource;
    },

    /* Updates the dropdown label.
     * @param {NodeElements} label - the new label contents.
     * @return {Object} this
     */
    setDropdownLabel: function setDropdownLabel(label) {
      this.dropdown.setLabel(label);
      return this;
    },

    /* Dropdown items click handler.
     * @private
     */
    _optionClickHandler: function _optionClickHandler(ev) {
      this._setActiveOption(ev.target);
    },

    /* Sets a dropdown item as selected.
     * @private
     */
    _setActiveOption: function _setActiveOption(optionWidget) {
      if (this._currentSource === optionWidget.getSource) {
        return;
      }

      this._currentSource = optionWidget.getSource();
      this._deactivateOptions();
      optionWidget.activate();
      this.setDropdownLabel(optionWidget.getIcon().cloneNode(true));
      this.dropdown.deactivate();
      this.dispatch('sourceChanged', {source: optionWidget.source});
    },

    /* Deactivate all dropdown options.
     * @private
     */
    _deactivateOptions: function _deactivateOptions() {
      this.dropdownOptions.forEach(function(option) {
        option.deactivate();
      });
    }
  }
});
