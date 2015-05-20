Class(CV, 'ManageRelatedVoices').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-manage-related-voices',

    HTML : '\
        <div>\
        <form>\
        <div class="-col-12 placeholder-main">\
        </div>\
        <div class="-col-12 placeholder-voices"></div>\
        </form>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        voices          : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            var sendElement = this.element.find('.send');

			new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    placeholder : 'Search voices...',
			    title 		: "Add voices that are related to this voice (?)"
			}).render(this.element.find('.placeholder-main'));

			new CV.VoicesList({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasButton 	: true,
			    voices 		: voices,
			    listTitle 	: "The continuos effects of the fukushima disaster",
			}).render(this.element.find('.placeholder-voices'));

        }

    }

});







