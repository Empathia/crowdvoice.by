Class('VoicesList').inherits(Widget)({

	ELEMENT_CLASS : 'cv-voiceslist',

    HTML : '\
        <div>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        voices          : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            voices.forEach(function(voice){
                new VoiceCoverMini( voice ).render( this.element );
            }.bind(this));

        }

    }

});



