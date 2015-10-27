Class(CV, 'VoiceCoverTitle').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <article class="cv-voice-cover card mini -clearfix" role="article">\
            <img class="voice-cover -float-left" width="32" height="32"/>\
            <div class="voice-content -table">\
                <div class="-table-cell -vam">\
                    <p class="voice-title-link"><a href="{{voice-url}}" class="voice-link">\
                        {{voice-title}}\
                    </a></p>\
                </div>\
            </div>\
            <div class="action"></div>\
        </article>',

    prototype : {
        /* VoiceEntity
         * @property data <required> [Object]
         */
        data : {},

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._setup();
        },

        _setup : function _setup() {             
            this.dom.updateAttr('src', this.el.querySelector('.voice-cover'), this.data.images.small.url); 
            this.dom.updateAttr('href', this.el.querySelector('.voice-link'), this.data.slug);
            this.dom.updateText(this.el.querySelector('.voice-link'), this.data.title);              
        }
    }
});
