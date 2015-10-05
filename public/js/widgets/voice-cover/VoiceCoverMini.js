var Person = require('./../../lib/currentPerson');

Class(CV, 'VoiceCoverMini').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <article class="cv-voice-cover mini -clearfix" role="article">\
            <a href="#" class="-float-left" data-voice-anchor>\
                <img class="voice-cover" width="36" height="36"/>\
            </a>\
            <div class="voice-content">\
                <a href="#" class="voice-cover-title voice-cover-title-anchor -font-semi-bold -tdn" data-voice-anchor>\
                    {{voice-title}}\
                </a>\
                <div class="meta">\
                    <div class="author -inline-block">\
                        By <a class="author-anchor" href="{{voice-owner-url}}">\
                        <span class="author-username">{{voice-owner-name}}</span>\
                        </a>\
                    </div>\
                </div>\
            </div>\
            <div class="action"></div>\
        </article>',

    TOPICS_HTML : ' · <ul class="cv-tags -inline-block -list-horizontal"></ul>',

    TOPIC_ITEM_HTML : '\
        <li class="cv-tags-list-item">\
            <a class="cv-tags-tag" href="{{tag-url}}">{{tag-name}}</a>\
        </li>',

    prototype : {
        /* VoiceEntity
         * @property data <required> [Object]
         */
        data : {},

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.authorAnchor = this.el.querySelector('.author-anchor');
            this.voiceAnchors = [].slice.call(this.el.querySelectorAll('[data-voice-anchor]'), 0);

            this._setup();
        },

        addActions : function addActions() {
            if (!Person.get()) {
                return;
            }

            if (Person.memberOf('voice', this.data.id)) {
                this.appendChild(new CV.VoiceCoverActions({
                    name : 'actions',
                    voiceEntity : this.data
                })).render(this.el.querySelector('.action'));
            }
        },

        _setup : function _setup() {
            this.voiceAnchors.forEach(function(anchor) {
                this.dom.updateAttr('href', anchor, '/' + this.data.owner.profileName + '/' + this.data.slug + '/');
                this.dom.updateAttr('title', anchor, this.data.title + ' voice');
            }, this);

            if (this.data.images.small) {
                this.dom.updateAttr('src', this.el.querySelector('.voice-cover'), this.data.images.small.url);
            } else {
                this.el.querySelector('.voice-cover').classList.add('-colored-background');
            }
            this.dom.updateText(this.el.querySelector('.voice-cover-title'), this.data.title);

            this.dom.updateAttr('href', this.authorAnchor, '/' + this.data.owner.profileName);
            this.dom.updateAttr('title', this.authorAnchor, this.data.owner.profileName + ' profile');

            var fullname = this.data.owner.name + (this.data.owner.lastname ? (' ' + this.data.owner.lastname) : '');
            this.dom.updateText(this.el.querySelector('.author-username'), fullname);
        },

        /* Show the location, joined at and inline name, username
         * @method showMeta <public> [Function]
         */
        showMeta : function showMeta() {
            this.el.querySelector('.meta').insertAdjacentHTML('beforeend', this.constructor.TOPICS_HTML);

            this._createTags(this.data.topics);
        },

        /**
         * Creates a tag per topic that is tagged to the topic and appends them.
         * @method _createTags <private> [Function]
         * @params topics <required> [Array] list of topics tagged to the voice
         * @return CV.VoiceCoverMini
         */
        _createTags : function _createTags(topics) {
            this.tagListElement = this.el.querySelector('.cv-tags');

            topics.forEach(function(topic) {
                this.tagListElement.insertAdjacentHTML('beforeend', this.constructor.TOPIC_ITEM_HTML);
                var anchors = this.tagListElement.getElementsByClassName('cv-tags-tag');
                var anchor = anchors[anchors.length-1];

                this.dom.updateText(anchor, topic.name);
                this.dom.updateAttr('href', anchor, '/topic/' + topic.slug);
            }, this);

           return this;
        }
    }
});
