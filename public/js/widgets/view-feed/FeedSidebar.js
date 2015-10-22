var API = require('./../../lib/api');

Class(CV, 'FeedSidebar').inherits(Widget)({
    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.voicesList = this.el.querySelector('.feed__top-voices-list');

            this.appendChild(new CV.Loader({
                name : 'loader',
                className : 'grey'
            })).render(this.voicesList);
        },

        /* Fetch and render the first 6 trending voices.
         * Hides the loader on success response.
         * @method fetchTopVoices <public> [Function]
         * @return FeedSidebar
         */
        fetchTopVoices : function fetchTopVoices() {
            API.getTrendingVoices(function(err, res) {
                if (res.length > 6) {
                    res = res.slice(0,6);
                }

                res.forEach(function(voice, index) {
                    this.appendChild(new CV.VoiceCoverMini({
                        name : 'top_voice_' + index,
                        className : '-mb1',
                        data : voice
                    })).render(this.voicesList);
                }, this);

                this.loader.disable();
            }.bind(this));

            return this;
        },

        /* Display the stats.
         * @method showStats <public> [Function]
         * @return FeedSidebar
         */
        showStats : function showStats() {
            this.appendChild(new CV.FeedSidebarStats({
                name : 'stats'
            })).render(this.el.querySelector('.profile-sidebar'));

            return this;
        }
    }
});
