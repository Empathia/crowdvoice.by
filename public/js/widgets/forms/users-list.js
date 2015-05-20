Class('UsersList').inherits(Widget)({

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
        hasButton       : null,

        init : function(config){
            Widget.prototype.init.call(this, config);

            if(this.listTitle){
                this.element.find('.voice-title').text(this.users.length + ' contributors of "'+ this.listTitle + '"');
            } else {
                this.element.find('.voice-title').remove();
            }
            this.users.forEach(function(user){
                //new userMini( user ).render( this.element );
                var userDOM = '\
                    <div class="cv-user">\
                        <div class="img">\
                            <img src="' + user.img + '">\
                        </div>\
                        <div class="info">\
                            <span class="name">' + user.name + '</span> • \
                            <span class="username">' + user.user + '</span><br>\
                            <span class="location">' + user.location + '</span> • \
                            <span class="date">' + user.date + '</span>\
                        </div>\
                        <div class="action">\
                        </div>\
                    </div>\
                ';

                var userEl = $(userDOM);

                if(this.hasButton){
                    new Button({
                        style   : '',
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



