/* jshint multistr: true */
/**
 * Card Widget (Display Entity Cards)
 *
 * backgrounds  {Object} {big, bluredCard, card, original: {url}}
 * createdAt    {String} timestamp
 * description  {String} entity description
 * id           {String} entity unique id
 * imageMeta    {Object} information about the avatar images
 *      {card, icon, medium, notification, original, small: {channels, format, hasAlpha, hasProfile, height, space, width}}
 * images       {Object} entity's avatar images formats available
 *      {card, icon, medium, notification, original, small: {url}}
 * isAnonymous  {Boolean} indicates if the entity's session has been started anonymously
 * lastname     {String} entity's lastname (only present for "users" not "organizations")
 * location     {String} entity's location name string
 * name         {String} entity's name
 * profileName  {String} entity's profile name
 * type         {String} ("organization", "user") indicates if the data belongs to an organization or user
 * updatedAt    {String} timestamp
 *
 * @TODO: missing data
 * voices_total     {Number} total count of published voices
 * followers        {Number} number of followers
 * collaborators    <optional> {Number} users participating in org's voices
 * collaborations   <optional> {Number} no. or voices in which is collaborating
 */

var moment = require('moment');

Class(CV, 'Card').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'widget-card',
    HTML : '\
    <article role="article">\
        <div class="card-inner">\
            <div class="card_background-image-wrapper -img-cover -text-center">\
                <img class="card_avatar -rounded" alt="{{author.full_name}}’s avatar image"/>\
                <p class="card_username -rel">\
                    <a class="card_username-link"></a>\
                </p>\
                <h3 class="card_fullname -rel -font-bold">OpenGovFoundation</h3>\
                <div class="card_stats -rel">\
                    <div class="-row">\
                        <div class="-col-3">\
                            <p class="stats-number card_total-voices-text -font-bold"></p>\
                            <p class="stats-label card_total-voices-label-text"></p>\
                        </div>\
                        <div class="-col-3">\
                            <p class="stats-number card_total-followers-text -font-bold"></p>\
                            <p class="stats-label card_total-followers-label-text"></p>\
                        </div>\
                        <div class="-col-3">\
                            <p class="stats-number card_total-following-text -font-bold"></p>\
                            <p class="stats-label card_total-following-label-text"></p>\
                        </div>\
                        <div class="-col-3 card_collaborations-wrapper">\
                            <p class="stats-number card_collaborations-text -font-bold"></p>\
                            <p class="stats-label card_collaborations-label-text"></p>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <div class="card_info-wrapper">\
                <p class="card_description"></p>\
                <div class="card_meta">\
                    <div class="card_meta-location -inline">\
                        <svg class="card_meta-svg">\
                            <use xlink:href="#svg-location"></use>\
                        </svg>\
                        <span class="card_meta-location-text"></span>\
                    </div>\
                    <div class="card_meta-joined-at -inline">\
                        <svg class="card_meta-svg">\
                            <use xlink:href="#svg-clock"></use>\
                        </svg>\
                        <time class="card_meta-joined-at-text" datetime=""></time>\
                    </div>\
                </div>\
            </div>\
            <div class="card_actions">\
                <div class="-row -full-height"></div>\
            </div>\
        </div>\
    </article>\
    ',

    prototype : {
        _totalCountActions : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.profileCoverEl = this.el.querySelector('.card_background-image-wrapper');
            this.avatarEl = this.el.querySelector('.card_avatar');
            this.usernameEl = this.el.querySelector('.card_username-link');
            this.fullNameEl = this.el.querySelector('.card_fullname');
            this.descriptionEl = this.el.querySelector('.card_description');
            this.locationEl = this.el.querySelector('.card_meta-location-text');
            this.joinedAtEl = this.el.querySelector('.card_meta-joined-at-text');
            this.actionsEl = this.el.querySelector('.card_actions .-row');

            this.totalVoicesEl = this.el.querySelector('.card_total-voices-text');
            this.totalVoicesLabelEl = this.el.querySelector('.card_total-voices-label-text');
            this.totalFollowersEl = this.el.querySelector('.card_total-followers-text');
            this.totalFollowersLabelEl = this.el.querySelector('.card_total-followers-label-text');
            this.totalFollowingEl = this.el.querySelector('.card_total-following-text');
            this.totalFollowingLabelEl = this.el.querySelector('.card_total-following-label-text');
            this.collaborationsEl = this.el.querySelector('.card_collaborations-text');
            this.collaborationsLabelEl = this.el.querySelector('.card_collaborations-label-text');

            this._setupDefaultElements();

            if (this.type === "organization") {
                this._setupOrganizationElements();
            } else {
                this._setupUserElements();
            }
        },

        /* Adds the necessary action buttons automatically - per user's role-based (follow, message, invite to, join, etc).
         * @method addActionButtons <public> [Function]
         * @return CV.Card [Object]
         */
        addActionButtons : function addActionButtons() {
            this.appendChild( new CV.CardActionFollow({name : 'followButton'})).render(this.actionsEl);
            this._totalCountActions++;

            this.appendChild( new CV.CardActionMessage({name : 'messageButton'})).render(this.actionsEl);
            this._totalCountActions++;

            if (this.type === "organization") {
                this.appendChild( new CV.CardActionInvite({name : 'inviteButton'})).render(this.actionsEl);
                this._totalCountActions++;
            } else {
                this.appendChild( new CV.CardActionJoin({name : 'joinButton'})).render(this.actionsEl);
                this._totalCountActions++;
            }

            var n = 12 / this._totalCountActions;
            [].slice.call(this.el.querySelectorAll('.post-card-actions-item'), 0).forEach(function(item) {
                item.classList.add('-col-' + n);
            });

            this.el.classList.add('has-actions');

            return this;
        },

        /**
         * Update its content with the received data.
         * @method _setupDefaultElements <private> [Function]
         * @return Card [Object]
         */
        _setupDefaultElements : function _setupDefaultElements() {
            this.dom.updateBgImage(this.profileCoverEl, this.backgrounds.card.url);

            this.dom.updateAttr('src', this.avatarEl, this.images.card.url);
            this.dom.updateAttr('alt', this.avatarEl, this.profileName + "’s avatar image");

            this.dom.updateText(this.usernameEl, "@" + this.profileName);
            this.dom.updateAttr('href', this.usernameEl, this.profileName);

            var fullname = this.name + (this.lastname ? this.lastname : '');
            this.dom.updateText(this.fullNameEl, fullname);
            this.dom.updateText(this.descriptionEl, this.description);
            this.dom.updateText(this.locationEl, this.location);
            this.dom.updateText(this.joinedAtEl, moment(this.createdAt).format('MMM YYYY'));
            // this.dom.updateText(this.totalVoicesEl, this.format.numberUS(this.author.total_voices));
            this.dom.updateText(this.totalVoicesLabelEl, 'Voices');
            // this.dom.updateText(this.totalFollowersEl, this.format.numberUS(this.author.followers));
            this.dom.updateText(this.totalFollowersLabelEl, 'Followers');
            // this.dom.updateText(this.totalFollowingEl, this.format.numberUS(this.author.following));
            this.dom.updateText(this.totalFollowingLabelEl, 'Following');

            return this;
        },

        _setupOrganizationElements : function _setupOrganizationElements() {
            this.dom.updateText(this.collaborationsLabelEl, 'Members');
            // this.dom.updateText(this.collaborationsEl, this.format.numberUS(this.author.collaborators));

            return this;
        },

        _setupUserElements : function _setupUserElements() {
            this.dom.updateText(this.collaborationsLabelEl, 'Members');
            // this.dom.updateText(this.collaborationsEl, this.format.numberUS(this.author.collaborations));

            return this;
        }
    }
});
