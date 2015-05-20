Class('Report').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-report',

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
			  "1": {name: 'This Organization is not authorized/official.', active: true},
			  "2": {name: 'Ferguson Unrest'},
			  "3": {name: 'Unemployment in Detroit'}
			};
			new Select({
			  	label 		: 'Select one',
			  	name  		: 'select',
			  	style 		: 'full',
			  	options 	: allVoices,
			  	hasTitle 	: true,
		    	title 		: "Why are you reporting?"
			}).render(this.element.find('.placeholder-main'));

			new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    isArea 		: true,
			    hasTitle 	: true,
			    title 		: "State your case",
			    subTitle 	: "Be as detailed as possible"
			}).render(this.element.find('.placeholder-main'));



			//********** bottom ***********

            new Button({
			    style   : 'primary full',
			    type    : 'single',
			    label   : 'Submit',
			    name    : 'buttonSend'
			}).render(this.element.find('.placeholder-send'));

        }

    }

});