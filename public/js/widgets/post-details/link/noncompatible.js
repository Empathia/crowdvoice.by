Class(CV, 'PostDetailLinkNonCompatible').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-post-detail-link__non-compatible',
    HTML : '\
        <div>\
            <div class="-table -full-width -full-height -text-center">\
                <div class="-table-cell -vam">\
                    <svg class="non-compatible__iconon-compatible__icon -s80 -mb2">\
                        <use xlink:href="#svg-sad-face"></use>\
                    </svg>\
                    <p class="-font-bold">\
                        <i>It seems that you cannot display the page in here due to a security issue.</i>\
                    </p>\
                    <p>\
                        <i>Click the button below to open the link in a new tab.</i>\
                    </p>\
                    <a data-btn href="" class="ui-btn -md -mt3 -primary" target="_blank">Open Link</button></a>\
                </div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.buttonElement = this.el.querySelector('[data-btn]');
        },

        update : function update(url) {
            this.dom.updateAttr('href', this.buttonElement, url);
            return this;
        }
    }
});
