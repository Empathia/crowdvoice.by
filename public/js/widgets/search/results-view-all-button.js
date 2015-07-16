Class(CV, 'SearchResultsViewAllButton').inherits(Widget).includes(CV.WidgetUtils)({
    prototype : {
        totals : 0,

        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.appendChild(new CV.Button({
                name : 'button',
                className : '-full-width',
                label : 'View all ' + this.totals + ' results »'
            })).render(this.el);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});
