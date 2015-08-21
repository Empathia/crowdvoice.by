Class(CV, 'SelectAccount').inherits(Widget)({

	ELEMENT_CLASS : '',

    HTML : '\
        <div class="form-field">\
            <label><span></span></label>\
            <div class="cv-select is-account">\
                <div class="account-info -inline-block">\
                    <img class="account-info-avatar -rounded" width="28" height="28" src="">\
                    <span class="account-info-name"></span>\
                    <span class="actions-wrapper -inline-block">\
                      <svg class="actions-dropdown-svg -block">\
                        <use xlink:href="#svg-arrow-down-2"></use>\
                      </svg>\
                    </span>\
                </div>\
                <div class="cv-select-mask"></div>\
                <div class="cv-select-body">\
                  <ul>\
                  </ul>\
                </div>\
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
        hasArrow        : true,
        hasTitle        : false,
        title           : "",
        subTitle        : "",
        accountImage    : null,
        accountName     : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            //this.headEl = this.element.find('.cv-select-head');
            this.headEl = this.element.find('.account-info');

            this.bodyEl = this.element.find('.cv-select-body');
            this.selectEl = this.element.find('.cv-select');
            this.maskEl = this.element.find('.cv-select-mask');

            this.labelEl = this.element.find('.label');
            this.optionsEl = this.element.find('ul');
            this.countEl = this.element.find('.count');

            this.element.find('.account-info-avatar').attr('src', this.accountImage);
            this.element.find('.account-info-name').text(this.accountName);

            if(!this.hasArrow){
                this.selectEl.addClass('no-arrow');
            }
            if (this.hasTitle){
                this.element.find('label').text(this.title).append('<span>' + this.subTitle + '</span>');
            } else {
                this.element.find('label').remove();
            }

            if (this.style){ this.selectEl.addClass(this.style) };
            if (this.label){ this.labelEl.text(this.label) };

            this.fillOptions();
            this.bindActions();
        },

        fillOptions : function(){
            if (this.type == "check"){
                this.element.addClass('check');
                this.countEl.css('opacity', 0);
            }

            for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {

                    if (this.type == "check"){

                        var optionEl = $('<li></li>');
                        var check = this.appendChild(new CV.Check({
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
                        var url = "";
                        if (this.options[key].url){
                            url = 'url="'+this.options[key].url+'"';
                        }
                        var optionEl = $('<li ' + url + '><div data-id="'+ key +'" class="option" >'+this.options[key].name+'</div></li>');
                    }

                    if (this.options[key].active){
                        optionEl.addClass('selected');
                        this.labelEl.text(this.options[key].name);
                    }

                    if(this.options[key].sub){
                        optionEl.addClass('has-children');
                        var subOptions = this.options[key].sub;
                        var subListEl = $('<ul></ul>');

                        for (var subkey in subOptions) {
                            var url = "";
                            if (subOptions[subkey].url){
                                url = 'url="'+subOptions[subkey].url+'"';
                            }
                            var subOptionEl = $('<li '+url+'><div data-id="'+ subkey +'" class="option" >'+subOptions[subkey].name+'</div></li>');
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

            this.maskEl.on('click', function(){
                this.close();
            }.bind(this));

            var that = this;
            if (this.type != "check"){
                this.element.find('li').bind('click', function(el){
                    if ($(this).hasClass("has-children")){
                        return;
                    }

                    if (this.hasAttribute("url")){
                        //console.log(this.getAttribute("url"));
                        window.location.href = this.getAttribute("url");
                    }else{
                        that.element.find('li').removeClass('selected');
                        that.optionSelected = $(this).find('> div').attr('data-id');
                        if(that.type != 'icon'){
                            that.labelEl.text($(this).find('> div').text());
                            $(this).addClass('selected');
                        }
                        that.close();
                    }

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
                //this.countEl.css('opacity', 1);
                this.selectEl.addClass('following');
            } else {
                //this.countEl.css('opacity', 0);
                this.selectEl.removeClass('following');
            }

        },

        open : function(){
            this.bodyEl.toggle();
            this.element.toggleClass('active');
            this.maskEl.show();
        },

        close : function(){
            this.bodyEl.toggle();
            this.element.toggleClass('active');
            this.maskEl.hide();
        }




    }

});
