Class(CV, 'EditNotificationsNotifyMeItem').inherits(Widget)({
    ELEMENT_CLASS : '-clearfix',
    HTML : '\
        <div>\
            <span class="notifications-notify-me__label"></span>\
            <div class="notifications-notify-me__options -float-right"></div>\
        </div>\
    ',

    prototype : {
        data : {
            label : null,
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.optionsWrapper = this.el.querySelector('.notifications-notify-me__options');

            this.el.querySelector('.notifications-notify-me__label').textContent = this.data.label;

            this.data.options.forEach(function(option) {
                this.appendChild(new CV.UI.Checkbox({
                    name : option.label + 'Checkbox',
                    className : '-mr1',
                    data : {
                        label: option.label,
                        checked: option.checked
                    },
                })).render(this.optionsWrapper);
            }, this);
        }
    }
});
