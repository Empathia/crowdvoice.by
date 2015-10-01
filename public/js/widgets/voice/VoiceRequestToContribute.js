Class(CV, 'VoiceRequestToContribute').inherits(Widget)({
    HTML : '\
        <div class="request-to-contribute-container -inline-block">\
          <button class="request-to-contribute-button cv-button tiny">Request to Contribute</button>\
        </div>\
    ',

    prototype : {
        /* Voice Model of the current voice.
         * @property voice <required> [VoiceModel]
         */
        voice : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            var bubble = new CV.Bubble({
                title : 'Want to help out?',
                name : 'bubbleRequest',
                action : CV.RequestToContribute,
                data : {
                    voice : this.voice
                },
                width : 600,
                anchorEl : $(this.el).find('.request-to-contribute-button')
            });

            this.appendChild(bubble);
        }
    }
});
