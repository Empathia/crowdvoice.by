/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesPostButton').inherits(Widget)({

    ELEMENT_CLASS : 'from-sources-post-button',

    HTML : '\
        <div>\
            <button class="post-btn ui-btn -primary -pl2 -pr2">Post</button>\
        </div>\
    ',

    prototype : {
        init : function init(config)  {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
        },

        _disable : function _disable() {
            Widget.prototype._disable.call(this);
            this.el.classList.add('-muted');
            this.el.setAttribute('disabled', true);
        },

        _enable : function _enable() {
            Widget.prototype._enable.call(this);
        }
    }
});
