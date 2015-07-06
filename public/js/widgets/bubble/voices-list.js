/* jshint multistr: true */
Class(CV, 'VoicesList').inherits(Widget)({

	ELEMENT_CLASS : 'cv-voiceslist',

    HTML : '\
        <div>\
            <div class="voice-title"></div>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        voices          : null,
        listTitle       : null,
        hasButton       : null,

        init : function(config){
            Widget.prototype.init.call(this, config);

            var list = this;

            if(this.listTitle){
                this.element.find('.voice-title').text(this.voices.length + ' contributors of "'+ this.listTitle + '"');
            } else {
                this.element.find('.voice-title').remove();
            }

            voices.forEach(function(voice){
                var voiceMini = new CV.VoiceCoverMini( voice ).render( this.element );

                if(list.hasButton){
                    new CV.Button({
                        style   : '',
                        type    : 'single',
                        label   : 'Remove',
                        name    : 'buttonRemove'
                    }).render(voiceMini.element.find('.action'));
                }

            }.bind(this));

        }

    }

});



