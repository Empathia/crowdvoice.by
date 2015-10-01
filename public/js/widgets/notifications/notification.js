Class(CV, 'Notification').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-notification',

    create : function create(config, id) {
    	var notification = this;
    	var type = "";
    	var terms = config.action.split(' ');
    	terms.forEach(function(term){
    		type += notification.prototype.format.capitalizeFirstLetter(term)
    	});
        //var type = this.prototype.format.capitalizeFirstLetter(config.action);
        var token = $('meta[name="csrf-token"]').attr('content');

        var notificationType = new window.CV['Notification' + type](config);
        notificationType.element.find('.cv-notification__close').on('click', function(){
            console.log(id);
        	notificationType.destroy();
            $.ajax({
                type : 'POST',
                url : '/' + currentPerson.profileName + '/notifications/markAsRead?_method=DELETE',
                headers : {'csrf-token' : token },
                data : {
                    notificationId: id
                },
                success : function success(data) {
                    console.log('deleted');
                },
                error : function error(err) {
                    console.log(err);
                }
          });

        });

        return notificationType;
    },

    prototype : {
    }
});
