var Person = require('../lib/currentPerson');

module.exports = Class(CV.Store, 'SavedPosts').includes(CustomEventSupport)({
  _socket: null,
  _data: {},

  run: function run() {
    this._socket = CV.App.getSocket();
    this._socket.on('savedPostsPage', this._savedPostsHandler.bind(this));
  },

  getSavedPostsPage: function getSavedPostsPage(pageNumber, scrollDirection) {
    var cached = this._data[pageNumber];
    if (cached) return this._emitSavedPosts(pageNumber, scrollDirection);
    this._socket.emit('getSavedPostsPage', Person.get('id'), pageNumber, scrollDirection);
  },

  _savedPostsHandler: function _savedPostsHandler(posts, pageNumber, scrollDirection) {
    this._data[pageNumber] = posts;
    this._emitSavedPosts(pageNumber, scrollDirection);
  },

  _emitSavedPosts: function _emitSavedPosts(pageNumber, scrollDirection) {
    this.dispatch('gotSavedPosts', {
      posts: this._data[pageNumber],
      pageNumber: pageNumber,
      scrollDirection: scrollDirection
    });
  }
});
