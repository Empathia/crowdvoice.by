/* jshint multistr: true */
Class(CV, 'VoiceModerate').inherits(Widget)({

    HTML : '\
    <button class="cv-button tiny primary -color-white ui-has-tooltip">\
        <svg class="voice-footer-svg">\
            <use xlink:href="#svg-moderate"></use>\
        </svg>\
        <span class="ui-tooltip -top-right -nw">Moderate Content</span>\
    </button>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
