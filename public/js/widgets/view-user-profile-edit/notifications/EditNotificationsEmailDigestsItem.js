Class(CV, 'EditNotificationsEmailDigestsItem').inherits(Widget)({
    ELEMENT_CLASS : '-clearfix',
    HTML : '\
        <div>\
            <div class="notifications-email-digests__options -float-right"></div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.optionsWrapper = this.el.querySelector('.notifications-email-digests__options');

            if (this.name) {
                this._unique = this.name + '_' + Math.random().toString().replace(/\./,'');
            } else {
                this._unique = Math.random().toString().replace(/\./,'');
            }

            this.appendChild(new CV.UI.Checkbox({
                name : 'checkbox',
                data : {
                    label: this.data.label,
                    checked : this.data.checked
                }
            })).render(this.el);

            this.data.options.forEach(function(option) {
                this.appendChild(new CV.UI.Radio({
                    name : option.label + 'Radio',
                    className : '-mr1',
                    data : {
                        label: option.label,
                        checked: option.checked,
                        attr : {
                            name: this._unique,
                        }
                    },
                })).render(this.optionsWrapper);
            }, this);
        }
    }
});
