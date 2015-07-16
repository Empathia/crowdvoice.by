Class(CV, 'SearchResultsGroup').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <tr>\
            <td class="search-results-title -upper -font-semi-bold"></td>\
            <td class="search-results-items"></td>\
        </tr>\
    ',

    prototype : {
        el : null,
        data : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.titleElement = this.el.querySelector('.search-results-title');
            this.itemsWrapper = this.el.querySelector('.search-results-items');
        },

        print : function print() {
            this.dom.updateText(this.titleElement, this.name);

            this.data.forEach(function(propertyName) {
                if (this.name === 'voices') {
                    this.appendChild(
                        new CV.VoiceCoverMini(propertyName)
                    ).render(this.itemsWrapper);
                }

                if (this.name === 'organizations' || this.name === 'people') {
                    this.appendChild(
                        new CV.CardMini(propertyName)
                    ).render(this.itemsWrapper);
                }
            }, this);

            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.data = null;

            this.el = null;
            this.titleElement = null;
            this.itemsWrapper = null;

            return null;
        }
    }
});
