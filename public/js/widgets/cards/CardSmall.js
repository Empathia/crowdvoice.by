var Person = require('./../../lib/currentPerson');
var PLACEHOLDERS = require('./../../lib/placeholders');
var Autolinker = require( 'autolinker' );

Class(CV, 'CardSmall').inherits(Widget).includes(CV.WidgetUtils, BubblingSupport)({
    ELEMENT_CLASS : 'widget-card card-small',
    HTML : '\
        <article role="article">\
            <div class="card-inner">\
                <div class="card_background-image-wrapper -img-cover -text-center">\
                    <img class="card_avatar -rounded" alt="{{author.full_name}}’s avatar image"/>\
                </div>\
                <div class="card_info-wrapper">\
                    <p class="card_username -rel">\
                        <a class="card_username-link"></a>\
                    </p>\
                    <h3 class="card_fullname -rel -font-bold">\
                        <a class="card_fullname-link -tdn"></a>\
                    </h3>\
                    <p class="card_description"></p>\
                    <div class="card_stats -rel"></div>\
                </div>\
                <div class="card_actions">\
                    <div class="-row -full-height"></div>\
                </div>\
            </div>\
        </article>',

    HTML_STATS_ORGANIZATION : '\
        <div class="-row">\
            <a class="card-stat-item" data-stats-voices>\
                <p class="stats-number -font-semi-bold"></p>\
                <p class="stats-label">Voices</p>\
            </a>\
            <a class="card-stat-item" data-stats-followers>\
                <p class="stats-number -font-semi-bold"></p>\
                <p class="stats-label">Followers</p>\
            </a>\
            <a class="card-stat-item" data-stats-following>\
                <p class="stats-number -font-semi-bold"></p>\
                <p class="stats-label">Following</p>\
            </a>\
            <a class="card-stat-item last" data-stats-members>\
                <p class="stats-number -font-semi-bold"></p>\
                <p class="stats-label">Members</p>\
            </a>\
        </div>',

    HTML_STATS_PERSON : '\
        <div class="-row">\
            <a class="card-stat-item" data-stats-voices>\
                <p class="stats-number -font-semi-bold"></p>\
                <p class="stats-label">Voices</p>\
            </a>\
            <a class="card-stat-item" data-stats-followers>\
                <p class="stats-number -font-semi-bold"></p>\
                <p class="stats-label">Followers</p>\
            </a>\
            <a class="card-stat-item last" data-stats-following>\
                <p class="stats-number -font-semi-bold"></p>\
                <p class="stats-label">Following</p>\
            </a>\
        </div>',

    FOLLOWS_CURRENT_PERSON_TEMPLATE : '<span class="badge-follows card-follows-you">Follows You</span>',

    MAX_DESCRIPTION_LENGTH : 180,

    prototype : {
        followersCount : 0,
        followingCount : 0,
        voicesCount : 0,
        membershipCount : 0,
        /* is currentPerson following this entity? */
        followed : false,

        _totalCountActions : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.profileCoverEl = this.el.querySelector('.card_background-image-wrapper');
            this.avatarEl = this.el.querySelector('.card_avatar');
            this.usernameEl = this.el.querySelector('.card_username-link');
            this.fullNameEl = this.el.querySelector('.card_fullname-link');
            this.statsWrapper = this.el.querySelector('.card_stats');
            this.descriptionEl = this.el.querySelector('.card_description');
            this.actionsEl = this.el.querySelector('.card_actions .-row');

            if (this.data.type === "organization") {
                this._setupOrganizationElements();
            } else {
                this._setupUserElements();
            }

            this._setupDefaultElements();
            this._addActionButtons();
        },

        /* Adds the necessary action buttons automatically - per user's role-based (follow, message, invite to, join, etc).
         * @method _addActionButtons <private> [Function]
         * @return CV.Card [Object]
         */
        _addActionButtons : function _addActionButtons() {
            if (!Person.get()) {
                return;
            }

            if (Person.is(this.data.id) || Person.anon()) {
                return;
            }

            if (this.data.type === "organization") {
                if (Person.ownerOf('organization', this.data.id) === true) {
                    return;
                }
            }

            if (Person.get().ownedOrganizations.length === 0) {
                this.appendChild(new CV.CardActionFollow({
                    name : 'followButton',
                    entity :  this.data
                })).render(this.actionsEl);
            } else {
                this.appendChild(new CV.CardActionFollowMultiple({
                    name : 'followButton',
                    entity :  this.data,
                    followingAsText : 'Following...'
                })).render(this.actionsEl);
            }
            this._totalCountActions++;

            if (this.data.type === "organization") {
                this.appendChild(new CV.CardActionJoin({
                    name : 'joinButton',
                    entity : this.data
                })).render(this.actionsEl);
                this._totalCountActions++;
            } else {
                this.appendChild(new CV.CardActionMessage({
                    name : 'messageButton',
                    id : this.data.id
                })).render(this.actionsEl);
                this._totalCountActions++;

                if (Person.canInviteEntity(this.data)) {
                    this.appendChild(new CV.CardActionInvite({
                        name : 'inviteButton',
                        entity : this.data
                    })).render(this.actionsEl);
                    this._totalCountActions++;
                }
            }

            var n = 12 / this._totalCountActions;
            [].slice.call(this.el.querySelectorAll('.card-actions-item'), 0).forEach(function(item) {
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
            if (this.data.backgrounds.bluredCard) {
                this.dom.updateBgImage(this.profileCoverEl, this.data.backgrounds.bluredCard.url);
            } else {
                this.profileCoverEl.classList.add('-colored-background');
            }

            if (this.data.images.card && this.data.images.card.url) {
                this.dom.updateAttr('src', this.avatarEl, this.data.images.card.url);
                this.dom.updateAttr('alt', this.avatarEl, this.data.profileName + "’s avatar image");
            } else {
                this.dom.updateAttr('src', this.avatarEl, PLACEHOLDERS.card);
            }

            this.dom.updateText(this.usernameEl, "@" + this.data.profileName);
            this.dom.updateAttr('href', this.usernameEl, '/' + this.data.profileName + '/');
            this.dom.updateAttr('title', this.usernameEl, "@" + this.data.profileName + '’s profile');

            if (this.data.followsCurrentPerson) {
                this.el.querySelector('.card_username').insertAdjacentHTML('beforeend', this.constructor.FOLLOWS_CURRENT_PERSON_TEMPLATE);
            }

            this.dom.updateText(this.fullNameEl, this.data.name);
            this.dom.updateAttr('href', this.fullNameEl, '/' + this.data.profileName + '/');
            this.dom.updateAttr('title', this.fullNameEl, this.data.name + '’s profile');

            var description = Autolinker.link(this.format.truncate(this.data.description || '', this.constructor.MAX_DESCRIPTION_LENGTH, true));
            if (description != null){
                this.dom.updateHTML(this.descriptionEl, description);
            } else {
                this.dom.updateHTML(this.descriptionEl, "");
            }

            return this;
        },

        _setupOrganizationElements : function _setupOrganizationElements() {
            var voices, followers, following, members;
            var total_voices = this.format.numberUS(this.data.voicesCount);
            var total_followers = this.format.numberUS(this.data.followersCount);
            var total_following = this.format.numberUS(this.data.followingCount);
            var total_members = this.format.numberUS(this.data.membershipCount);

            this.statsWrapper.insertAdjacentHTML('afterbegin', this.constructor.HTML_STATS_ORGANIZATION);

            voices = this.statsWrapper.querySelector('[data-stats-voices]');
            followers = this.statsWrapper.querySelector('[data-stats-followers]');
            following = this.statsWrapper.querySelector('[data-stats-following]');
            members = this.statsWrapper.querySelector('[data-stats-members]');

            this.dom.updateAttr('href', voices, '/' + this.data.profileName + '/#voices');
            this.dom.updateAttr('href', followers, '/' + this.data.profileName + '/#followers');
            this.dom.updateAttr('href', following, '/' + this.data.profileName + '/#following');
            this.dom.updateAttr('href', members, '/' + this.data.profileName + '/#members');

            this.dom.updateAttr('title', voices, total_voices + ' Voices');
            this.dom.updateAttr('title', followers, total_followers + ' Followers');
            this.dom.updateAttr('title', following, total_following + ' Following');
            this.dom.updateAttr('title', members, total_members + ' Members');

            this.dom.updateText(voices.querySelector('.stats-number'), total_voices);
            this.dom.updateText(followers.querySelector('.stats-number'), total_followers);
            this.dom.updateText(following.querySelector('.stats-number'), total_following);
            this.dom.updateText(members.querySelector('.stats-number'), total_members);

            return this;
        },

        _setupUserElements : function _setupUserElements() {
            var voices, followers, following;
            var total_voices = this.format.numberUS(this.data.voicesCount);
            var total_followers = this.format.numberUS(this.data.followersCount);
            var total_following = this.format.numberUS(this.data.followingCount);

            this.statsWrapper.insertAdjacentHTML('afterbegin', this.constructor.HTML_STATS_PERSON);

            voices = this.statsWrapper.querySelector('[data-stats-voices]');
            followers = this.statsWrapper.querySelector('[data-stats-followers]');
            following = this.statsWrapper.querySelector('[data-stats-following]');

            this.dom.updateAttr('href', voices, '/' + this.data.profileName + '/#voices');
            this.dom.updateAttr('href', followers, '/' + this.data.profileName + '/#followers');
            this.dom.updateAttr('href', following, '/' + this.data.profileName + '/#following');

            this.dom.updateAttr('title', voices, total_voices + ' Voices');
            this.dom.updateAttr('title', followers, total_followers + ' Followers');
            this.dom.updateAttr('title', following, total_following + ' Following');

            this.dom.updateText(voices.querySelector('.stats-number'), total_voices);
            this.dom.updateText(followers.querySelector('.stats-number'), total_followers);
            this.dom.updateText(following.querySelector('.stats-number'), total_following);

            return this;
        }
    }
});
