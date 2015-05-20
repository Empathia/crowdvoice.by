Class('CreateVoice').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-create-voice',

    HTML : '\
        <div>\
        <form>\
        <div class="-col-12">\
	        <div class="-col-3 -pr1 placeholder-image">\
	        	\
	        </div>\
	        <div class="-col-9 -pl1 placeholder-title placeholder-description">\
	        	\
	        </div>\
        </div>\
        <div class="-col-6 -pr1 placeholder-topics placeholder-twitter">\
        </div>\
        <div class="-col-6 -pl1 placeholder-rss">\
        	<div class="-col-12">\
        		<div class="-col-6 -pr1 placeholder-voice-type">\
        		\
        		</div>\
        		<div class="-col-6 -pl1 placeholder-voice-ownership">\
        		\
	        	</div>\
	        </div>\
        </div>\
        <div class="-col-12">\
	        <div class="-col-6 -pr1 placeholder-latitude">\
	        </div>\
	        <div class="-col-6 -pl1 placeholder-longitude">\
	        </div>\
        </div>\
        <div class="send -col-12"></div>\
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



	        new Image({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    title 		: "Background image (?)"
			}).render(this.element.find('.placeholder-image'));

	        new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    title 		: "Title (?)",
			    subTitle 	: "65 characters max"
			}).render(this.element.find('.placeholder-title'));

			new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    isArea 		: true,
			    hasTitle 	: true,
			    title 		: "Description (?)",
			    subTitle 	: "140 characters max"
			}).render(this.element.find('.placeholder-description'));

            //Checkbox
			var allOptions = {
			  "1": {name: 'Myself'},
			  "2": {name: 'Organization 01'},
			  "3": {name: 'Organization 02'},
			  "4": {name: 'Organization 03'}
			};

			new Select({
			    type    	: 'check',
			    label 		: 'Select at least one',
			    name  		: 'selectFollow',
			    style 		: 'full',
			    options		: allOptions,
			    hasTitle 	: true,
			    title 		: "Voice topics (?)"
			}).render(this.element.find('.placeholder-topics'));

			new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    title 		: "Twitter hashtags (?)"
			}).render(this.element.find('.placeholder-twitter'));

			new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    placeholder : 'Latitude',
			    hasTitle 	: true,
			    title 		: "Location (?)"
			}).render(this.element.find('.placeholder-latitude'));

			new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    placeholder : 'Longitude',
			    hasTitle 	: true
			}).render(this.element.find('.placeholder-longitude'));


			//voice types
			var allTypes = {
			  "1": {name: 'Open'},
			  "2": {name: 'Closed'},
			  "3": {name: 'Pending'}
			};
			new Select({
			  	label 		: 'Select one',
			  	name  		: 'select',
			  	style 		: 'full',
			  	options 	: allTypes,
			  	hasTitle 	: true,
		    	title 		: "Voice type (?)"
			}).render(this.element.find('.placeholder-voice-type'));

			//voice types
			var allUsers = {
			  "1": {name: 'Esra\'a Al Shafei'},
			  "2": {name: 'Heisen Berg'},
			  "3": {name: 'Cha Belo'}
			};
			new Select({
			  	label 		: 'Select one',
			  	name  		: 'select',
			  	style 		: 'full',
			  	options 	: allUsers,
			  	hasTitle 	: true,
		    	title 		: "Voice ownership (?)"
			}).render(this.element.find('.placeholder-voice-ownership'));

			new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    placeholder : '',
			    hasTitle 	: true,
			    title 		: 'Content from rss feed (?)'
			}).render(this.element.find('.placeholder-rss'));

			//********** bottom ***********
            var check = this.appendChild(new Check({
                id          : 1,
                label       : "Create Anonymously (?)",
                name        : "checkAnon"
            })).render(sendElement);

            new Button({
			    style   : 'primary full',
			    type    : 'single',
			    label   : 'Send',
			    name    : 'buttonSend'
			}).render(sendElement);


        }

    }

});