/* jshint multistr: true */
Class(CV, 'SearchResultsManager').inherits(Widget)({
    ELEMENT_CLASS : 'search-results',
    HTML : '\
        <div>\
            <table class="search-results-table -full-width"></table>\
        </div>',
    MAX_TOTAL_RESULTS: 9,

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.tableElement = this.el.getElementsByTagName('table')[0];
        },

        /* Render new results by category (users, organizations, voices)
         * @method renderResults <public> [Function]
         * @argument results <required> [Object] {preview: [Object], totals: [Number]}
         * @argument queryString <required> [String] the query string
         */
        renderResults : function renderResults(results, queryString) {
            var preview = results.preview;

            Object.keys(preview).forEach(function(propertyName) {
                if (preview[propertyName].length) {
                    this.appendChild(
                        new CV.SearchResultsGroup({
                            name : propertyName,
                            data : preview[propertyName]
                        })
                    ).print().render(this.tableElement);
                }
            }, this);

            if (results.totals > this.constructor.MAX_TOTAL_RESULTS) {
                this.appendChild(new CV.SearchResultsViewAllButton({
                    name : 'viewAllButton',
                    totals : results.totals,
                    queryString : queryString
                })).render(this.el);
            }
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

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el = this.tableElement = null;

            return null;
        }
    }
});
