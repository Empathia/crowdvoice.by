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
        modalElement    : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            var modal = this;
            this.modalElement = this.element.find('.cv-modal');

            if( this.style ){ this.element.addClass(this.style) };
            if( this.width ){
                this.modalElement.css('width', this.width + 'px');
            };

            this.element.find('.title').text(this.title);
            this.bodyElement = this.element.find('.body');

            var closeButton;
            this.appendChild(
                closeButton = new Button({
                    style   : 'clean',
                    type    : 'single',
                    label   : 'X',
                    name    : 'actionButton'
                }).render(this.element.find('.header'))
            );
            closeButton.bind('click', function(){
                this.hide();
            }.bind(this));

            this.element.bind('click', function(e){
                if( e.target !== this ){
                   return;
               }
                modal.hide();
            });

            if(this.action){
                new this.action({
                    style   : '',
                    type    : '',
                    years   : this.actionData,
                    name    : 'action'
                }).render(this.bodyElement);
            };

        },

        show : function(){
            $('body').css('overflow', 'hidden');
            this.render('body');
            this.element.show();
            this.modalElement.css({
                'margin-left': -1*(this.modalElement.width()/2),
                'margin-top': -1*(this.modalElement.height()/2)
            });
        },
        hide : function(){
            $('body').css('overflow', 'auto');
            this.element.hide();
        }

    }

});



