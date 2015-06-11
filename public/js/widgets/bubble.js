Class(CV, 'Bubble').inherits(Widget)({

	ELEMENT_CLASS : 'cv-bubble-container',

    HTML : '\
        <div>\
            <div class="cv-bubble">\
                <div class="header">\
                    <h3 class="title"></h3>\
                    <div class="line"></div>\
                </div>\
                <div class="body-wrapper">\
                    <div class="body"></div>\
                </div>\
                <div class="arrow"><div></div></div>\
            </div>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        title           : null,
        action          : null,
        actionData      : null,
        width           : 300,
        anchorEl        : null,
        bubbleEl        : null,
        init : function(config){
            Widget.prototype.init.call(this, config);
            var bubble = this;
            this.bubbleEl = this.element.find('.cv-bubble');

            if( this.style ){ this.element.addClass(this.style) };
            if( this.width ){ this.bubbleEl.css('width', this.width + 'px') };

            this.element.find('.title').text(this.title);
            this.bodyElement = this.element.find('.body');

            var closeButton = this.appendChild(
                new CV.Button({
                    style   : '',
                    type    : 'single',
                    label   : 'X',
                    name    : 'closeButton'
                }).render(this.element.find('.header'))
            );

            new this.action({
                style   : '',
                type    : '',
                years   : this.actionData,
                name    : 'action',
            }).render(this.bodyElement);

            $(this.anchorEl).on('click', function(){
                bubble.show();
                return false;
            });
            $(this.closeButton.element).on('click', function(){
                bubble.hide();
            });
            this.element.bind('click', function(e){
                if( e.target !== this ){
                   return;
               }
                bubble.hide();
            });

        },

        position : function(){
            var bubble = this;
             //console.log(this.getOffset( this ).left);

            var anchorPos = this.getOffset(this.anchorEl);
            //this.position();
            this.bubbleEl.css('position', 'absolute');
            this.element.css('top', window.scrollY + 'px');


            this.bubbleEl.css({
                'position': 'absolute',
                'left': anchorPos.left - (bubble.width/2) + ($(bubble.anchorEl).width()/2),
                'top': anchorPos.top - (bubble.bubbleEl.height()) - (bubble.element.find('.arrow').height()/2)
                //'left': anchorPos.left - (bubble.width/2) + ($(bubble.anchorEl).width()/2),
                //'top': anchorPos.top - (bubble.element.height()) - (bubble.element.find('.arrow').height()/2)
            });
        },

        getOffset : function( el ) {
            var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        },

        show : function(){
            //$('body').css('overflow', 'hidden');
            this.render('body');
            this.element.show();

            this.position();


        },
        hide : function(){
            //$('body').css('overflow', 'auto');
            this.element.hide();
        }

    }

});



