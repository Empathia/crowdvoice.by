var moment = require('moment');

Class(CV, 'FeedItem').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-feed-item',
    HTML : '\
        <div>\
            <div class="cv-feed-item__info">\
                <div class="cv-feed-item__info-main">\
                    <img class="main-avatar -rounded">\
                    <p class="main-text"></p>\
                </div>\
                <div class="cv-feed-item__info-extra"></div>\
            </div>\
        </div>',

    DATE_TEMPLATE : '<div class="cv-feed-item__time">{date}</div>',

    /* FeedItem factory.
     * @method create <static> [Function]
     * @return new FeedItem[type] instance.
     */
    create : function create(config) {
        var type = '';

        config.data.action.split(' ').forEach(function(term) {
            type += this.prototype.format.capitalizeFirstLetter(term);
        }, this);

        console.log(type);

        return new window.CV['Feed' + type](config);
    },

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.extraInfoElement = this.el.querySelector('.cv-feed-item__info-extra');
        },

        /* Returns the actionDoer name.
         * @method getName <protected> [Function]
         * @return name + lastname || name
         */
        getName : function getName() {
            return this.data.actionDoer.name;
        },

        /* Returns the actionDoer small avatar url.
         * @method getAvatar <protected> [Function]
         * @return actionDoer small avatar url.
         */
        getAvatar : function getAvatar() {
            return this.data.actionDoer.images.small.url;
        },

        /* Sets the actionDoer avatar.
         * @method updateAvatar <protected> [Function]
         * @return undefined
         */
        updateAvatar : function updateAvatar() {
            this.dom.updateAttr('src', this.el.querySelector('.main-avatar'), this.getAvatar());
        },

        /* Sets the description text.
         * @method setText <protected> [Function]
         * @argument text <optional> [String]
         * @return undefined
         */
        setText : function setText(text) {
            this.dom.updateText(this.el.querySelector('.main-text'), text);
        },

        /* Displays the createdAt date at the top-right using moment's
         * fromNow method to format it.
         * @method showDate <public> [Function]
         * @return FeedItem
         */
        showDate : function showDate() {
            var timeFromNow = moment(this.data.createdAt).fromNow();
            var templateString = this.constructor.DATE_TEMPLATE.replace(/{date}/, timeFromNow);
            this.el.insertAdjacentHTML('afterbegin', templateString);
            return this;
        }
    }
});
