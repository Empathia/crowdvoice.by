/* jshint multistr: true */
Class(CV, 'VoiceRequestToContribute').inherits(Widget)({
    HTML : '\
        <div class="request-to-contribute-container -inline-block">\
          <button class="request-to-contribute-button cv-button tiny primary">Request to Contribute</button>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.appendChild(
                new CV.PopoverRequestToContribute({
                    toggler: this.el.querySelector('.request-to-contribute-button'),
                    container: this.el
                })
            );
        }
    }
});
