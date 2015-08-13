var moment = require('moment');

Class(CV, 'PostDetailLinkHeader').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-post-detail-link__header',
    HTML : '\
        <div>\
            <div class="cv-post-detail-link__header-actions -float-right">\
                <a class="header-actions-view-original-btn cv-button tiny -m0" target="_blank">View Original</a>\
            </div>\
            <div class="-overflow-hidden">\
                <p data-title class="cv-post-detail-link__header-title -font-bold -ellipsis"></p>\
                <div class="cv-post-detail-link__header-meta">\
                    <span>on <time data-date datetime></time></span>\
                    <div class="-inline-block -ml1">\
                        <svg class="-s14">\
                            <use xlink:href="#svg-save-outline"></use>\
                            <span data-saved></span>\
                        </svg>\
                    </div>\
                </div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.titleElement = this.el.querySelector('[data-title]');
            this.dateElement = this.el.querySelector('[data-date]');
            this.savedElement = this.el.querySelector('[data-saved]');
            this.viewOriginalBtn = this.el.querySelector('.header-actions-view-original-btn');
        },

        update : function update(data) {
            this.dom.updateText(this.titleElement, data.title);
            this.dom.updateText(this.dateElement, moment(data.publishedAt).format('MMM DD, YYYY'));
            this.dom.updateAttr('datetime', this.dateElement, data.publishedAt);
            this.dom.updateText(this.savedElement, data.totalSaves || 0);
            this.dom.updateAttr('href', this.viewOriginalBtn, data.sourceUrl);
        }
    }
});
