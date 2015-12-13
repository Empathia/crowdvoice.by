var API = require('./../../lib/api');

Class(CV, 'FeedFeaturedVoices').inherits(Widget).includes(CV.WidgetUtils)({
  prototype: {
    MAX_VOICES: 3,
    init: function init(config) {
      Widget.prototype.init.call(this, config);
      this.el = this.element;
      this.voicesList = this.el.querySelector('.feed__featured-voices-list');

      this.appendChild(new CV.Loading({
        name : 'loader'
      })).render(this.voicesList).center().setStyle({
        top: '74px'
      });
    },

    /* Fetch and render the first 3 featured voices.
     * Hides the loader on success response.
     * @public
     * @return FeedFeaturedVoices
     */
    fetch: function fetch() {
      API.getBrowseFeaturedVoices(function(err, res) {
        if (res.length > this.MAX_VOICES) {
          res = res.slice(0,this.MAX_VOICES);
        }

        res.forEach(function(voice, index) {
          this.appendChild(new CV.VoiceCoverMediumList({
            name: 'top_voice_' + index,
            className: '-mb3',
            data: voice
          })).render(this.voicesList);
        }, this);

        this.loader.disable();
      }.bind(this));

      return this;
    }
  }
});
