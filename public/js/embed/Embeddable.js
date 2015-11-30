/* globals io */
Class(CV, 'Embeddable').includes(NodeSupport, CustomEventSupport, CV.HelperVoice)({
  prototype : {
    /**
     * @param {Object} config - the configuration object
     * @property {Object} config.voiceData - the active voice data passed through the VoicesPresenter.
     * @property {Object} config.reqQuery - the widget configurations initially passed as url params but cleaned by the server.
     */
    init : function init (config) {
      Object.keys(config).forEach(function (propertyName) {
        this[propertyName] =  config[propertyName];
      }, this);

      this.postsContainerElement = document.querySelector('.posts-container');
      this.postsCount = this._formatPostsCountObject(this.postsCount);
      this.totalPosts = this._getTotalPostCount(this.postsCount);

      console.log(config);
    },

    /* Start socketio connection
     * @public
     * @return {Object} this
     */
    socketStart : function socketStart() {
      if (!this._socket) {
        this._socket = io(window.location.origin, {
          'reconnection': true,
          'reconnectionDelay': 1000,
          'reconnectionDelayMax' : 5000,
          'reconnectionAttempts': 5
        });
      }
      return this;
    },

    /* Return the socketio instance
     * @public
     * @return {Object} socketio instance
     */
    getSocket : function getSocket() {
      if (this._socket) {
        return this._socket;
      }

      return this.socketStart().getSocket();
    },

    /* Initialize its children widgets.
     * @public
     */
    run : function run() {
      this.appendChild(new CV.EmbedHeader({
        name : 'header',
        el : document.querySelector('header'),
        voiceData : this.voiceData,
        reqQuery : this.reqQuery,
        totalPosts : this.totalPosts
      }));

      if (this.totalPosts) {
        this.appendChild(new CV.EmbedLayersController({
          name : 'layersController',
          el : this.postsContainerElement,
          voiceData : this.voiceData,
          viewType : this.reqQuery.default_view,
          registry : CV.PostsRegistry,
          firstPostDate : this.firstPostDate,
          lastPostDate : this.lastPostDate,
          postsCount : this.postsCount,
          socket : this.getSocket()
        }));
      } else {
        this.postsContainerElement.className += ' -no-posts';
        this.postsContainerElement.textContent = 'No posts to show';
      }

      if (this.reqQuery.background) {
        this._updateVoiceBackground();
      }

      document.querySelector('.Loading').className = 'Loading hide';

      this._bindEvents();
    },

    /* Subscribe widgets events and initialized widget’s children events if needed.
     * @private
     */
    _bindEvents : function _bindEvents() {
      this._changePostsViewHandlerRef = this._changePostsViewHandler.bind(this);
      this.bind('changedView', this._changePostsViewHandlerRef);

      this._filterSelectionUpdatedRef = this._filterSelectionUpdated.bind(this);
      this.bind('selectionUpdated', this._filterSelectionUpdatedRef);

      return this;
    },

    /* Sets the Voice background image
     * @private
     */
    _updateVoiceBackground : function _updateVoiceBackground() {
      var backgroundElement = document.querySelector('.voice-background-cover');

      if (this.voiceData.images.big && this.voiceData.images.big.url) {
        var image = document.createElement('img');
        image.className = "voice-background-cover-image";
        image.src = this.voiceData.images.big.url;
        backgroundElement.appendChild(image);
      }

      return this;
    },

    _changePostsViewHandler : function _changePostsViewHandler (ev) {
      ev.stopPropagation();
      this.layersController.updateView(ev.data);
    },

    _filterSelectionUpdated : function _filterSelectionUpdated (ev) {
      ev.stopPropagation();
      this.layersController.filterItems(ev.sourceTypes);
    }
  }
});
