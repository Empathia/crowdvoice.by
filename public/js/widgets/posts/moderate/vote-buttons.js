/* jshint multistr: true */
Class(CV, 'PostModerateVoteButtons').inherits(Widget)({
    ELEMENT_CLASS : 'post-moderate-vote-buttons -abs -full-width -clearfix',

    HTML : '\
        <div> \
            <button class="post-moderate-allow-btn cv-button primary tiny -float-left">\
                <svg class="-s16">\
                    <use xlink:href="#svg-thumbs-up"></use>\
                </svg>\
                <span>Allow</span>\
            </button>\
            <button class="post-moderate-deny-btn cv-button primary tiny -float-left">\
                <svg class="-s16">\
                    <use xlink:href="#svg-join"></use>\
                </svg>\
                <span>Deny</span>\
            </button>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
