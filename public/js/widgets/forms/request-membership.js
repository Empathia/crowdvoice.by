Class(CV, 'RequestMembership').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-request-membership',

    HTML : '<div></div>',

    FORM : '\
	        <form>\
		        <div class="-col-12 placeholder-main">\
		        </div>\
		        <div class="-col-12 placeholder-send"></div>\
	        </form>\
    ',

    SENT : '\
        <div class="sent-form">\
        <h2>Thanks for the interest to be a member!</h2>\
        <p>We will review your request as soon as possible and may contact with a response.</p>\
        <br>\
        <button class="cv-button ok small">Ok</button>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        voices          : null,

        init : function(config){
            Widget.prototype.init.call(this, config);

			this.setup();
			console.log(currentOrganization);
        },

        setup : function (){

        	this.element.empty();
            this.element.append(this.constructor.FORM);

        	new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    isArea 		: true,
			    hasTitle 	: true,
			    title 		: "Briefly state why would you be a valuable member for this Organization."
			}).render(this.element.find('.placeholder-main'));

            var formButton = new CV.Button({
			    style   : 'primary full',
			    type    : 'single',
			    label   : 'Submit Request',
			    name    : 'buttonSend'
			}).render(this.element.find('.placeholder-send'));

			formButton.element.click(function(e){
                e.preventDefault();
                this.sendMessage();
            }.bind(this));

        },

        sendMessage : function(){
        	var sendmessage = this;

            var textData = {
            	orgId 	: currentOrganization.id,
                message : this.element.find('form textarea').val()
            }

            $.ajax({
                method : 'POST',
                url : '/' + currentOrganization.profileName + '/requestMembership',
                headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
                data : textData,
                success : function(data) {
                	console.log(data);
                    sendmessage.element.find('form').remove();
                    sendmessage.element.append(sendmessage.constructor.SENT);
                    sendmessage.element.find('button').on('click', function(){
                        sendmessage.dispatch('close');
                        sendmessage.setup();
                    });
                },
                error : function(data) {
                  console.error(data)
                }
            });

        }

    }

});