var moment = require('moment');

Class(CV, 'PostCreatorFromSourcesYoutube').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'post-creator-from-sources__youtube -rel',
    HTML : '\
        <article>\
            <div class="source-preview-wrapper">\
                <p class="source-title -font-bold -inline"></p>\
                <p class="source-date -inline"></p>\
                <p class="source-description"></p>\
            </div>\
            <div class="source-add-button -abs">\
                <button class="cv-button tiny">+ Add This</button>\
            </div>\
        </article>\
    ',

    prototype : {
        title : '',
        description : '',
        date : '',
        sourceUrl : '',

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.titleElement = this.el.querySelector('.source-title');
            this.dateElement = this.el.querySelector('.source-date');
            this.descriptionElement = this.el.querySelector('.source-description');

            this._setup();
        },

        _setup : function _setup() {
            this.dom.updateText(
                this.titleElement,
                this.title
            );

            this.dom.updateText(
                this.dateElement,
                moment(this.date).format('MMM, YYYY')
            );

            this.dom.updateText(
                this.descriptionElement,
                this.description
            );
        }
    }
});
