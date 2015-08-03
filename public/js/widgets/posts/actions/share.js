Class(CV, 'PostActionShare').inherits(Widget)({
    HTML : '\
        <div class="post-card-actions-item">\
            <svg class="post-card-activity-svg">\
                <use xlink:href="#svg-share"></use>\
            </svg>\
            <p class="post-card-actions-label">Share</p>\
        </div>',

    prototype : {
        init : function init (config) {
            Widget.prototype.init.call(this, config);
        }
    }
});