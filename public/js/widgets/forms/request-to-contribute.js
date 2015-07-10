Class(CV, 'RequestToContribute').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-request-to-contribute',

    HTML : '\
        <div class="-clear-after">\
            <form>\
                <div class="-col-12 placeholder-main">\
                </div>\
                <div class="-col-12 placeholder-send"></div>\
            </form>\
        </div>\
    ',

    THANKS : '\
        <div class="sent-form">\
        <h2>Thanks for the interest to help out!</h2>\
        <p>We will review your request as soon as possible and may contact you to get some more information or directly with a response.</p>\
        <br>\
        <button class="cv-button ok small">Ok</button>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        voices          : null,

        init : function(config){
            Widget.prototype.init.call(this, config);

            this.element.append(this.constructor.FORM);
            var that = this;

            new CV.Input({
                type        : '',
                name        : '',
                style       : '',
                isArea      : true,
                hasTitle    : true,
                title       : "Briefly state why would you be a valuable content contributor to this Voice."
            }).render(this.element.find('.placeholder-main'));


            //********** bottom ***********

            new CV.Button({
                style   : 'primary full submit',
                type    : 'single',
                label   : 'Submit Request',
                name    : 'buttonSend'
            }).render(this.element.find('.placeholder-send'));

        },

        showSuccess : function(){
            var that = this;
            this.element.find('form').remove();
            this.element.append(that.constructor.THANKS);

            this.element.find('button.ok').on('click', function(){
                that.dispatch('close');
            });
        }

    }

});
