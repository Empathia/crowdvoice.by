/* jshint multistr: true */
Class(CV, 'SearchResultsManager').inherits(Widget)({
    ELEMENT_CLASS : 'search-results-table',
    HTML : '<table></table>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
        },

        renderResults : function renderResults(results) {
            Object.keys(results).forEach(function(propertyName) {
                this.appendChild(
                    new CV.SearchResultsGroup({
                        name : propertyName,
                        data : results[propertyName]
                    })
                ).print().render(this.el);
            }, this);

            // @TODO : if greater than max results to display show button
            this.appendChild(
                new CV.Button({
                    name : 'viewAllButton',
                    className : '-full-width',
                    label : 'View all 76 results »'
                })
            );

            this.el.parentNode.insertBefore(this.viewAllButton.element[0], this.el.nextSibling);
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
