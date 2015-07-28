var moment = require('moment');

Class(CV, 'PostDetailLinkHeader').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-post-detail-link__header',
    HTML : '\
        <div>\
            <div class="-float-left">\
                <p data-title>Suspend Dictum Feugiat Nisl Ut</p>\
                <div>\
                    <span>on <time data-date datetime></time></span>\
                    <div class="-inline-block">\
                        <svg class="-s16">\
                            <use xlink:href="#svg-save-outline"></use>\
                            <span data-saved></span>\
                        </svg>\
                    </div>\
                </div>\
            </div>\
            <div class="-float-right">\
                <button class="cv-button tiny">View Original</button>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.titleElement = this.el.querySelector('[data-title]');
            this.dateElement = this.el.querySelector('[data-date]');
            this.savedElement = this.el.querySelector('[data-saved]');
        },

        update : function update(data) {
            this.dom.updateText(this.titleElement, data.title);
            this.dom.updateText(this.dateElement, moment(data.publishedAt).format('MMM DD, YYYY'));
            this.dom.updateAttr('datetime', this.dateElement, data.publishedAt);
            this.dom.updateText(this.savedElement, data.totalSaves || 0);
        }
    }
});
