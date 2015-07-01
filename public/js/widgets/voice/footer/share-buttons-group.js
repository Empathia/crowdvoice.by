/* jshint multistr: true */
Class(CV, 'VoiceFooterShareButtonsGroup').inherits(Widget)({
    HTML : '\
        <div class="-inline-block">\
            <div class="cv-button-group multiple"></div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.groupElement = this.el.querySelector('.cv-button-group');

            // this.appendChild(new CV.VoiceFooterEmbedButton()).render(this.el);
            this.appendChild(new CV.VoiceFooterShareButton()).render(this.groupElement).setup();
        }
    }
});
