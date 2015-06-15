/* jshint multistr: true */
Class(CV, 'VoiceModerate').inherits(Widget)({

    HTML : '\
    <button class="cv-button tiny primary -color-white">\
        <svg class="voice-footer-svg">\
            <use xlink:href="#svg-moderate"></use>\
        </svg>\
    </button>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
