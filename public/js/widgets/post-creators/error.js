/* jshint multistr: true */
Class(CV, 'PostCreatorErrorTemplate').inherits(Widget)({
    HTML : '\
        <div class="cv-post-creator__error-template -rel -br1">\
            <svg class="error-icon -abs -color-grey-light">\
                <use xlink:href="#svg-circle-x"></use>\
            </svg>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
