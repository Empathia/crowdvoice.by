Class(CV, 'Button').inherits(Widget)({

	ELEMENT_CLASS : 'cv-button',

    HTML : '\
        <button></button>\
    ',

    BUTTON_GROUP : '\
        <div class="cv-button-group"></div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        label           : null,
        options         : null,
        actionType      : null,
        enabled         : true,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            var button = this;

            if (this.type == "single" || this.type == null){
                if (this.style){
                    this.element.addClass(this.style);
                }
                this.element.text(this.label);
            }

            if (this.actionType){
                this.element.addClass(this.actionType);
            }

            if(this.type == "multiple"){
                this.createMultiple();
            }
            //this.element.on('click', function(){
            //    button.dispatch('click');
            //});

        },

        createMultiple : function(){

            this.element = $(this.constructor.BUTTON_GROUP);

            if(Object.keys(this.options).lenght == 2){
                this.element.addClass('twice');
            } else {
                this.element.addClass('multiple');
            }

            var buttons = this;

            for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                    var buttonEl = $('<button class="cv-button"></button>');

                    this[this.options[key].name.toLowerCase()] = buttonEl;

                    buttonEl.text(this.options[key].label);
                    buttonEl.addClass(buttons.style);
                     this.element.append(buttonEl);
                }
            }

        },
        enable : function(){
            this.enabled = true;
            this.element.removeClass('disabled');
            this.element.attr('disabled', false);
        },
        disable : function(){
            this.enabled = false;
            this.element.addClass('disabled');
            this.element.attr('disabled', true);
        }

    }

});
