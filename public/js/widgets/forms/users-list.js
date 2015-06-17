Class(CV, 'UsersList').inherits(Widget)({

	ELEMENT_CLASS : 'cv-userslist',

    HTML : '\
        <div>\
            <div class="voice-title"></div>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        users           : null,
        listTitle       : null,
        dateTitle       : null,
        hasButton       : null,

        init : function(config){
            Widget.prototype.init.call(this, config);

            var usersList = this;
            this.element.find('.voice-title').text( this.listTitle.replace('{count}', this.users.length) );

            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            this.users.forEach(function(user){
                //new userMini( user ).render( this.element );
                var userDate = new Date(user.author.created_at);

                var prettyDate = months[userDate.getUTCMonth()] + ', ' + userDate.getUTCFullYear();

                var userDOM = '\
                    <div class="cv-user">\
                        <div class="img">\
                            <img src="' + user.author.avatar + '">\
                        </div>\
                        <div class="info">\
                            <span class="name">' + user.author.full_name + '</span> • \
                            <span class="username">' + user.author.username + '</span><br>\
                            <span class="location">' + user.author.location + '</span> • \
                            <span class="date">' + usersList.dateTitle + ' ' + prettyDate + '</span>\
                        </div>\
                        <div class="action">\
                        </div>\
                    </div>\
                ';

                var userEl = $(userDOM);

                if(this.hasButton){
                    new CV.Button({
                        style   : 'tiny',
                        type    : 'single',
                        label   : 'Remove',
                        name    : 'buttonRemove'
                    }).render(userEl.find('.action'));
                }

                this.element.append(userEl);

            }.bind(this));

        }

    }

});



