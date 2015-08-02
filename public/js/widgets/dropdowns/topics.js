Class(CV.UI, 'DropdownTopics').inherits(Widget)({
    HTML : '\
        <div class="ui-form-field">\
            <label class="-block">\
                <span class="ui-input__label -upper -font-bold">Voice Topics</span>\
            </label>\
        </div>\
    ',

    prototype : {
        _options : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._options = [];

            this.appendChild(
                new CV.Dropdown({
                    name : 'dropdown',
                    label : 'Select at least one',
                    showArrow : true,
                    className : 'dropdown-topics ui-dropdown-styled -lg',
                    arrowClassName : '-s10 -color-grey',
                    bodyClassName : 'ui-vertical-list hoverable -col-12'
                })
            ).render(this.el);

            this.dropdown.addContent(
                this.appendChild(new CV.UI.Checkbox({
                    name : 'check01',
                    className : 'ui-vertical-list-item -col-6 -p0',
                    data : {
                        label : 'Label I'
                    }
                })).el
            );
            this._options.push(this.check01);

            this.dropdown.addContent(
                this.appendChild(new CV.UI.Checkbox({
                name : 'check02',
                    className : 'ui-vertical-list-item -col-6 -p0',
                    data : {
                        label : 'Label II'
                    }
                })).el
            );
            this._options.push(this.check02);

            this.dropdown.addContent(
                this.appendChild(new CV.UI.Checkbox({
                    name : 'check03',
                    className : 'ui-vertical-list-item -col-6 -p0',
                    data : {
                        label : 'Label III'
                    }
                })).el
            );
            this._options.push(this.check03);
        },

        getSelection : function getSelection() {
            return this._options.filter(function(option) {
                return (option.isChecked() === true);
            });
        },

        error : function error() {
            this.dropdown.error();
            return this;
        }
    }
});
