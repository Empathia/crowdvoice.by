Class(CV, 'InputButton').inherits(Widget)({

	ELEMENT_CLASS : '',

    HTML : '\
        <div class="form-field cv-input-search ">\
            <label><span></span></label>\
            <div class="-clear-after -rel ib-container">\
            </div>\
        </div>\
    ',

    INPUT_ELEMENT : '\
        <div class="cv-input">\
            <input type="text">\
        </div>\
        <button class="cv-button">Search</button>\
    ',

    AREA_ELEMENT : '\
        <div class="cv-input is-area">\
            <textarea rows="" cols=""></textarea>\
        </div>\
        <button class="cv-button primary">Reply</button>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        placeholder     : null,
        isArea          : false,
        hasTitle        : false,
        title           : "",
        subTitle        : "",
        buttonLabel     : "",

        init : function(config){
            Widget.prototype.init.call(this, config);

            if (this.hasTitle){
                this.element.find('label').text(this.title).append('<span>' + this.subTitle + '</span>');
            } else {
                this.element.find('label').remove();
            }

            if (this.isArea){
                this.element.find('.ib-container').append($(this.constructor.AREA_ELEMENT));
            } else {
                this.element.find('.ib-container').append($(this.constructor.INPUT_ELEMENT));
            }

            this.inputEl = this.element.find('.cv-input');
            this.buttonEl = this.element.find('button');

            if (this.style){
                this.inputEl.addClass(this.style);
                this.buttonEl.addClass(this.style);
            };

            if (this.placeholder){
                this.inputEl.find('input').attr('placeholder', this.placeholder);
            }

            if( this.buttonLabel){
                this.element.find('button').text(this.buttonLabel);
            }

            setTimeout(function(){
                this.element.find('.cv-input').outerWidth( this.element.width() - this.element.find('button').outerWidth() );
                //this.element.find('.cv-input').css( 'padding-right', (this.element.width() - this.element.find('button').outerWidth() ) );

            }.bind(this), 0);


        },

        recalculate : function(){
            this.element.find('.cv-input').outerWidth( this.element.width() - this.element.find('button').outerWidth() );
            //this.element.find('.cv-input').css( 'padding-right', (this.element.width() - this.element.find('button').outerWidth() ) );
        }
    }

});



