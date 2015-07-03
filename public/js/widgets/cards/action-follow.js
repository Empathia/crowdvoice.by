/* jshint multistr: true */
Class(CV, 'CardActionFollow').inherits(Widget)({

    ELEMENT_CLASS : 'post-card-actions-item',

    HTML : '\
        <div>\
            <svg class="post-card-activity-svg">\
                <use xlink:href="#svg-follow"></use>\
            </svg>\
            <p class="post-card-actions-label">Follow</p>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
