Class(CV, 'Notification').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-notification',

    create : function create(config) {
        var type = this.prototype.format.capitalizeFirstLetter(config.type);
        return new window.CV['Notification' + type](config);
    },

    prototype : {
    }
});
