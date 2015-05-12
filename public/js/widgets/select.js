// Create a simple Class

Class('Select').inherits(Widget)({

	ELEMENT_CLASS : 'cv-select',

    HTML : '\
        <div class="">\
            <div class="head">\
              <label></label>\
            </div>\
            <div class="body">\
              <ul>\
              </ul>\
            </div>\
        </div>\
    ',

    prototype        : {
        type            : null,
        style           : null,
        label           : null,
        options         : null,
        labelEl         : null,
        optionsEl       : null,
        headEl          : null,
        bodyEl          : null,
        optionSelected  : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.headEl = this.element.find('.head');
            this.bodyEl = this.element.find('.body');
            this.labelEl = this.element.find('label');
            this.optionsEl = this.element.find('ul');

            if (this.style){ this.element.addClass(this.style) }
            if (this.label){ this.labelEl.text(this.label) };

            //this.filtersElement = document.querySelector(".filters");
            //console.log('init ScheduleController');
            //console.log(this.scheduleElement);
            this.fillOptions();
            this.bindActions();
        },

        fillOptions : function(){
            //var optionEl = $('<li><div class="option"></div></li>').last().clone();
            if (this.type == "check"){

                var optionEl = $('<li class="default"></li>');
                this.appendChild(new Check({
                    label       : this.label,
                    name        : this.name + '-' + 0,
                })).render(optionEl);

                this.optionsEl.append(optionEl);

            }

            for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {

                    if (this.type == "check"){

                        var optionEl = $('<li></li>');
                        this.appendChild(new Check({
                            label       : this.options[key].name,
                            name        : this.name + '-' + key,
                        })).render(optionEl);

                    } else {
                        var optionEl = $('<li><div data-id="'+ key +'" class="option">'+this.options[key].name+'</div></li>');
                    }

                    if (this.options[key].active){
                        optionEl.addClass('selected');
                        this.labelEl.text(this.options[key].name);
                    }
                    this.optionsEl.append(optionEl);
                }
            }

            if (this.type == "check" && Object.keys(this.options).length > 9){
                this.bodyEl.css('min-width', '280px');
                this.optionsEl.find('li').css({ 'width' : '50%','float' : 'left', 'margin': '0px' });
                this.optionsEl.find('li.default').css({ 'width' : '100%'});
                this.optionsEl.find('li .check').css({ 'margin' : '4px auto'});

            }

        },

        bindActions : function(){
            this.headEl.on('click', function(){
                this.open();
            }.bind(this));

            var that = this;
            if (this.type != "check"){
                this.element.find('li').bind('click', function(el){
                    that.element.find('li').removeClass('selected');
                    that.optionSelected = $(this).find('> div').attr('data-id');
                    if(that.type != 'icon'){
                        that.labelEl.text($(this).find('> div').text());
                        $(this).addClass('selected');
                    }
                    that.close();
                });
            }
        },

        open : function(){
            this.bodyEl.toggle();
            this.element.toggleClass('active');
        },

        close : function(){
            this.bodyEl.toggle();
            this.element.toggleClass('active');
        }

    }

});



