Class(CV, 'InputSearch').inherits(Widget)({

	ELEMENT_CLASS : '',

    HTML : '\
        <div class="form-field cv-input-search">\
            <label><span></span></label>\
            <div class="-clear-after">\
            <div class="-col-10">\
                <div class="cv-input">\
                    <input type="text">\
                </div>\
            </div>\
            <div class="-col-2">\
                <button class="cv-button primary">Search</button>\
            </div>\
            </div>\
        </div>\
    ',

    INPUT_ELEMENT : '',

    prototype        : {
        type            : null,
        style           : null,
        placeholder     : null,
        isArea          : null,
        hasTitle        : false,
        title           : "",
        subTitle        : "",
        buttonLabel     : "",

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.inputEl = this.element.find('.cv-input');

            if (this.style){ this.inputEl.addClass(this.style) };

            if (this.placeholder){
                this.inputEl.find('input').attr('placeholder', this.placeholder);
            }

            if (this.hasTitle){
                this.element.find('label').text(this.title).append('<span>' + this.subTitle + '</span>');
            } else {
                this.element.find('label').remove();
            }

            if( this.buttonLabel){
                this.element.find('button').text(this.buttonLabel);
            }

        }

    }

});



