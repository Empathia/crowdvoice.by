/* globals App */
var API = require('../../../lib/api');
var Events = require('../../../lib/events');
var Velocity = require('velocity-animate');

Class(CV, 'PostCreatorFromSources').inherits(CV.PostCreator)({
  ELEMENT_CLASS: 'cv-post-creator post-creator-from-sources',

  HTML: '\
    <div>\
      <div class="input-error-message -on-error -abs -color-negative"></div>\
      <header class="cv-post-creator__header -clearfix">\
        <div data-input-wrapper class="-overflow-hidden -full-height">\
        </div>\
      </header>\
      <div class="cv-post-creator__content -abs"></div>\
      <div class="cv-post-creator__disable"></div>\
    </div>',

  DEFAULT_ERROR_MESSAGE: 'There was a problem searching for content.',

  prototype: {
    el: null,
    header: null,
    content: null,

    _currentSource: '',
    _addedPostsCounter: 0,
    _inputKeyUpHandlerRef: null,
    _inputKeyUpTimer: null,
    _inputLastValue: null,
    _postsAdded: false,

    /* @override
     */
    init: function init(config) {
      CV.PostCreator.prototype.init.call(this, config);
      this.el = this.element[0];
      this.header = this.el.querySelector('.cv-post-creator__header');
      this.content = this.el.querySelector('.cv-post-creator__content');
      this.errorMessage = this.el.querySelector('.input-error-message');
      this.addCloseButton()._setup()._bindEvents();
      this.sourcesDropdown.setDefaultOption();
    },

    /* Appends any required children.
     * @private
     * @return [PostCreatorFromUrl]
     */
    _setup: function _setup() {
      var inputWrapper = this.el.querySelector('[data-input-wrapper]');

      this.appendChild(new CV.PostCreatorPostButton({
        name: 'postButton',
        className: '-float-right -full-height -color-border-grey-light'
      })).render(this.header, this.header.firstChild).disable();

      this.appendChild(new CV.PostCreatorFromSourcesDropdown({
        name: 'sourcesDropdown',
        className: '-float-left -full-height'
      })).render(this.header, this.header.firstChild);

      this.appendChild(new CV.UI.Button({
        name: 'authTwitterButton',
        className: 'small dark -mt1 -ml1',
        data: {value: 'Connect to Twitter'}
      })).render(inputWrapper);

      this.appendChild(new CV.InputClearable({
        name: 'input',
        placeholder: 'Search for content',
        inputClass: '-block -lg -br0 -bw0 -full-height',
        className: '-full-height'
      })).render(inputWrapper);

      this.appendChild(new CV.PostCreatorFromSourcesQueue({
        name: 'queuePanel',
        className: '-color-bg-grey-lighter -color-border-grey-light -full-height -float-right'
      })).render(this.content);

      this.appendChild(new CV.PostCreatorFromSourcesResults({
        name: 'resultsPanel',
        className: '-color-bg-white -full-height -overflow-hidden'
      })).render(this.content);

      return this;
    },

    /* Binds the events for the InputClearable (keydown enter)
     * @private
     * @return [PostCreatorFromUrl]
     */
    _bindEvents: function _bindEvents() {
      CV.PostCreator.prototype._bindEvents.call(this);

      this._authTwitterHandlerRef = this._authTwitterHandler.bind(this);
      Events.on(this.authTwitterButton.el, 'click', this._authTwitterHandlerRef);

      this._sourceChangedRef = this._sourceChanged.bind(this);
      this.sourcesDropdown.bind('sourceChanged', this._sourceChangedRef);

      this._inputKeyUpHandlerRef = this._inputKeyUpHandler.bind(this);
      Events.on(this.input.getElement(), 'keyup', this._inputKeyUpHandlerRef);

      this._addPostRef = this._addPost.bind(this);
      this.resultsPanel.bind('addPost', this._addPostRef);

      this._postDeletedRef = this._postDeleted.bind(this);
      this.bind('post:moderate:delete', this._postDeletedRef);

      this.postButton.bind('buttonClick', this._handlePostButtonClick.bind(this));

      return this;
    },

    /* Handles the keyup event on the input. It will debounce the event for 500ms.
     * @private
     */
    _inputKeyUpHandler: function _inputKeyUpHandler() {
      window.clearTimeout(this._inputKeyUpTimer);
      this._inputKeyUpTimer = window.setTimeout(this._validateInputValue.bind(this), 500);
    },

    /* Checks if a new request can be made.
     * @private
     */
    _validateInputValue: function _validateInputValue() {
      var inputValue = this.input.getValue();
      this._inputKeyUpTimer = null;
      if ((inputValue.length <= 2) || (inputValue === this._inputLastValue)) return;
      this._inputLastValue = inputValue;
      this._removeErrorState()._setSearching()._request(inputValue);
    },

    /* Calls the `postPreview` API to generate a preview.
     * @private
     */
    _addPost: function _addPost(ev) {
      this.queuePanel.setAddingPost();

      if (this.resultsPanel.source.children.indexOf(ev.data) >= 0) {
        Velocity(ev.data.element[0], 'slideUp', {delay: 500, duration : 400});
      }

      API.postPreview({
        profileName: App.Voice.data.owner.profileName,
        voiceSlug: App.Voice.data.slug,
        url: ev.data.data.sourceUrl
      }, this._requestPreviewHandler.bind(this, ev));
    },

    /* `postPreview` API preview call response handler.
     * Add the preview to the queue.
     * @private
     */
    _requestPreviewHandler: function _requestPreviewHandler(ev, err, response) {
      if (err || response.error) {
        console.log(response);

        var revert = true;

        this.queuePanel.loader.disable();

        var errorMessage = '';
        if (response.responseJSON) {
          errorMessage = response.responseJSON.status;
        } else if (typeof response.error === 'string') {
          // url already exists, no need to show the item back
          errorMessage = response.error;
          revert = false;
        } else {
          errorMessage = response.status + ' - ' + response.statusText;
        }

        if (revert) {
          if (this.resultsPanel.children.indexOf(ev.data) >= 0) {
            Velocity(ev.data.el, 'slideDown', {duration : 400});
          }
        }

        return this._setErrorState({message: errorMessage});
      }

      this._addedPostsCounter++;
      this.postButton.updateCounter(this._addedPostsCounter);
      this.queuePanel.addPost(response);
      this._enabledPostButton();
    },

    /* Listener handler for when a Post was removed from the queuePanel,
     * decrement the post button couter label and disable the button if it
     * has reach back to zero.
     * @private
     */
    _postDeleted: function _postDeleted() {
      this._addedPostsCounter--;
      this.postButton.updateCounter(this._addedPostsCounter);
      if (!this._addedPostsCounter) {
        this._disablePostButton();
      }
    },

    /* PostButton click handler. Calls the `postCreate` API to save the current Post displayed as preview.
     * @private
     */
    _handlePostButtonClick: function _handlePostButtonClick() {
      this.disable();
      this._disablePostButton();
      this.queuePanel.setAddingPost();

      var posts = this.queuePanel.children.map(function(post) {
        return post.getEditedData();
      });

      API.postCreate({
        profileName: App.Voice.data.owner.profileName,
        voiceSlug: App.Voice.data.slug,
        posts: posts
      }, this._createPostResponse.bind(this));
    },

    _createPostResponse: function _createPostResponse(err, response) {
      var errorMessage = '';
      if (err) {
        errorMessage = 'Error - ' + response.status;
        return this._setErrorState({message: errorMessage}).enable();
      }

      this._setSuccessState().enable();
    },

    _setSuccessState: function _setSuccessState() {
      this.queuePanel.removePosts();
      this.queuePanel.loader.disable();
      this._addedPostsCounter = 0;
      this.postButton.updateCounter(this._addedPostsCounter);
      this._postsAdded = true;
      return this;
    },

    /* Handles the sources dropdown change event.
     * @private
     */
    _sourceChanged: function _sourceChanged(ev) {
      this._currentSource = ev.source;

      if (this._currentSource === 'twitter') {
        CV.PostCreatorFromSourcesSourceTwitter.isAuth(function (err, res) {
          if (err) return console.log('ERR', err);
          if (res) return this._autoSearchSourceUpdate();
          this._setTwitterAuthState();
        }.bind(this));
      } else {
        this._setNormalSearchState();
        this._autoSearchSourceUpdate();
      }
    },

    /* Checks if it should perform and new request based on the new state.
     * Useful for when changing the source and a previous query has been made.
     * @private
     */
    _autoSearchSourceUpdate: function _autoSearchSourceUpdate() {
      if (this._query) {
        this.input.setValue(this._query);
        this._setSearching()._request(this._query);
      }
    },

    _setTwitterAuthState: function _setTwitterAuthState() {
      this.input.el.classList.add('-hide');
      this.authTwitterButton.el.classList.remove('-hide');
    },

    _setNormalSearchState: function _setNormalSearchState() {
      this.input.el.classList.remove('-hide');
      this.authTwitterButton.el.classList.add('-hide');
    },

    /* Opens the twitter authorization popup and checks when it gets closed.
     * @private
     */
    _authTwitterHandler: function _authTwitterHandler() {
      var _this = this;
      window.authWindow = window.open('/twitter/oauth', 'twitterWindow', 'height=600,width=500');

      var interval = window.setInterval(function () {
        if (window.authWindow === null || window.authWindow.closed) {
          window.clearInterval(interval);
          if (window.authWindow.CV && window.authWindow.CV.oauthCallbackHasTwitterCredentials) {
            _this._setNormalSearchState();
          }
        }
      }, 1000);
    },

    /* Calls our search API endpoint to search for content on the current source.
     * @private
     */
    _request: function _request(query) {
      this._query = query;

      var args = {
        profileName: App.Voice.data.owner.profileName,
        voiceSlug: App.Voice.data.slug,
        source: this._currentSource,
        data: {
          query: this._query
        }
      };

      API.searchPostsInSource(args, this._requestResponseHandler.bind(this));
    },

    _requestResponseHandler: function _requestResponseHandler(err, response) {
      if (err) {
        return this._setErrorState({
          message: response.status + ' - ' + response.statusText
        });
      }

      var responseLength = 0;
      if (response instanceof Array) {
        responseLength = response.length;
      } else if (response.videos !== undefined) {
        responseLength = response.videos.length;
      }

      if (!responseLength) {
        this._setNoResultsState();
      } else {
        this.resultsPanel.renderResults(this._currentSource, response, this._query, responseLength);
        this._setResultsState();
      }
    },

    _showContent: function _showContent() {
      this.content.classList.add('active');
      return this;
    },

    _hideContent: function _hideContent() {
      this.content.classList.remove('active');
      return this;
    },

    _setSearching: function _setSearching() {
      this._showContent();
      this.resultsPanel.setSearchingState();
      this.queuePanel.setSearchingState();
      return this;
    },

    _setNoResultsState: function _setNoResultsState() {
      this._showContent();
      this.resultsPanel.setNoResultsState(this._query);
      return this;
    },

    _setResultsState: function _setResultsState() {
      this._showContent();
      this.resultsPanel.setResultsState();
      this.queuePanel.showOnboarding();
      return this;
    },

    /* Sets the error state.
     * @private
     * @return [PostCreatorFromUrl]
     */
    _setErrorState: function _setErrorState(config) {
      if (config && config.message) {
        this.dom.updateText(this.errorMessage, config.message);
      } else {
        this.dom.updateText(this.errorMessage, this.constructor.DEFAULT_ERROR_MESSAGE);
      }

      this.el.classList.add('has-error');

      return this;
    },

    /* Remove error messages.
     * @private
     * @return [CV.PostCreatorFromUrl]
     */
    _removeErrorState: function _removeErrorState() {
      this.el.classList.remove('has-error');
      return this;
    },

    /* Enables the Post Button.
     * @private
     * @return [PostCreatorFromUrl]
     */
    _enabledPostButton: function _enabledPostButton() {
      this.postButton.enable();
      return this;
    },

    /* Disables the Post Button.
     * @private
     * @return [PostCreatorFromUrl]
     */
    _disablePostButton: function _disablePostButton() {
      this.postButton.disable();
      return this;
    },

    /* @override
     */
    _activate: function _activate() {
      CV.PostCreator.prototype._activate.call(this);
      this.input.getElement().focus();
    },

    /* @override
     */
    _deactivate: function _deactivate() {
      CV.PostCreator.prototype._deactivate.call(this);

      if (this._postsAdded) {
        window.location.reload();
      }
    },

    /* @override
     */
    _enable: function _enable() {
      CV.PostCreator.prototype._enable.call(this);
      this.input.getElement().focus();
    },

    /* @override
     */
    _disable: function _disable() {
      CV.PostCreator.prototype._disable.call(this);
      this.input.getElement().blur();
    },

    /* @override
     */
    destroy: function destroy() {
      Events.off(this.input.getElement(), 'keyup', this._inputKeyUpHandlerRef);
      this._inputKeyUpHandlerRef = null;

      CV.PostCreator.prototype.destroy.call(this);
      return null;
    }
  }
});
