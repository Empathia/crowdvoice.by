Class(CV, 'Notification').inherits(Widget)({

	ELEMENT_CLASS : 'cv-notification',

    HTML : '\
        <div>\
            <div class="notification-user">\
                <span class="image"><img src="/img/sample/covers/feat-00.jpg"></span>\
                <span class="info"><a href="#"><b>Esra\'a Al Shafei</b></a> followed you.</span>\
            </div>\
            <div class="notification-text">\
                <p>Continued Effects of the Fukushima Disaster</p>\
                <span>@IPPF</span>\
                <a href="#">Action Link</a>\
            </div>\
            <div class="close">\
            </div>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        title           : null,
        action          : null,
        actionData      : null,
        width           : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            if( this.style ){ this.element.addClass(this.style) };
            if( this.width ){ this.element.css('width', this.width + 'px') };

            this.element.find('.title').text(this.title);
            this.bodyElement = this.element.find('.body');

            this.appendChild(
                new CV.Button({
                    style   : 'clean',
                    type    : 'single',
                    label   : 'X',
                    name    : 'actionButton'
                }).render(this.element.find('.header'))
            );

            //new this.action({
            //    style   : '',
            //    type    : '',
            //    years   : this.actionData,
            //    name    : 'action',
            //}).render(this.bodyElement);

        }

    }

});



