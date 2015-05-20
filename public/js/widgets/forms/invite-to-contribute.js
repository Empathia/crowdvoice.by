Class(CV, 'InviteToContribute').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-invite-to-contribute',

    HTML : '\
        <div>\
        <form>\
        <div class="-col-12 placeholder-main">\
        </div>\
        <div class="-col-12 placeholder-send"></div>\
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

			var allVoices = {
			  "1": {name: 'The Continued Effects of the Fukushima Disaster', active: true},
			  "2": {name: 'Ferguson Unrest'},
			  "3": {name: 'Unemployment in Detroit'}
			};
			new CV.Select({
			  	label 		: 'Select one',
			  	name  		: 'select',
			  	style 		: 'full',
			  	options 	: allVoices,
			  	hasTitle 	: true,
		    	title 		: "To which of your voices would you like to invite this user to?"
			}).render(this.element.find('.placeholder-main'));

			new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    isArea 		: true,
			    hasTitle 	: true,
			    title 		: "Write a message"
			}).render(this.element.find('.placeholder-main'));



			//********** bottom ***********

            new CV.Button({
			    style   : 'primary full',
			    type    : 'single',
			    label   : 'Invite Esra\'a Al Shafei',
			    name    : 'buttonSend'
			}).render(this.element.find('.placeholder-send'));

        }

    }

});