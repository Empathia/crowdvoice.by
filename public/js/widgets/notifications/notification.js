Class(CV, 'Notification').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-notification',

    create : function create(config) {
    	var notification = this;
    	var type = "";
    	var terms = config.action.split(' ');
    	terms.forEach(function(term){
    		type += notification.prototype.format.capitalizeFirstLetter(term)
    	});
        //var type = this.prototype.format.capitalizeFirstLetter(config.action);
        var notificationType = new window.CV['Notification' + type](config);

        notificationType.element.find('.cv-notification__close').on('click', function(){
        	notificationType.destroy();
        });

        return notificationType;
    },

    prototype : {
    }
});
