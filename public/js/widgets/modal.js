Class('Modal').inherits(Widget)({

	ELEMENT_CLASS : 'cv-modal-container',

    HTML : '\
        <div>\
            <div class="cv-modal">\
                <div class="header">\
                    <h3 class="title"></h3>\
                    <div class="line"></div>\
                </div>\
                <div class="body-wrapper">\
                    <div class="body"></div>\
                </div>\
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

            var modalElement = this.element.find('.cv-modal');

            if( this.style ){ this.element.addClass(this.style) };
            if( this.width ){
                modalElement.css('width', this.width + 'px');
            };

            this.element.find('.title').text(this.title);
            this.bodyElement = this.element.find('.body');

            this.appendChild(
                new Button({
                    style   : 'clean',
                    type    : 'single',
                    label   : 'X',
                    name    : 'actionButton'
                }).render(this.element.find('.header'))
            );

            if(this.action){
                new this.action({
                    style   : '',
                    type    : '',
                    years   : this.actionData,
                    name    : 'action'
                }).render(this.bodyElement);
            };

            setTimeout( function(){
                modalElement.css({
                    'margin-left': -1*(modalElement.width()/2),
                    'margin-top': -1*(modalElement.height()/2)
                });
            }, 0 );



        }

    }

});



