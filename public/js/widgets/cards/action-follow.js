/* jshint multistr: true */
Class(CV, 'CardActionFollow').inherits(Widget)({

    ELEMENT_CLASS : 'card-actions-item card-actions-follow-button',

    HTML : '<div></div>',

    HTML_FOLLOW : '\
        <svg class="card-activity-svg -s16">\
            <use xlink:href="#svg-user-follow"></use>\
        </svg>\
        <p class="card-actions-label">Follow</p>',

    HTML_FOLLOWING : '\
        <div class="following-button">\
            <svg class="card-activity-svg -s16">\
                <use xlink:href="#svg-user-following"></use>\
            </svg>\
            <p class="card-actions-label">Following</p>\
        </div>\
        <div class="unfollow-button">\
            <svg class="card-activity-svg -s16">\
                <use xlink:href="#svg-user-unfollow"></use>\
            </svg>\
            <p class="card-actions-label">Unfollow</p>\
        </div>',

    prototype : {
        followed : false,

        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            if (this.followed === false) {
                this.setFollow();
            } else this.setFollowing();

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this.el.addEventListener('click', this._clickHandlerRef);
            return this;
        },

        setFollowing : function setFollowing() {
            this.el.insertAdjacentHTML('beforeend', this.constructor.HTML_FOLLOWING);
        },

        setFollow : function setFollow() {
            this.el.insertAdjacentHTML('beforeend', this.constructor.HTML_FOLLOW);
        },

        _clickHandler : function _clickHandler(ev) {
            console.log('as;jfkls');
        }
    }
});
