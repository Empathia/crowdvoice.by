Class(CV, 'Help').inherits(Widget)({

	ELEMENT_CLASS : 'cv-help',

    HTML : '\
        <div>\
        </div>\
    ',

    FORM : '\
        <form>\
        <p>Briefly state why would you be a valuable content contributor to this Voice.<p>\
        <br><div class="cv-input">\
            <textarea></textarea>\
        </div>\
        <br><button type="button" class="submit cv-button full primary">Submit Request</button>\
        </form>\
    ',

    THANKS : '\
        <div class="sent">\
        <img src="../img/icon-happy-face.png">\
        <h1>Thanks for the interest to help out!</h1>\
        <p>We will review your request as soon as possible and may contact you to get some more information or directly with a response.</p>\
        <button class="cv-button">Ok</button>\
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
                that.element.find('form').remove();
                that.element.append(that.constructor.THANKS);
            });
            //voices.forEach(function(voice){
            //    new VoiceCoverMini( voice ).render( this.element );
            //}.bind(this));
        }

    }

});