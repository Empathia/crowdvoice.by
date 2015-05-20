Class('Block').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-report',

    HTML : '\
        <div>\
	        <form>\
		        <div class="-col-12 placeholder-main center">\
		        <p>Blocking means that you will not be able to find any information, communicate with or perform any actions related to this user or organization. It is reversible via your account settings.</p>\
		        <br>\
		        <p><b>Are you sure you want to block this user/organization?</b></p>\
		        <br>\
		        </div>\
		        <div class="-col-12">\
		        	 <div class="-col-6 -pr1 placeholder-dont"></div>\
		        	 <div class="-col-6 -pl1 placeholder-block"></div>\
		        </div>\
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




			//********** bottom ***********
			new Button({
			    style   : 'full',
			    type    : 'single',
			    label   : 'Don\'t Block',
			    name    : 'buttonSend'
			}).render(this.element.find('.placeholder-dont'));

            new Button({
			    style   : 'primary full',
			    type    : 'single',
			    label   : 'Block',
			    name    : 'buttonSend'
			}).render(this.element.find('.placeholder-block'));

        }

    }

});