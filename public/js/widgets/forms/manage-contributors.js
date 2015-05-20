Class('ManageContributors').inherits(Widget)({

	ELEMENT_CLASS : 'cv-form-manage-contributors',

    HTML : '\
        <div>\
        <form>\
        <div class="-col-12 placeholder-main">\
        </div>\
        <div class="-col-12 placeholder-users"></div>\
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


			new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasTitle 	: true,
			    placeholder : 'Search users...',
			    title 		: "Invite users to contribute (?)"
			}).render(this.element.find('.placeholder-main'));

			new Input({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    isArea 		: true,
			    hasTitle 	: true,
			    title 		: "Write a message"
			}).render(this.element.find('.placeholder-main'));

			var users = [
			  {
			    img : '/img/sample/covers/feat-00.jpg',
			    name: 'Carl J. Kramer',
			    user: '@carlKrameR',
			    location : 'Atlanta, GA',
			    date : 'Contributing since Feb, 2015',
			  },
			  {
			    img : '/img/sample/covers/feat-00.jpg',
			    name: 'Roosbelinda Cárdenas',
			    user: '@Ross006',
			    location : 'Stockton, CA',
			    date : 'Contributing since Jul, 2014',
			  },
			  {
			    img : '/img/sample/covers/feat-00.jpg',
			    name: 'Carl J. Kramer',
			    user: '@carlKrameR',
			    location : 'Atlanta, GA',
			    date : 'Contributing since Feb, 2015',
			  },
			  {
			    img : '/img/sample/covers/feat-00.jpg',
			    name: 'Roosbelinda Cárdenas',
			    user: '@Ross006',
			    location : 'Stockton, CA',
			    date : 'Contributing since Jul, 2014',
			  }
			];

			new UsersList({
			    type    	: '',
			    name  		: '',
			    style 		: '',
			    hasButton	: true,
			    users 		: users,
			    listTitle 	: "The continuos effects of the fukushima disaster",
			}).render(this.element.find('.placeholder-users'));



        }

    }

});







