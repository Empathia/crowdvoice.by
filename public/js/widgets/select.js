Class('Select').inherits(Widget)({

	ELEMENT_CLASS : 'cv-select',

    HTML : '\
        <div class="">\
            <div class="head">\
              <label></label>\
              <div class=count>3</div>\
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
        optionSelected  : null,
        checkedCount    : 0,
        labelEl         : null,
        optionsEl       : null,
        headEl          : null,
        bodyEl          : null,


        init : function(config){
            Widget.prototype.init.call(this, config);
            this.headEl = this.element.find('.head');
            this.bodyEl = this.element.find('.body');
            this.labelEl = this.element.find('label');
            this.optionsEl = this.element.find('ul');
            this.countEl = this.element.find('.count');

            if (this.style){ this.element.addClass(this.style) }
            if (this.label){ this.labelEl.text(this.label) };

            this.fillOptions();
            this.bindActions();
        },

        fillOptions : function(){
            if (this.type == "check"){
                this.element.addClass('check');
                this.countEl.css('opacity', 0);
            //    var optionEl = $('<li class="default"></li>');
            //    this.appendChild(new Check({
            //        label       : this.label,
            //        name        : this.name + '-' + 0,
            //    })).render(optionEl);
            //
            //    this.optionsEl.append(optionEl);
            //
            }

            for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {

                    if (this.type == "check"){

                        var optionEl = $('<li></li>');
                        var check = this.appendChild(new Check({
                            id          : key,
                            label       : this.options[key].name,
                            name        : this.name + '-' + key,
                        })).render(optionEl);

                        check.bind('checked', function(){
                            this.updateCount(true);
                        }.bind(this));
                        check.bind('unchecked', function(){
                            this.updateCount(false);
                        }.bind(this));

                    } else {
                        var optionEl = $('<li><div data-id="'+ key +'" class="option">'+this.options[key].name+'</div></li>');
                    }

                    if (this.options[key].active){
                        optionEl.addClass('selected');
                        this.labelEl.text(this.options[key].name);
                    }

                    if(this.options[key].sub){
                        var subOptions = this.options[key].sub;
                        var subListEl = $('<ul></ul>');

                        for (var subkey in subOptions) {
                            var subOptionEl = $('<li><div data-id="'+ subkey +'" class="option">'+subOptions[subkey].name+'</div></li>');
                            subListEl.append(subOptionEl);
                        }
                        optionEl.append(subListEl);
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

        updateCount : function(added){

            if (added){
                this.checkedCount++;
            } else {
                this.checkedCount--;
            }

            if(this.checkedCount){
                this.countEl.text(this.checkedCount);
                this.countEl.css('opacity', 1);
                this.element.addClass('following');
            } else {
                this.countEl.css('opacity', 0);
                this.element.removeClass('following');
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



