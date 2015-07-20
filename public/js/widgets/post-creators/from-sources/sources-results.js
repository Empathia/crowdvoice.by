/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesResults').inherits(Widget).includes(CV.WidgetUtils)({

    ELEMENT_CLASS : 'from-sources-content-left',

    HTML : '\
       <div class="-rel">\
            <section class="from-sources-results">\
                <header>\
                    <span class="-font-bold">\
                        <b data-total-number></b> results for <span data-term></span>.\
                    </span>\
                    Select the posts you would like to add to this Voice.\
                </header>\
                <div class="from-sources-result-list"></div>\
            </section>\
            <div class="from-sources-no-results -color-grey-light -text-center">\
                <p>We found no results for ‘{{TERM}}’.<br/>Please refine your search and try again.</p>\
            </div>\
            <div class="cv-loader -abs">\
                <div class="ball-spin-fade-loader">\
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>\
                </div>\
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

            this.noResults  = this.el.querySelector('.from-sources-no-results');
            this.loader = this.el.querySelector('.cv-loader');
        },

        renderResults : function renderResults(config) {
            this.dom.updateText(
                this.totalsElement,
                config.data.length
            );

            this.dom.updateText(
                this.queryElement,
                config.query
            );

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
            this.loader.classList.add('active');
            this.resultsWrapper.classList.remove('active');
            this.noResults.classList.remove('active');
            return this;
        },

        setResultsState : function setResultsState() {
            this.resultsWrapper.classList.add('active');
            this.loader.classList.remove('active');
            this.noResults.classList.remove('active');
            return this;
        },

        setNoResultsState : function setNoResultsState() {
            this.noResults.classList.add('active');
            this.resultsWrapper.classList.remove('active');
            this.loader.classList.remove('active');
            return this;
        }
    }
});

