/* jshint multistr: true */
Class(CV, 'PostEditRemoveButton').inherits(Widget)({
    HTML : '\
        <button class="post-edit-remove-btn cv-button primary tiny -abs">\
            <svg class="-s16">\
                <use xlink:href="#svg-trash"></use>\
            </svg>\
        </button>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
