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
            var button = this;

            if (this.type == "single" || this.type == null){
                if (this.style){
                    this.element.addClass(this.style)
                };
                this.element.text(this.label);
            }

            if (this.actionType){
                this.element.addClass(this.actionType);
            }

            if(this.type == "twice"){
                this.createTwice();
            }
            if(this.type == "multiple"){
                this.createMultiple();
            }
            this.element.on('click', function(){
                button.dispatch('click');
            })

        },

        createTwice : function(){
            this.element = $(this.constructor.BUTTON_GROUP);
            this.element.addClass(this.type);
            var buttons = this;

            for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                    var buttonEl = $('<button class="cv-button"></button>');
                    buttonEl.text(this.options[key].name);
                    buttonEl.addClass(buttons.style);
                     this.element.append(buttonEl);
                }
            }

        },

        createMultiple : function(){

            this.element = $(this.constructor.BUTTON_GROUP);
            this.element.addClass(this.type);
            var buttons = this;

            for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                    var buttonEl = $('<button class="cv-button"></button>');
                    buttonEl.text(this.options[key].name);
                    buttonEl.addClass(buttons.style);
                     this.element.append(buttonEl);
                }
            }

            //this.element.addClass(this.type);
            //var optionsEl = $('<div class="columns"></div>');
//
            //for (var key in this.options) {
            //    if (this.options.hasOwnProperty(key)) {
            //        var activeClass = "";
            //        if (this.options[key].active){
            //            activeClass = "active";
            //        }
            //        optionsEl.append('<span class="col-1-3 '+ activeClass +'">' + this.options[key].name + '</div>');
            //    }
            //}
//
            //optionsEl.find('span').on('click', function(){
            //    $(this).parent().find('span').removeClass('active');
            //    $(this).addClass('active');
            //});

            //this.element.append(optionsEl);
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
