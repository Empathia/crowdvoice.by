/* jshint multistr: true */
Class(CV, 'SearchResultsManager').inherits(Widget)({
    ELEMENT_CLASS : 'search-results-table',
    HTML : '<table></table>',
    MAX_TOTAL_RESULTS: 9,

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
        },

        renderResults : function renderResults(results) {
            var preview = results.preview;

            Object.keys(preview).forEach(function(propertyName) {
                if (preview[propertyName].length) {
                    this.appendChild(
                        new CV.SearchResultsGroup({
                            name : propertyName,
                            data : preview[propertyName]
                        })
                    ).print().render(this.el);
                }
            }, this);

            if (results.totals > this.constructor.MAX_TOTAL_RESULTS) {
                this.appendChild(new CV.SearchResultsViewAllButton({
                    name : 'viewAllButton',
                    totals : results.totals
                }));

                this.el.parentNode.insertBefore(this.viewAllButton.el, this.el.nextSibling);
            }
        },

        clearResults : function clearResults() {
            while(this.children.length > 0) {
                this.children[0].destroy();
            }
            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el = null;

            return null;
        }
    }
});
