Class('Check').inherits(Widget)({

	ELEMENT_CLASS : 'cv-check',

    HTML : '\
        <div>\
            <input type="checkbox">\
            <label></label>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        label           : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.labelEl = this.element.find('label');

            if (this.label){ this.labelEl.text(this.label) };

        }

    }

});



