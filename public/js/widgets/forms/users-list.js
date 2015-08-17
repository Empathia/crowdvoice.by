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
        isOwner         : null,

        init : function(config){
            Widget.prototype.init.call(this, config);

            var usersList = this;
            var baseTitle = this.listTitle.replace('{count}', this.users.length);
            this.element.find('.voice-title').text( baseTitle );

            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var usersRemoved = 0;

            this.users.forEach(function(entity){
                var renderButton = true;

                if (usersList.isOwner){
                  currentPerson.ownedOrganizations.forEach(function(org){
                    if (org.id == entity.id){
                      renderButton = false;
                    }
                  });
                }
                var userDate = new Date(entity.createdAt);
                var prettyDate = months[userDate.getUTCMonth()] + ', ' + userDate.getUTCFullYear();
                var image = (entity.images.card && entity.images.card.url) || '/img/placeholder-image.png';

                var userDOM = '\
                    <div class="cv-user">\
                        <div class="img">\
                            <img src="' + image + '">\
                        </div>\
                        <div class="info">\
                            <span class="name">' + entity.name + '</span><br>\
                            <span class="username">@' + entity.profileName + '</span>\
                        </div>\
                        <div class="action">\
                        </div>\
                    </div>\
                ';

                var userEl = $(userDOM);

                if(this.hasButton && renderButton){

                    var actionButton = new CV.Button({
                        style   : 'tiny',
                        type    : 'single',
                        label   : this.actionLabel,
                        name    : 'buttonLeave'
                    }).render(userEl.find('.action'));

                    actionButton.element.on('click', function(){
                      usersList.action(entity.id);
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



