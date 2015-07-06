/* jshint multistr: true */
Class(CV, 'CardActionInvite').inherits(Widget)({

    ELEMENT_CLASS : 'post-card-actions-item',

    HTML : '\
        <div>\
            <svg class="post-card-activity-svg">\
                <use xlink:href="#svg-invite-to"></use>\
            </svg>\
            <p class="post-card-actions-label">Invite to&hellip;</p>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
