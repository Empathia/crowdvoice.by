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
                    <h3 class="card_fullname -rel -font-bold">OpenGovFoundation</h3>\
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
            <div class="card-stat-item">\
                <p class="stats-number card_total-voices-text -font-semi-bold"></p>\
                <p class="stats-label card_total-voices-label-text">Voices</p>\
            </div>\
            <div class="card-stat-item">\
                <p class="stats-number card_total-followers-text -font-semi-bold"></p>\
                <p class="stats-label card_total-followers-label-text">Followers</p>\
            </div>\
            <div class="card-stat-item">\
                <p class="stats-number card_total-following-text -font-semi-bold"></p>\
                <p class="stats-label card_total-following-label-text">Following</p>\
            </div>\
            <div class="card-stat-item last">\
                <p class="stats-number card_collaborations-text -font-semi-bold"></p>\
                <p class="stats-label card_collaborations-label-text">Members</p>\
            </div>\
        </div>',

    HTML_STATS_PERSON : '\
        <div class="-row">\
            <div class="card-stat-item">\
                <p class="stats-number card_total-voices-text -font-semi-bold"></p>\
                <p class="stats-label card_total-voices-label-text">Voices</p>\
            </div>\
            <div class="card-stat-item">\
                <p class="stats-number card_total-followers-text -font-semi-bold"></p>\
                <p class="stats-label card_total-followers-label-text">Followers</p>\
            </div>\
            <div class="card-stat-item last">\
                <p class="stats-number card_total-following-text -font-semi-bold"></p>\
                <p class="stats-label card_total-following-label-text">Following</p>\
            </div>\
        </div>',

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
            this.fullNameEl = this.el.querySelector('.card_fullname');
            this.statsWrapper = this.el.querySelector('.card_stats');
            this.descriptionEl = this.el.querySelector('.card_description');
            this.actionsEl = this.el.querySelector('.card_actions .-row');

            if (this.data.type === "organization") {
                this.statsWrapper.insertAdjacentHTML('afterbegin', this.constructor.HTML_STATS_ORGANIZATION);
                this._setupOrganizationElements();
            } else {
                this.statsWrapper.insertAdjacentHTML('afterbegin', this.constructor.HTML_STATS_PERSON);
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

            this.appendChild(new CV.CardActionMessage({
                name : 'messageButton',
                id : this.data.id
            })).render(this.actionsEl);
            this._totalCountActions++;

            if (this.data.type === "organization") {
                this.appendChild(new CV.CardActionJoin({
                    name : 'joinButton',
                    entity : this.data
                })).render(this.actionsEl);
                this._totalCountActions++;
            } else {
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
            this.dom.updateAttr('href', this.usernameEl, '/' + this.data.profileName);

            var fullname = this.data.name + (this.data.lastname ? (' ' + this.data.lastname) : '');
            this.dom.updateText(this.fullNameEl, fullname);

            var description = Autolinker.link(this.format.truncate(this.data.description || '', this.constructor.MAX_DESCRIPTION_LENGTH, true));
            if (description != null){
                this.dom.updateHTML(this.descriptionEl, description);
            } else {
                this.dom.updateHTML(this.descriptionEl, "");
            }

            this.dom.updateText(this.statsWrapper.querySelector('.card_total-voices-text'), this.format.numberUS(this.data.voicesCount));
            this.dom.updateText(this.statsWrapper.querySelector('.card_total-followers-text'), this.format.numberUS(this.data.followersCount));
            this.dom.updateText(this.statsWrapper.querySelector('.card_total-following-text'), this.format.numberUS(this.data.followingCount));

            return this;
        },

        _setupOrganizationElements : function _setupOrganizationElements() {
            this.dom.updateText(
                this.statsWrapper.querySelector('.card_collaborations-text'),
                this.format.numberUS(this.data.membershipCount)
            );

            return this;
        },

        _setupUserElements : function _setupUserElements() {
            return this;
        }
    }
});
