var API = require('../../lib/api');

Class(CV, 'Search').inherits(Widget)({
    ELEMENT_CLASS : 'cv-search-overlay',

    HTML : '\
        <div>\
            <header class="cv-search-overlay__header">\
                <p class="header-title">Type in what you’re looking for and press enter to search.</p>\
                <svg class="cv-search-overlay__close -clickable -s18 -abs">\
                    <use xlink:href="#svg-close"></use>\
                </svg>\
            </header>\
            <div class="cv-search-overlay__input -rel">\
                <svg class="input-search-icon -s18 -abs">\
                    <use xlink:href="#svg-search"></use>\
                </svg>\
                <div class="cv-loader -abs">\
                    <div class="ball-spin-fade-loader">\
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>\
                    </div>\
                </div>\
            </div>\
            <div class="cv-search-overlay__results"></div>\
        </div>\
    ',

    prototype : {
        _lastSearchQuery : '',

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._body = document.body;
            this.inputWrapper = this.el.querySelector('.cv-search-overlay__input');
            this.inputLoader = this.inputWrapper.querySelector('.cv-loader');
            this.resultsWrapper = this.el.querySelector('.cv-search-overlay__results');
            this.closeElement = this.el.querySelector('.cv-search-overlay__close');

            this.appendChild(new CV.InputClearable({
                name : 'input',
                placeholder : 'Search...',
                inputClass : '-block -lg -br0'
            })).render(this.inputWrapper);

            this.appendChild(new CV.SearchResultsManager({
                name : 'resultsManager',
                className : '-full-width'
            })).render(this.resultsWrapper);

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._closeElementClickHandlerRef = this._closeElementClickHandler.bind(this);
            this.closeElement.addEventListener('click', this._closeElementClickHandlerRef);

            this._inputKeyPressHandlerRef = this._inputKeyPressHandler.bind(this);
            this.input.getElement().addEventListener('keypress', this._inputKeyPressHandlerRef);

            return this;
        },

        _inputKeyPressHandler : function _inputKeyPressHandler(ev) {
            if (ev.keyCode !== 13) {
                return void 0;
            }

            var inputValue = this.input.getValue();

            if (inputValue === this._lastSearchQuery) {
                return void 0;
            }

            this._lastSearchQuery = inputValue;

            this._setSearchingState()._requestSearchResults(inputValue);
        },

        _closeElementClickHandler : function _closeElementClickHandler() {
            this.dispatch('close');
        },

        _setSearchingState : function _setSearchingState() {
            this.inputLoader.classList.add('active');
            this.resultsManager.clearResults();
            return this;
        },

        _setResponseState : function _setResponseState() {
            this.inputLoader.classList.remove('active');
            return this;
        },

        _requestSearchResults : function _requestSearchResults(queryString) {
            queryString = queryString.trim().replace(/\s/g, '+');
            queryString = window.encodeURIComponent(queryString);

            API.search({query: queryString}, function(err, res) {
                console.log(err);
                console.log(res);
                this._setResponseState();
                this.resultsManager.renderResults(res);
            }.bind(this));
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this._body.style.overflow = 'hidden';
            this.input.getElement().focus();
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this._body.style.overflow = '';
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.closeElement.removeEventListener('click', this._closeElementClickHandlerRef);
            this._closeElementClickHandlerRef = null;

            return null;
        }
    }
});
