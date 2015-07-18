var API = require('../../lib/api');
var Gemini = require('gemini-scrollbar');

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
            <div class="cv-search-overlay__results">\
                <div class="gm-scrollbar -vertical">\
                    <span class="thumb"></span>\
                </div>\
                <div class="gm-scrollbar -horizontal">\
                    <span class="thumb"></span>\
                </div>\
                <div class="gm-scroll-view"></div>\
            </div>\
        </div>\
    ',

    prototype : {
        _lastSearchQuery : '',
        _queryRe : null,
        _queryRe2 : null,
        _keypressTimer : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._body = document.body;
            this.inputWrapper = this.el.querySelector('.cv-search-overlay__input');
            this.inputLoader = this.inputWrapper.querySelector('.cv-loader');
            this.closeElement = this.el.querySelector('.cv-search-overlay__close');

            this.scrollbar = new Gemini({
                element : this.el.querySelector('.cv-search-overlay__results'),
                createElements : false
            }).create();

            this._queryRe = new RegExp('[^A-Za-z0-9\\p{L}\\p{Nd}]+','g');
            this._queryRe2 = new RegExp('[\\ ~`!#$%\\^&*+=\\-\\[\\]\';,{}|":<>\\?]','g');

            this.appendChild(new CV.InputClearable({
                name : 'input',
                placeholder : 'Search...',
                inputClass : '-block -lg -br0 -font-bold'
            })).render(this.inputWrapper);

            this.appendChild(new CV.SearchResultsManager({
                name : 'resultsManager'
            })).render(this.scrollbar.getViewElement());

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._closeElementClickHandlerRef = this._closeElementClickHandler.bind(this);
            this.closeElement.addEventListener('click', this._closeElementClickHandlerRef);

            this._inputKeyPressHandlerRef = this._inputKeyPressHandler.bind(this);
            this.input.getElement().addEventListener('keyup', this._inputKeyPressHandlerRef);

            return this;
        },

        _inputKeyPressHandler : function _inputKeyPressHandler() {
            var _this = this;
            var inputValue = this.input.getValue().replace(this._queryRe2, ' ').replace(this._queryRe, ' ');

            if (this._keypressTimer) {
                window.clearTimeout(this._keypressTimer);
            }

            if (inputValue.length <= 2) {
                return void 0;
            }

            if (inputValue === this._lastSearchQuery) {
                return void 0;
            }

            this._keypressTimer = window.setTimeout(function() {
                window.clearTimeout(_this._keypressTimer);
                _this._lastSearchQuery = inputValue;
                _this._setSearchingState()._requestSearchResults(inputValue);
            }, 200);
        },

        _closeElementClickHandler : function _closeElementClickHandler() {
            this.dispatch('close');
        },

        _setSearchingState : function _setSearchingState() {
            this.inputLoader.classList.add('active');
            return this;
        },

        _setResponseState : function _setResponseState() {
            this.inputLoader.classList.remove('active');
            return this;
        },

        _requestSearchResults : function _requestSearchResults(queryString) {
            API.search({query: queryString}, function(err, res) {
                console.log(err);
                console.log(res);
                this.resultsManager.clearResults().renderResults(res);
                this.scrollbar.update();
                this._setResponseState();
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
