var API = require('./../../lib/api');

Class(CV, 'RequestToContribute').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-request-to-contribute',

    HTML : '\
        <div class="-clear-after">\
        </div>\
    ',

    FORM : '\
        <form>\
            <div class="-col-12 placeholder-main">\
            </div>\
            <div class="-col-12 placeholder-send"></div>\
        </form>\
    ',

    SENT : '\
        <div class="sent-form">\
        <h2>Thanks for the interest to help out!</h2>\
        <p>We will review your request as soon as possible and may contact you to get some more information or directly with a response.</p>\
        <br>\
        <button class="cv-button ok small">Ok</button>\
        </div>\
    ',

    prototype : {
        data : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.setup();
        },

        setup : function(){
            this.element.empty();
            this.element.append(this.constructor.FORM);

            new CV.Input({
                name        : '',
                isArea      : true,
                hasTitle    : true,
                title       : "Briefly state why would you be a valuable content contributor to this Voice."
            }).render(this.element.find('.placeholder-main'));

            var formButton = new CV.Button({
                style   : 'primary full submit',
                type    : 'single',
                label   : 'Submit Request',
                name    : 'buttonSend'
            }).render(this.element.find('.placeholder-send'));

            formButton.element.click(function(e){
                e.preventDefault();
                this.sendMessage();
            }.bind(this));

        },

        sendMessage : function(){
            var sendmessage = this;

            API.voiceRequestToContribute({
                profileName : this.data.voice.owner.profileName,
                voiceSlug : this.data.voice.slug,
                data : {
                    message : this.element.find('form textarea').val()
                }
            }, function(err, res) {
                if (err) {
                    console.log(res);
                    return;
                }

                sendmessage.element.find('form').remove();
                sendmessage.element.append(sendmessage.constructor.SENT);
                sendmessage.element.find('button').on('click', function(){
                    sendmessage.dispatch('close');
                    sendmessage.setup();
                });
            });
        }
    }
});
