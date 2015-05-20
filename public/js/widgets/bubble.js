Class(CV, 'Bubble').inherits(Widget)({

	ELEMENT_CLASS : 'cv-bubble',

    HTML : '\
        <div>\
            <div class="header">\
                <h3 class="title"></h3>\
                <div class="line"></div>\
            </div>\
            <div class="body-wrapper">\
                <div class="body"></div>\
            </div>\
            <div class="arrow"><div></div></div>\
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

            new this.action({
                style   : '',
                type    : '',
                years   : this.actionData,
                name    : 'action',
            }).render(this.bodyElement);

        }

    }

});



