/**
 * VoiceCover Widget
 *
 * data =>
 * description  {String} voice description
 * createdAt    {String}
 * followers    {Array} voice entities followers
 * id           {String} the voice id
 * images       {Object} Available image sizes
 * latitude     {String}
 * locationName {String}
 * longitude    {String}
 * owner        {Object} owner Entity
 * slug         {String}
 * status       {String}
 * title        {String} voice title (65 chars max)
 * topics       {Array} list of topics tagged to the voice
 * type         {String}
 * updatedAt    {String} ISO date string
 */

var moment = require('moment');

Class(CV, 'VoiceCover').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
    <article class="cv-voice-cover" role="article">\
        <ul class="cv-tags -list-horizontal"></ul>\
        <div class="voice-cover">\
            <div class="voice-cover-main-image-wrapper">\
                <div class="voice-cover-main-image -img-cover"></div>\
            </div>\
            <a class="voice-cover-hover-overlay -tdn" data-voice-anchor href="">\
                <button class="voice-cover-hover-overlay-button cv-button tiny -font-semi-bold">View Voice</button>\
            </a>\
        </div>\
        <div class="voice-content">\
            <div class="author">\
                <a class="author-anchor" href="">\
                    <img class="author-avatar -rounded" src="" alt="">\
                </a>\
                by <a class="author-anchor" href="">\
                    <span class="author-username"></span>\
                </a>\
            </div>\
            <h2 class="voice-cover-title -font-bold">\
                <a class="voice-cover-title-anchor -tdn" data-voice-anchor href=""></a>\
            </h2>\
            <p class="voice-cover-description"></p>\
            <div class="meta">\
                <span class="voice-cover-followers"></span> followers &middot;&nbsp;\
                Updated <time class="voice-cover-datetime" datetime=""></time>\
            </div>\
        </div>\
    </article>',

    TAG_ITEM_HTML : '\
    <li class="cv-tags-list-item">\
        <a class="cv-tags-tag" href=""></a>\
    </li>',

    IS_NEW_BADGE_HTML : '\
    <svg class="voice-cover-badge-new">\
        <use xlink:href="#svg-badge"></use>\
        <text x="50%" y="50%" dy=".3em" class="-font-bold">NEW</text>\
    </svg>',

    MAX_DESCRIPTION_LENGTH : 180,

    prototype : {
        data : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.tagListElement = this.el.querySelector('.cv-tags');
            this.voiceCoverElement = this.el.querySelector('.voice-cover');
            this.dateTimeElement = this.el.querySelector('.voice-cover-datetime');
            this.voiceAnchors = [].slice.call(this.el.querySelectorAll('[data-voice-anchor]'), 0);
            this.authorAnchors = [].slice.call(this.el.querySelectorAll('.author-anchor'), 0);

            this._updateValues();

            // is new? no older than 21 days == 3 weeks
            if (moment().diff(moment(this.data.updatedAt), 'days') <= 21) {
                this.addNewBadge();
            }
        },

        /* Update the widget's elements values with the received config
         * @method _updateValues <private> [Function]
         */
        _updateValues : function _updateValues() {
            this.voiceAnchors.forEach(function(anchor) {
                this.dom.updateAttr('href', anchor, '/' + this.data.owner.profileName + '/' + this.data.slug + '/');
                this.dom.updateAttr('title', anchor, this.data.title + ' voice');
            }, this);

            if (this.data.images.card) {
                this.dom.updateBgImage(this.el.querySelector('.voice-cover-main-image'), this.data.images.card.url);
            } else {
                this.el.querySelector('.voice-cover-main-image').classList.add('-colored-background');
            }

            if (this.data.topics.length) {
                this.createTopics(this.data.topics);
            }

            var authorFullname = this.data.owner.name + (this.data.owner.lastname ? (' ' + this.data.owner.lastname) : '');
            this.authorAnchors.forEach(function(anchor) {
                this.dom.updateAttr('title', anchor, authorFullname + '’s profile');
                this.dom.updateAttr('href', anchor, '/' + this.data.owner.profileName);
            }, this);
            this.dom.updateAttr('src', this.el.querySelector('.author-avatar'), this.data.owner.images.icon.url);
            this.dom.updateText(this.el.querySelector('.author-username'), authorFullname);

            this.dom.updateText(this.el.querySelector('.voice-cover-title-anchor'), this.data.title);

            var description = this.format.truncate(this.data.description, this.constructor.MAX_DESCRIPTION_LENGTH, true);
            this.dom.updateText(this.el.querySelector('.voice-cover-description'), description);

            this.dom.updateText(this.el.querySelector('.voice-cover-followers'), this.format.numberUS(this.data.followers.length));
            this.dom.updateText(this.dateTimeElement, moment(this.data.updatedAt).fromNow());
            this.dom.updateAttr('datetime', this.dateTimeElement, this.data.updatedAt);
        },

        /**
         * Creates a tag per topic that is tagged to the topic and appends them.
         * @method createTopics <private> [Function]
         * @params tags <required> [Array] list of topics tagged to the voice
         * @return CV.VoiceCover
         */
        createTopics : function createTopics(topics) {
            topics.forEach(function(topic) {
                this.tagListElement.insertAdjacentHTML('beforeend', this.constructor.TAG_ITEM_HTML);
                var anchors = this.tagListElement.getElementsByClassName('cv-tags-tag');
                var anchor = anchors[anchors.length-1];

                this.dom.updateText(anchor, topic.name);
                this.dom.updateAttr('href', anchor, '/topic/' + topic.slug);
            }, this);

            return this;
        },

        /**
         * Appends the new badge to the voiceCoverElement.
         * @method addNewBadge <private> [Function]
         * @return CV.VoiceCover
         */
        addNewBadge : function addNewBadge() {
            this.voiceCoverElement.insertAdjacentHTML('beforeend', this.constructor.IS_NEW_BADGE_HTML);
            var badge = this.voiceCoverElement.querySelector('.voice-cover-badge-new');

            requestAnimationFrame(function() {
                badge.classList.add('active');
            });

            return this;
        }
    }
});
