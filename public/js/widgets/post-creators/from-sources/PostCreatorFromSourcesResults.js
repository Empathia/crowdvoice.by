Class(CV, 'PostCreatorFromSourcesResults').inherits(Widget).includes(CV.WidgetUtils)({
  ELEMENT_CLASS: 'from-sources-content-left',

  HTML: '\
    <div class="-rel">\
      <section class="from-sources-results">\
        <header>\
          <span class="-font-bold">\
            <b data-total-number></b>\
            &nbsp;results for <i>‘<span data-term></span>’</i>.\
          </span>\
          &nbsp;Select the posts you would like to add to this Voice.\
        </header>\
        <div class="from-sources-result-list"></div>\
      </section>\
      <div class="from-sources-no-results -color-grey-light -text-center">\
        <p>We found no results for ‘<span data-query></span>’.<br/>Please refine your search and try again.</p>\
      </div>\
      <div class="cv-post-creator__disable"></div>\
    </div>',

  prototype: {
    init: function init(config)  {
      Widget.prototype.init.call(this, config);
      this.el = this.element[0];
      this.resultsWrapper = this.el.querySelector('.from-sources-results');
      this.resultList = this.resultsWrapper.querySelector('.from-sources-result-list');
      this.totalsElement = this.resultsWrapper.querySelector('[data-total-number]');
      this.queryElement = this.resultsWrapper.querySelector('[data-term]');

      this.noResults = this.el.querySelector('.from-sources-no-results');
      this.noResultsQuery = this.noResults.querySelector('[data-query]');
      this.processingLayer = this.el.querySelector('.cv-post-creator__disable');

      this.loader = new CV.Loading().render(this.processingLayer).center();

      this._bindEvents();
    },

    _bindEvents: function _bindEvents() {
      this._addPostRef = this._addPost.bind(this);
      CV.PostCreatorFromSourcesSourceYoutubeItem.bind('addPost', this._addPostRef);
      CV.PostCreatorFromSourcesSourceGoogleNewsItem.bind('addPost', this._addPostRef);
    },

    _addPost: function _addPost(ev) {
      this.dispatch('addPost', {data: ev.data});
    },

    renderResults: function renderResults(config) {
      var type = this.format.capitalizeFirstLetter(config.source)
        , factory = window.CV['PostCreatorFromSourcesSource' + type];

      if (typeof factory !== 'function') {
        console.warn('CV.PostCreatorFromSourcesSource' + type + ' is not a function');
        return this;
      }

      this.clearResults();
      this.updateHeaderText(config.data.length, config.query);

      this.appendChild(new factory({
        name: 'source',
        data: config.data,
        query: config.query
      })).render(this.resultList);

      return this;
    },

    updateHeaderText: function updateHeaderText(totals, query) {
      this.dom.updateText(this.totalsElement, totals);
      this.dom.updateText(this.queryElement, query);
      return this;
    },

    /* Destroy any children without destroying itself.
     * @method clearResults <public> [Function]
     */
    clearResults: function clearResults() {
      while(this.children.length > 0) {
        this.children[0].destroy();
      }
      return this;
    },

    setSearchingState: function setSearchingState() {
      // this.loader.enable();
      this.processingLayer.classList.add('active');
      this.resultsWrapper.classList.remove('active');
      this.noResults.classList.remove('active');
      return this;
    },

    setResultsState: function setResultsState() {
      this.resultsWrapper.classList.add('active');
      this.processingLayer.classList.remove('active');
      // this.loader.disable();
      this.noResults.classList.remove('active');
      return this;
    },

    setNoResultsState: function setNoResultsState(queryString) {
      this.dom.updateText(this.noResultsQuery, queryString);
      this.noResults.classList.add('active');
      this.resultsWrapper.classList.remove('active');
      // this.loader.disable();
      this.processingLayer.classList.remove('active');
      return this;
    },

    setAppendingResultsState: function setAppendingResultsState() {
      this.processingLayer.classList.add('active');
    },

    setResultsAppendedState: function setResultsAppendedState() {
      this.processingLayer.classList.remove('active');
    }
  }
});

