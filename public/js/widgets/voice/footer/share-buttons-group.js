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

            // this.appendChild(new CV.VoiceFooterEmbedButton({name: 'embedButton'})).render(this.groupElement)

            this.appendChild(
                new CV.VoiceFooterShareButton({
                    name : 'shareButton'
                })
            ).render(this.groupElement).setup();
        }
    }
});
