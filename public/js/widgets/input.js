Class('Input').inherits(Widget)({

	ELEMENT_CLASS : 'cv-input',

    HTML : '\
        <div>\
            <svg class="search-svg">\
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-search"></use>\
            </svg>\
            <input type="text">\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        placeholder     : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            if (this.type == "search"){
                //add icon
                this.element.find('svg').show();
            }
            if (this.placeholder){
                this.element.find('input').attr('placeholder', this.placeholder);
            }

            //this.labelEl = this.element.find('label');

            //if (this.label){ this.labelEl.text(this.label) };

        }

    }

});



