Class(CV, 'Share').inherits(Widget)({

	ELEMENT_CLASS : 'cv-share',

    HTML : '\
        <div>\
        </div>\
    ',

    SOCIAL : '\
        <ul>\
            <li class="twitter">Twitter</li>\
            <li class="facebook">Facebook</li>\
            <li class="google">Google Plus</li>\
            <li class="email">\
                <input type="text" placeholder="Enter email here to share"><button class="cv-button" >Share</button>\
            </li>\
        </ul>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        voices          : null,

        init : function(config){
            Widget.prototype.init.call(this, config);

            this.element.append(this.constructor.SOCIAL);
            //voices.forEach(function(voice){
            //    new VoiceCoverMini( voice ).render( this.element );
            //}.bind(this));
        }

    }

});



