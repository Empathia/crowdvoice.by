Class(CV, 'FormRequestToContribute').inherits(Widget)({

	ELEMENT_CLASS : 'cv-help',

    HTML : '\
        <div>\
        </div>\
    ',

    FORM : '\
        <form>\
        <p>Briefly state why would you be a valuable content contributor to this Voice.<p>\
        <br><div class="cv-input is-area">\
            <textarea rows="4" placeholder="140 characters max."></textarea>\
        </div>\
        <br><button type="button" class="submit cv-button full primary">Submit Request</button>\
        </form>\
    ',

    THANKS : '\
        <div class="sent">\
        <img src="../img/icon-happy-face.png">\
        <h1>Thanks for the interest to help out!</h1>\
        <p>We will review your request as soon as possible and may contact you to get some more information or directly with a response.</p>\
        <button class="cv-button ok">Ok</button>\
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
            this.element.find('button.submit').on('click', function(){

                that.showSuccess();

            });

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




