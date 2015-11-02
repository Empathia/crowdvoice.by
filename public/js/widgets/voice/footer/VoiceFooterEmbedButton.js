/* jshint multistr: true */
Class(CV, 'VoiceFooterEmbedButton').inherits(Widget)({
    HTML : '\
        <button class="cv-button tiny">\
            <svg class="voice-footer-svg">\
              <use xlink:href="#svg-embed"></use>\
            </svg>\
        </button>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
        }
    }
});
