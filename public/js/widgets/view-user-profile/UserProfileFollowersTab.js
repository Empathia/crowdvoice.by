var API = require('./../../lib/api');

Class(CV, 'UserProfileFollowersTab').inherits(Widget)({
    HTML : '\
        <div>\
            <h2 class="profile-subheading -font-bold -m0">Followers</h2>\
            <hr>\
            <div data-container class="responsive-width-cards -rel"></div>\
        </div>',

    prototype : {
        _fetching : false,
        _fetched : false,

        /* Holds the ResponsiveWidth instance reference.
         * @property _responsiveWidth <private>
         */
        _responsiveWidth : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.containerElement = this.el.querySelector('[data-container]');

            this.loader = new CV.Loader().render(this.containerElement);
        },

        fetch : function fetch() {
            if ((this._fetching === true) || (this._fetched === true)) {
                return;
            }

            this._fetching = true;

            console.time('wr');
            console.log('%cfollowers request', 'color: green');
            API.getEntityFollowers({
                profileName : this.data.entity.profileName,
            }, this._handleFetchResults.bind(this));
        },

        _handleFetchResults : function _handleFetchResults(err, res) {
            this._fetching = false;

            if (err) {
                console.log(err);
                return;
            }

            this._fetched = true;
            this._renderResults(res);
        },

         _renderResults : function _renderResults(followers) {
             this.parent.parent.nav.updateCounter(followers.length);

             if (followers.length) {
                 followers.forEach(function(follower, index) {
                     this.appendChild(new CV.Card({
                         name : 'follower_' + index,
                         data : follower
                     })).render(this.containerElement);
                 }, this);

                 this._responsiveWidth = new CV.ResponsiveWidth({
                     container : this.containerElement,
                     items : this.children.map(function(ch) {return ch.el;}),
                     minWidth : 300
                 }).setup();
             } else {
                this.appendChild(new CV.EmptyState({
                    name : 'empty',
                    className : '-pt4 -pb4',
                    message : '@' + this.data.entity.profileName + ' has no followers yet.'
                })).render(this.containerElement);
             }

             this.loader.disable();
             console.timeEnd('wr');
             console.log('%cfollowers rendered', 'color: green');
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            if ((this._fetching === false) && (this._fetched === false)) {
                return this.fetch();
            }

            this._responsiveWidth && this._responsiveWidth.update();
        }
    }
});
