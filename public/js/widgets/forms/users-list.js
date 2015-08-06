Class(CV, 'UsersList').inherits(Widget)({

	ELEMENT_CLASS : 'cv-userslist',

    HTML : '\
        <div>\
            <div class="form-field"><label class="voice-title"></label></div>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        users           : null,
        listTitle       : null,
        dateTitle       : null,
        hasButton       : null,
        actionLabel     : "Leave",
        action          : null,

        init : function(config){
            Widget.prototype.init.call(this, config);

            var usersList = this;
            var baseTitle = this.listTitle.replace('{count}', this.users.length)
            this.element.find('.voice-title').text( baseTitle );

            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var usersRemoved = 0;

            this.users.forEach(function(user){
                //new userMini( user ).render( this.element );
                var userDate = new Date(user.createdAt);

                var prettyDate = months[userDate.getUTCMonth()] + ', ' + userDate.getUTCFullYear();

                var userDOM = '\
                    <div class="cv-user">\
                        <div class="img">\
                            <img src="' + user.images.card.url + '">\
                        </div>\
                        <div class="info">\
                            <span class="name">' + user.name + '</span><br>\
                            <span class="username">@' + user.profileName + '</span>\
                        </div>\
                        <div class="action">\
                        </div>\
                    </div>\
                ';

                var userEl = $(userDOM);

                if(this.hasButton){

                    var actionButton = new CV.Button({
                        style   : 'tiny',
                        type    : 'single',
                        label   : this.actionLabel,
                        name    : 'buttonLeave'
                    }).render(userEl.find('.action'));

                    actionButton.element.on('click', function(){
                      usersList.action(user.id);
                      $(this).closest('.cv-user').remove();
                      usersRemoved++;
                      baseTitle = usersList.listTitle.replace('{count}', usersList.users.length - usersRemoved);
                      usersList.element.find('.voice-title').text( baseTitle );
                    });

                }

                this.element.append(userEl);

            }.bind(this));

        }

    }

});



