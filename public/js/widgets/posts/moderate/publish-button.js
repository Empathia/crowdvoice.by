/* jshint multistr: true */
Class(CV, 'PostModeratePublishButton').inherits(Widget)({
    HTML : '\
        <button class="post-moderate-publish-btn cv-button primary tiny -abs -full-width">\
            <svg class="-s16">\
                <use xlink:href="#svg-thumbs-up"></use>\
            </svg>\
            <span>Publish</span>\
        </button>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
