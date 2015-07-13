Class(CV, 'SendMessage').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-send-messages',

    HTML : '\
        <div></div>\
    ',

    FORM : '\
        <form>\
	        <div class="-col-12 placeholder-main">\
	        </div>\
	        <div class="-col-12 placeholder-send"></div>\
        </form>\
    ',

    SENT : '\
        <div class="sent-form">\
        <h2>Message Sent!</h2>\
        <p>The partner will recieve this message in his/her inbox.</p>\
        <br>\
        <button class="cv-button small">Close</button>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        voices          : null,
        data 			: null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            //var sendElement = this.element.find('.send');
        	//var sendmessage = this;

			this.setup();

        },

        setup : function(){
        	this.element.empty();
		    this.element.append(this.constructor.FORM);
		    new CV.Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    isArea 		: true,
			    hasTitle 	: true,
			    title 		: "Briefly write a message."
			}).render(this.element.find('.placeholder-main'));

            var formButton = new CV.Button({
			    style   : 'primary full',
			    type    : 'single',
			    label   : 'Send Message',
			    name    : 'buttonSend'
			}).render(this.element.find('.placeholder-send'));

            formButton.element.click(function(e){
  				e.preventDefault();
  				this.sendMessage();
			}.bind(this));
        },

        sendMessage : function(){

        	var sendmessage = this;
        	tmpdata =  {
		        	type : 'message',
					senderEntityId : sendmessage.data.senderEntityId,
					receiverEntityId : sendmessage.data.receiverEntityId,
					message : sendmessage.element.find('textarea').val()
		        }
                    console.log(tmpdata);

        	$.ajax({
		        type: "POST",
		        url: '/' + sendmessage.data.profileName + '/messages',
		        headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
		        data: {
		        	type : 'message',
					senderEntityId : sendmessage.data.senderEntityId,
					receiverEntityId : sendmessage.data.receiverEntityId,
					message : sendmessage.element.find('textarea').val()
		        },
		        success: function(data) {
		            //console.log('Message sent!');
		            sendmessage.element.find('form').remove();
		            sendmessage.element.append(sendmessage.constructor.SENT);
		            sendmessage.element.find('button').on('click', function(){
		                sendmessage.dispatch('close');
		                sendmessage.setup();
		            });

		        }
		    });

        }

    }

});








