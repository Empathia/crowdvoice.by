Class(CV, 'UserProfileEditNotificationsTab').inherits(Widget)({
    HTML : '\
        <div>\
            <div class="form-field">\
                <label>Notify Me</label>\
            </div>\
            <div class="form-field">\
                <label>Email Disgets</label>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this._setup();
        },

        _setup : function _setup() {
            this.appendChild(new CV.UI.Button({
                name : 'saveButton',
                className : 'positive small',
                data : {value : 'Save Changes'},
            })).render(this.el);

            return this;
        }
    }
});
