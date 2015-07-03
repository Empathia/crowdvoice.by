/* jshint multistr: true */
Class(CV, 'CardActionMessage').inherits(Widget)({

    ELEMENT_CLASS : 'post-card-actions-item',

    HTML : '\
        <div>\
            <svg class="post-card-activity-svg">\
                <use xlink:href="#svg-messages"></use>\
            </svg>\
            <p class="post-card-actions-label">Message</p>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
