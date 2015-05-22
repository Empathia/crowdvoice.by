Class(CV, 'CreateOrganization').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-create-organization',

    HTML : '\
        <div>\
        <form>\
        <div class="-col-12 placeholder-main">\
        </div>\
        <div class="-col-12">\
        	<div class="-col-10 -pr1 placeholder-location">\
	        </div>\
	        <div class="-col-2 -pl1 placeholder-pin">\
	        	<div class="form-field">\
	        		<label><span></span></label>\
	        		<div class="cv-detect-location">Detect</div>\
	        	</div>\
	        </div>\
        </div>\
        <div class="-col-3 -pr1 placeholder-logo">\
        </div>\
        <div class="-col-9 -pl1 placeholder-background">\
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

            //name handler description location

			new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    title 		: "Organization Name",
			}).render(this.element.find('.placeholder-main'));

			new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    placeholder : 'http://www.crowdvoice.by/@',
			    hasTitle 	: true,
			    title 		: "Handler",
			}).render(this.element.find('.placeholder-main'));

			new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    isArea 		: true,
			    hasTitle 	: true,
			    title 		: "Description",
			    subTitle 	: "140 characters max"
			}).render(this.element.find('.placeholder-main'));

			new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    title 		: "Location",
			}).render(this.element.find('.placeholder-location'));

	        new CV.Image({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    title 		: "Logo / badge"
			}).render(this.element.find('.placeholder-logo'));

			new CV.Image({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    title 		: "Background"
			}).render(this.element.find('.placeholder-background'));

			//********** bottom ***********

            new CV.Button({
			    style   : 'primary full',
			    type    : 'single',
			    label   : 'Create Organization',
			    name    : 'buttonSend'
			}).render(this.element.find('.placeholder-send'));

        }

    }

});