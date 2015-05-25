Class(CV, 'Button').inherits(Widget)({

	ELEMENT_CLASS : 'cv-button',

    HTML : '\
        <button></button>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        label           : null,
        options         : null,
        actionType      : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            var button = this;
            if (this.style){ this.element.addClass(this.style) };
            if (this.type == "single" || this.type == null){
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
            this.element.addClass(this.type);
            var optionsEl = $('<div class="columns"><span class="col-1-2"></span><span class="col-1-2"></span></div>');
            for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                    optionsEl.find('span:nth-child('+ key +')').text(this.options[key].name);
                }
            }
            this.element.append(optionsEl);
        },

        createMultiple : function(){
            this.element.addClass(this.type);
            var optionsEl = $('<div class="columns"></div>');

            for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                    var activeClass = "";
                    if (this.options[key].active){
                        activeClass = "active";
                    }
                    optionsEl.append('<span class="col-1-3 '+ activeClass +'">' + this.options[key].name + '</div>');
                }
            }

            optionsEl.find('span').on('click', function(){
                $(this).parent().find('span').removeClass('active');
                $(this).addClass('active');
            });

            this.element.append(optionsEl);
        }

    }

});
