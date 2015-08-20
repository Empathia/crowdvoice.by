Class(CV, 'ManageContributors').inherits(Widget)({
    ELEMENT_CLASS : 'cv-form-manage-contributors',
    HTML : '\
        <div>\
            <form>\
                <div class="-col-12 placeholder-main"></div>\
                <div class="-col-12 placeholder-users"></div>\
            </form>\
        </div>',

    prototype : {
        users : null,
        init : function(config){
            Widget.prototype.init.call(this, config);

            new CV.InputButton({
                type    	: '',
                name  		: '',
                style 		: '',
                hasTitle 	: true,
                placeholder : 'Search users...',
                title 		: "Invite users to contribute (?)",
                buttonLabel : "Invite"
            }).render(this.element.find('.placeholder-main'));

            new CV.Input({
                type    	: '',
                name  		: '',
                style 		: '',
                isArea 		: true,
                hasTitle 	: true,
                title 		: "Write a message"
            }).render(this.element.find('.placeholder-main'));

            new CV.UsersList({
                type    		: '',
                name  			: '',
                style 			: '',
                hasButton		: true,
                users 			: this.users,
                listTitle 		: '{count} Contributors of "The continuos effects of the fukushima disaster"',
                dateTitle 		: "Contributing Since",
            }).render(this.element.find('.placeholder-users'));
        }
    }
});
