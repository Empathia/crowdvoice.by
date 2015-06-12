/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesDropdown').inherits(Widget)({
    prototype : {

        el : null,
        dropdownOptions : null,
        _currentSource : '',

        init : function init(config)  {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.dropdownOptions = [];

            this._setup()._bindEvents()._setActiveOption(this.dropdownOptionTwitter);
        },

        _setup : function _setup() {
            this.appendChild(
                new CV.Dropdown({
                    name : 'dropdown',
                    showArrow : true,
                    className : 'from-sources-dropdown -full-height',
                    arrowClassName : '-s8 -color-grey',
                    bodyClassName : 'ui-vertical-list hoverable'
                })
            ).render(this.el);

            this.appendChild(
                new CV.PostCreatorFromSourcesDropdownOption({
                    name : 'dropdownOptionTwitter',
                    source : 'twitter',
                    iconID : 'twitter-bird',
                    label : 'Twitter',
                    className : 'ui-vertical-list-item'
                })
            );
            this.dropdown.addContent(this.dropdownOptionTwitter.el);
            this.dropdownOptions.push(this.dropdownOptionTwitter);

            this.appendChild(
                new CV.PostCreatorFromSourcesDropdownOption({
                    name : 'dropdownOptionYoutube',
                    source : 'youtube',
                    iconID : 'video',
                    label : 'Youtube',
                    className : 'ui-vertical-list-item'
                })
            );
            this.dropdown.addContent(this.dropdownOptionYoutube.el);
            this.dropdownOptions.push(this.dropdownOptionYoutube);

            this.appendChild(
                new CV.PostCreatorFromSourcesDropdownOption({
                    name : 'dropdownOptionGoogleNews',
                    source : 'googlenews',
                    iconID : 'article',
                    label : 'Google News',
                    className : 'ui-vertical-list-item'
                })
            );
            this.dropdown.addContent(this.dropdownOptionGoogleNews.el);
            this.dropdownOptions.push(this.dropdownOptionGoogleNews);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._optionClickHandlerRef = this._optionClickHandler.bind(this);
            this.dropdownOptions.forEach(function(option) {
                option.bind('click', this._optionClickHandlerRef);
            }, this);

            return this;
        },

        setDropdownLabel : function setDropdownLabel(label) {
            this.dropdown.setLabel(label);
            return this;
        },

        _optionClickHandler : function _optionClickHandler(ev) {
            this._setActiveOption(ev.target);
        },

        _setActiveOption : function _setActiveOption(optionWidget) {
            this._currentSource = optionWidget.getSource();
            this._deactivateOptions();
            optionWidget.activate();
            this.setDropdownLabel(optionWidget.getIcon().cloneNode(true));
            this.dropdown.deactivate();
        },

        _deactivateOptions : function _deactivateOptions() {
            this.dropdownOptions.forEach(function(option) {
                option.deactivate();
            });
        }
    }
});
