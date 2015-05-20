/**
 * Card Widget
 *
 * @proposed data format
 * is_organization  {Boolean} indicates if the data belongs to an organization
 * profile_cover    {String} path to the profile cover updaloaded user/org
 * author           {Object} author avatar, username, full_name, url
 * description      {String} profile description
 * joined_at        {String} ISO date string
 * voices_total     {Number} total count of published voices
 * followers        {Number} number of followers
 * collaborators    <optional> {Number} users participating in org's voices
 * collaborations   <optional> {Number} no. or voices in which is collaborating

 * @TODO : define how we will collect locations. what are we planning to do
 * with this data. eg. filtering, searching, showing flags.
 * location         <optional>
 *
 * @example
 * is_organization  : false
 * profile_cover    : 'http://.../profile-cover.jpg'
 * author           : {avatar: '.../avatar.jpg', username: 'username', full_name: 'John Doe", url: '.../username'}
 * description      : 'Suspendisse Dictum Feugiat'
 * joined_at        : '2015-03-30T13:59:47Z'
 * voices_total     : 32
 * followers        : 288
 * collaborators    : 12
 * collaborations   : 3
 */

var moment = require('moment');

Class(CV, 'Card').inherits(Widget).includes(CV.WidgetUtils)({
  HTML : '\
    <article role="article" class="widget-card">\
      <div class="card_background-image-wrapper -img-cover"></div>\
      <div class="card_info-wrapper">\
        <img class="card_avatar -rounded" alt="{{author.full_name}}’s avatar image"/>\
        <div class="pan-separator">\
          <p class="card_username">\
            <a class="card_username-link"></a>\
          </p>\
          <h3 class="card_fullname">OpenGovFoundation</h3>\
          <div class="card_stats">\
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
          <p class="card_description">\
            <i class="card_description-text"></i>\
          </p>\
          <div class="card_meta">\
            <div class="card_meta-location -inline">\
              <svg class="card_meta-svg -color-grey-light">\
                <use xlink:href="#svg-map-pin"></use>\
              </svg>\
              <span class="card_meta-location-text"></span>\
            </div>\
            <div class="card_meta-joined-at -inline">\
              <svg class="card_meta-svg -color-grey-light">\
                <use xlink:href="#svg-calendar"></use>\
              </svg>\
              <time class="card_meta-joined-at-text" datetime=""></time>\
            </div>\
          </div>\
        </div>\
        <div class="card_actions">\
        </div>\
      </div>\
    </article>\
  ',

  prototype : {
    init : function init(config) {
      Widget.prototype.init.call(this, config);

      this.el = this.element[0];

      this.profileCoverEl = this.el.querySelector('.card_background-image-wrapper');
      this.avatarEl = this.el.querySelector('.card_avatar');
      this.usernameEl = this.el.querySelector('.card_username-link');
      this.fullNameEl = this.el.querySelector('.card_fullname');
      this.descriptionEl = this.el.querySelector('.card_description-text');
      this.locationEl = this.el.querySelector('.card_meta-location-text');
      this.joinedAtEl = this.el.querySelector('.card_meta-joined-at-text');
      this.actionsEl = this.el.querySelector('.card_actions');

      this.totalVoicesEl = this.el.querySelector('.card_total-voices-text');
      this.totalVoicesLabelEl = this.el.querySelector('.card_total-voices-label-text');
      this.totalFollowersEl = this.el.querySelector('.card_total-followers-text');
      this.totalFollowersLabelEl = this.el.querySelector('.card_total-followers-label-text');
      this.totalFollowingEl = this.el.querySelector('.card_total-following-text');
      this.totalFollowingLabelEl = this.el.querySelector('.card_total-following-label-text');
      this.collaborationsEl = this.el.querySelector('.card_collaborations-text');
      this.collaborationsLabelEl = this.el.querySelector('.card_collaborations-label-text');

      this._setupElements();
    },

    /**
     * Update its content with the received data.
     * @method _setupElements <private> [Function]
     * @return Card [Object]
     */
    _setupElements : function() {
      this.dom.updateBgImage(this.profileCoverEl, this.author.profile_cover);

      this.dom.updateAttr('src', this.avatarEl, this.author.avatar);
      this.dom.updateAttr('alt', this.avatarEl, this.author.full_name + "’s avatar image");

      this.dom.updateText(this.usernameEl, "@" + this.author.username);
      this.dom.updateAttr('href', this.usernameEl, this.author.profile_url);

      this.dom.updateText(this.fullNameEl, this.author.full_name);
      this.dom.updateText(this.descriptionEl, this.author.description);
      this.dom.updateText(this.locationEl, this.author.location);
      this.dom.updateText(this.joinedAtEl, moment(this.author.created_at).format('MMM YYYY'));
      this.dom.updateText(this.totalVoicesEl, this.format.numberUS(this.author.total_voices));
      this.dom.updateText(this.totalVoicesLabelEl, 'Voices');
      this.dom.updateText(this.totalFollowersEl, this.format.numberUS(this.author.followers));
      this.dom.updateText(this.totalFollowersLabelEl, 'Followers');
      this.dom.updateText(this.totalFollowingEl, this.format.numberUS(this.author.following));
      this.dom.updateText(this.totalFollowingLabelEl, 'Following');

      if (this.type === "organization") {
        this.dom.updateText(this.collaborationsLabelEl, 'Members');
        this.dom.updateText(this.collaborationsEl, this.format.numberUS(this.author.collaborators));
      } else {
        this.dom.updateText(this.collaborationsLabelEl, 'Members');
        this.dom.updateText(this.collaborationsEl, this.format.numberUS(this.author.collaborations));
      }

      var btnActions = {
        "1": {name: 'Join'},
        "2": {name: 'Message'},
        "3": {name: 'Follow'}
      };

      new CV.Button({
          style   : '',
          type    : 'multiple',
          name    : 'buttonActions',
          options : btnActions
      }).render(this.actionsEl);

      return this;
    }
  }
});
