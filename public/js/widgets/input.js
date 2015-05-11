Class('Input').inherits(Widget)({

	ELEMENT_CLASS : 'cv-input',

    HTML : '\
        <div>\
            <svg class="search-svg">\
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-search"></use>\
            </svg>\
        </div>\
    ',

    INPUT_ELEMENT : '<input type="text">',

    AREA_ELEMENT : '<textarea rows="" cols=""></textarea>',

    prototype        : {
        type            : null,
        style           : null,
        placeholder     : null,
        isArea          : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            if (this.style){ this.element.addClass(this.style) };
            if (this.type == "search"){
                //add icon
                this.element.find('svg').show();
            }
            if (!this.isArea){
                this.element.append(this.constructor.INPUT_ELEMENT);
                if (this.placeholder){
                    this.element.find('input').attr('placeholder', this.placeholder);
                }
            } else {
                this.element.addClass('is-area');

                this.element.append(this.constructor.AREA_ELEMENT);

            }




            //this.labelEl = this.element.find('label');

            //if (this.label){ this.labelEl.text(this.label) };

        }

    }

});



