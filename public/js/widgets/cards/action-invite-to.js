/* jshint multistr: true */
Class(CV, 'CardActionInvite').inherits(Widget)({

    ELEMENT_CLASS : 'card-actions-item',

    HTML : '\
        <div>\
            <svg class="card-activity-svg -s16">\
                <use xlink:href="#svg-invite-to"></use>\
            </svg>\
            <p class="card-actions-label">Invite to&hellip;</p>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
