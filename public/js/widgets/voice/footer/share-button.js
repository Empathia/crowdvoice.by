/* jshint multistr: true */
Class(CV, 'VoiceFooterShareButton').inherits(Widget)({
    HTML : '\
        <button class="cv-button tiny">\
            <svg class="voice-footer-svg">\
                <use xlink:href="#svg-share"></use>\
            </svg>\
        </button>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.appendChild(
                new CV.VoiceFooterShareItems({
                    name : 'shareItems'
                })
            );
        },

        setup : function setup() {
            this.appendChild(
                new CV.PopoverBlocker({
                    name : 'popover',
                    className : 'voice-share-popover',
                    placement : 'top-right',
                    toggler : this.el,
                    content : this.shareItems.el
                })
            ).render(this.parent.el);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});
