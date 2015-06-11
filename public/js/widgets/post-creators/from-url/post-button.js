/* jshint multistr: true */
Class(CV, 'PostCreatorFromUrlPostButton').inherits(Widget)({

    ELEMENT_CLASS : 'from-url-post-button',

    HTML : '\
        <div>\
            <button class="post-btn ui-btn -primary -pl2 -pr2">Post</button>\
        </div>\
    ',

    prototype : {
        init : function init(config)  {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.button = this.el.querySelector('.post-btn');
        },

        _disable : function _disable() {
            Widget.prototype._disable.call(this);
            this.button.classList.add('-muted');
            this.button.setAttribute('disabled', true);
        },

        _enable : function _enable() {
            Widget.prototype._enable.call(this);
            this.button.classList.remove('-muted');
            this.button.removeAttribute('disabled');
        }
    }
});

