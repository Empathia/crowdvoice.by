/* jshint multistr: true */
Class(CV, 'CardActionJoin').inherits(Widget)({

    ELEMENT_CLASS : 'card-actions-item',

    HTML : '\
        <div>\
            <svg class="card-activity-svg -s16">\
                <use xlink:href="#svg-join"></use>\
            </svg>\
            <p class="card-actions-label">Join</p>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
