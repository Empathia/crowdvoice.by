Class(CV, 'PostDetailLinkIframe').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-post-detail-link__iframe -rel',
    HTML : '\
        <div>\
            <iframe class="-full-width -full-height"></iframe>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.iframe = this.el.querySelector('iframe');
        },

        update : function update(url) {
            this.dom.updateAttr('src', this.iframe, url);
            return this;
        }
    }
});
