Class(CV, 'PostCreatorFromSourcesResults').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'from-sources-content-left',

    HTML : '\
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
        </div>\
    ',

    prototype : {
        init : function init(config)  {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.resultsWrapper = this.el.querySelector('.from-sources-results');
            this.resultList = this.resultsWrapper.querySelector('.from-sources-result-list');
            this.totalsElement = this.resultsWrapper.querySelector('[data-total-number]');
            this.queryElement = this.resultsWrapper.querySelector('[data-term]');

            this.noResults = this.el.querySelector('.from-sources-no-results');
            this.noResultsQuery = this.noResults.querySelector('[data-query]');

            this.loader = new CV.Loading().render(this.el).center();

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._addPostRef = this._addPost.bind(this);
            CV.PostCreatorFromSourcesYoutube.bind('addPost', this._addPostRef);
            CV.PostCreatorFromSourcesGoogleNews.bind('addPost', this._addPostRef);
        },

        _addPost : function _addPost(ev) {
            this.dispatch('addPost', {data: ev.data});
        },

        renderResults : function renderResults(config) {
            this.dom.updateText(this.totalsElement, config.data.length);
            this.dom.updateText(this.queryElement, config.query);

            this.clearResults();

            if (config.source === 'youtube') {
                config.data.forEach(function(data) {
                    this.appendChild(new CV.PostCreatorFromSourcesYoutube(data)).render(this.resultList);
                }, this);
            } else if (config.source === 'googleNews') {
                config.data.forEach(function(data) {
                    this.appendChild(new CV.PostCreatorFromSourcesGoogleNews(data)).render(this.resultList);
                }, this);
            }

            return this;
        },

        /* Destroy any children without destroying itself.
         * @method clearResults <public> [Function]
         */
        clearResults : function clearResults() {
            while(this.children.length > 0) {
                this.children[0].destroy();
            }
            return this;
        },

        setSearchingState : function setSearchingState() {
            this.loader.enable();
            this.resultsWrapper.classList.remove('active');
            this.noResults.classList.remove('active');
            return this;
        },

        setResultsState : function setResultsState() {
            this.resultsWrapper.classList.add('active');
            this.loader.disable();
            this.noResults.classList.remove('active');
            return this;
        },

        setNoResultsState : function setNoResultsState(queryString) {
            this.dom.updateText(
                this.noResultsQuery,
                queryString
            );
            this.noResults.classList.add('active');
            this.resultsWrapper.classList.remove('active');
            this.loader.disable();
            return this;
        }
    }
});

