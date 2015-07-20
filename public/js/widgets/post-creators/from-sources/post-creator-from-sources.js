var API = require('../../../lib/api');

Class(CV, 'PostCreatorFromSources').inherits(CV.PostCreator)({

    ELEMENT_CLASS : 'cv-post-creator post-creator-from-sources',

    HTML : '\
    <div>\
        <header class="cv-post-creator__header -clearfix"></header>\
        <div class="cv-post-creator__content -abs"></div>\
        <div class="cv-post-creator__disable"></div>\
    </div>\
    ',

    prototype : {
        el : null,
        header : null,
        content : null,
        inputWrapper : null,

        _inputKeyPressHandlerRef : null,
        _inputLastValue : null,

        init : function init(config) {
            CV.PostCreator.prototype.init.call(this, config);

            console.log('new PostCreatorFromSources');

            this.el = this.element[0];
            this.header = this.el.querySelector('.cv-post-creator__header');
            this.content = this.el.querySelector('.cv-post-creator__content');
            this.inputWrapper = document.createElement('div');

            this.addCloseButton()._setup()._bindEvents()._disablePostButton();
        },

        /* Appends any required children.
         * @method _setup <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _setup : function _setup() {
            this.appendChild(new CV.PostCreatorFromSourcesDropdown({
                name : 'sourcesDropdown',
                className : '-float-left -full-height'
            })).render(this.header);

            this.appendChild( new CV.PostCreatorPostButton({
                name : 'postButton',
                className : '-float-right -full-height -color-border-grey-light'
            })).render(this.header);

            this.inputWrapper.className = '-overflow-hidden -full-height';

            this.appendChild(new CV.InputClearable({
                name : 'input',
                placeholder : 'Search for content',
                inputClass : '-block -lg -br0 -bw0 -full-height',
                className : '-full-height'
            })).render(this.inputWrapper);

            this.header.appendChild(this.inputWrapper);

            this.appendChild(new CV.PostCreatorFromSourcesResults({
                name : 'results',
                className : '-color-bg-white -full-height -float-left'
            })).render(this.content);

            this.appendChild(new CV.PostCreatorFromSourcesQueue({
                name : 'queue',
                className : '-color-bg-grey-lighter -color-border-grey-light -full-height -float-left'
            })).render(this.content);

            return this;
        },

        /* Binds the events for the InputClearable (keydown enter)
         * @method _bindEvents <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _bindEvents : function _bindEvents() {
            CV.PostCreator.prototype._bindEvents.call(this);

            this._inputKeyPressHandlerRef = this._inputKeyPressHandler.bind(this);
            this.input.getElement().addEventListener('keypress', this._inputKeyPressHandlerRef);

            return this;
        },

        /* Handles the keypress event on the input. We are only interested on the ENTER key.
         * @method _inputKeyPressHandler <private> [Function]
         */
        _inputKeyPressHandler : function _inputKeyPressHandler(ev) {
            var inputValue;

            if (ev.keyCode !== 13) {
                return void 0;
            }

            inputValue = this.input.getValue();

            if (inputValue === this._inputLastValue) {
                return void 0;
            }

            this._inputLastValue = inputValue;

            this._disablePostButton()._setSearching()._request(inputValue);
        },

        _request : function _request(query) {
            this._query = query;

            var args = {
                profileName : App.Voice.owner.profileName,
                voiceSlug : App.Voice.slug,
                source : 'youtube',
                query : this._query
            };

            API.searchPostsInSource(args, this._requestResponseHandler.bind(this));
        },

        _requestResponseHandler : function _requestResponseHandler(err, response) {
            console.log(err);
            console.log(response);

            this.results.showResults({
                source : 'youtube',
                data : response,
                query : this._query
            });

            this._setResultsState();
        },

        _showContent : function _showContent() {
            this.content.classList.add('active');
            return this;
        },

        _setSearching : function _setSearching() {
            this._showContent();
            this.results.setSearchingState();
            this.queue.setSearchingState();
            return this;
        },

        _setNoResultsState : function _setNoResultsState() {
            this._showContent();
            this.results.setNoResultsState();
            return this;
        },

        _setResultsState : function _setResultsState() {
            this._showContent();
            this.results.setResultsState();
            this.queue.showOnboarding();
            return this;
        },

        /* Enables the Post Button.
         * @method _enabledPostButton <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _enabledPostButton : function _enabledPostButton() {
            this.postButton.enable();
            return this;
        },

        /* Disables the Post Button.
         * @method _disablePostButton <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _disablePostButton : function _disablePostButton() {
            this.postButton.disable();
            return this;
        },

        _activate : function _activate() {
            CV.PostCreator.prototype._activate.call(this);

            this.input.getElement().focus();
        },

        destroy : function destroy() {
            this.input.getElement().removeEventListener('keypress', this._inputKeyPressHandlerRef);
            this._inputKeyPressHandlerRef = null;

            CV.PostCreator.prototype.destroy.call(this);

            this.el = null;
            this.header = null;
            this.content = null;
            this.inputWrapper = null;

            return null;
        }
    }
});
