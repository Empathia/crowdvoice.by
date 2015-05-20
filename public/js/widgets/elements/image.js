Class('Image').inherits(Widget)({

	ELEMENT_CLASS : '',

    HTML : '\
        <div class="form-field">\
            <label><span></span></label>\
            <div class="cv-image">\
                <div class="placeholder"></div>\
                <div class="button">Replace</div>\
            </div>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        hasTitle        : false,
        title           : "",
        subTitle        : "",

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.imageEl = this.element.find('.cv-image');

            if (this.style){ this.inputEl.addClass(this.style) };

            if (this.hasTitle){
                this.element.find('label').text(this.title).append('<span>' + this.subTitle + '</span>');
            } else {
                this.element.find('label').remove();
            }

        }

    }

});



