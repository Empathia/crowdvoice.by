var API = require('../../../lib/api');
var Velocity = require('velocity-animate');

Class(CV, 'PostCreatorFromSources').inherits(CV.PostCreator)({

    ELEMENT_CLASS : 'cv-post-creator post-creator-from-sources',

    HTML : '\
    <div>\
        <div class="input-error-message -on-error -abs -color-danger"></div>\
        <header class="cv-post-creator__header -clearfix"></header>\
        <div class="cv-post-creator__content -abs"></div>\
        <div class="cv-post-creator__disable"></div>\
    </div>\
    ',

    DEFAULT_ERROR_MESSAGE : 'There was a problem searching for content.',

    prototype : {
        el : null,
        header : null,
        content : null,
        inputWrapper : null,

        _currentSource : '',
        _inputKeyPressHandlerRef : null,
        _inputLastValue : null,

        init : function init(config) {
            CV.PostCreator.prototype.init.call(this, config);

            console.log('new PostCreatorFromSources');

            this.el = this.element[0];
            this.header = this.el.querySelector('.cv-post-creator__header');
            this.content = this.el.querySelector('.cv-post-creator__content');
            this.inputWrapper = document.createElement('div');
            this.errorMessage = this.el.querySelector('.input-error-message');

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

            this.appendChild(new CV.PostCreatorFromSourcesQueue({
                name : 'queuePanel',
                className : '-color-bg-grey-lighter -color-border-grey-light -full-height -float-right'
            })).render(this.content);

            this.appendChild(new CV.PostCreatorFromSourcesResults({
                name : 'resultsPanel',
                className : '-color-bg-white -full-height -overflow-hidden'
            })).render(this.content);

            this._currentSource = this.sourcesDropdown.getSource();

            return this;
        },

        /* Binds the events for the InputClearable (keydown enter)
         * @method _bindEvents <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _bindEvents : function _bindEvents() {
            CV.PostCreator.prototype._bindEvents.call(this);

            this._sourceChangedRef = this._sourceChanged.bind(this);
            this.sourcesDropdown.bind('sourceChanged', this._sourceChangedRef);

            this._inputKeyPressHandlerRef = this._inputKeyPressHandler.bind(this);
            this.input.getElement().addEventListener('keypress', this._inputKeyPressHandlerRef);

            this._addPostRef = this._addPost.bind(this);
            this.resultsPanel.bind('addPost', this._addPostRef);

            return this;
        },

        _addPost : function _addPost(ev) {
            this.disable();
            this.queuePanel.setAddingPost();

            if (this.resultsPanel.children.indexOf(ev.data) >= 0) {
                Velocity(ev.data.el, 'slideUp', {
                    delay : 1000,
                    duration : 400
                });
            }

            API.postPreview({
                url : ev.data.sourceUrl
            }, this._requestPreviewHandler.bind(this));
        },

        _requestPreviewHandler : function _requestPreviewHandler(err, response) {
            if (err) {
                console.log(response);
                return this._setErrorState({
                    message : response.status + ' - ' + response.statusText
                }).enable();
            }

            this.queuePanel.addPost(response);
            this.enable()._enabledPostButton();
        },

        _sourceChanged : function _sourceChanged(ev) {
            this._currentSource = ev.source;

            if (this._query) {
                this.input.setValue(this._query);
                this.disable()._disablePostButton()._setSearching()._request(this._query);
            }
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

            if (inputValue.length <= 2) {
                return void 0;
            }

            // if (inputValue === this._inputLastValue) {
            //     return void 0;
            // }

            // this._inputLastValue = inputValue;

            this.disable()._removeErrorState()._disablePostButton()._setSearching()._request(inputValue);
        },

        _request : function _request(query) {
            this._query = query;

            var args = {
                profileName : App.Voice.owner.profileName,
                voiceSlug : App.Voice.slug,
                source : this._currentSource,
                query : this._query
            };

            API.searchPostsInSource(args, this._requestResponseHandler.bind(this));
        },

        _requestResponseHandler : function _requestResponseHandler(err, response) {
            if (err) {
                console.log(response);
                return this._setErrorState({
                    message : response.status + ' - ' + response.statusText
                }).enable();
            }

            this.resultsPanel.renderResults({
                source : this._currentSource,
                data : response,
                query : this._query
            });

            if (!response.length) {
                this._setNoResultsState();
            } else {
                this._setResultsState();
            }

            this.enable();
        },

        _showContent : function _showContent() {
            this.content.classList.add('active');
            return this;
        },

        _setSearching : function _setSearching() {
            this._showContent();
            this.resultsPanel.setSearchingState();
            this.queuePanel.setSearchingState();
            return this;
        },

        _setNoResultsState : function _setNoResultsState() {
            this._showContent();
            console.log(this._query);
            this.resultsPanel.setNoResultsState(this._query);
            return this;
        },

        _setResultsState : function _setResultsState() {
            this._showContent();
            this.resultsPanel.setResultsState();
            this.queuePanel.showOnboarding();
            return this;
        },

        /* Sets the error state.
         * @method _setErrorState <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _setErrorState : function _setErrorState(config) {
            if (config && config.message) {
                this.dom.updateText(this.errorMessage, config.message);
            } else {
                this.dom.updateText(this.errorMessage, this.constructor.DEFAULT_ERROR_MESSAGE);
            }

            this.el.classList.add('has-error');

            return this;
        },

        /* Remove error messages.
         * @method _removeErrorState <private> [Function]
         * @return [CV.PostCreatorFromUrl]
         */
        _removeErrorState : function _removeErrorState() {
            this.el.classList.remove('has-error');
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

        _enable : function _enable() {
            Widget.prototype._enable.call(this);

            this.input.getElement().focus();
        },

        _disable  : function _disable() {
            Widget.prototype._disable.call(this);

            this.input.getElement().blur();
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
