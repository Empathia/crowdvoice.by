Class(CV, 'RequestMembership').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-request-membership',

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

			new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    isArea 		: true,
			    hasTitle 	: true,
			    title 		: "Briefly state why would you be a valuable member for this Organization."
			}).render(this.element.find('.placeholder-main'));


			//********** bottom ***********

            new CV.Button({
			    style   : 'primary full',
			    type    : 'single',
			    label   : 'Submit Request',
			    name    : 'buttonSend'
			}).render(this.element.find('.placeholder-send'));

        }

    }

});